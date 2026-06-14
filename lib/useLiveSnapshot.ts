'use client';

import { useEffect, useRef, useState } from 'react';
import type { LiveSnapshot, ConnState } from './types';
import { streamUrl } from './api';
import { analytics } from './events';

interface LiveResult {
  snapshot: LiveSnapshot;
  connState: ConnState;
  viewers: number | null;
}

/**
 * Subscribes to the SSE stream for `code`. The browser's EventSource handles
 * reconnection automatically (it replays Last-Event-ID); the server always
 * sends the current snapshot on (re)connect, so we just apply frames whose
 * appRevision is >= the last one we've seen.
 */
export function useLiveSnapshot(
  code: string,
  initial: LiveSnapshot,
  initialIsLive: boolean,
): LiveResult {
  const [snapshot, setSnapshot] = useState<LiveSnapshot>(initial);
  const [connState, setConnState] = useState<ConnState>(
    initialIsLive ? 'connecting' : 'stopped',
  );
  const [viewers, setViewers] = useState<number | null>(null);
  const revisionRef = useRef<number>(initial.appRevision);

  useEffect(() => {
    const es = new EventSource(streamUrl(code));

    es.addEventListener('snapshot', (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data) as LiveSnapshot;
        if (data.appRevision >= revisionRef.current) {
          revisionRef.current = data.appRevision;
          setSnapshot(data);
        }
        setConnState((s) => (s === 'stopped' ? s : 'live'));
      } catch {
        /* ignore malformed frame */
      }
    });

    es.addEventListener('live', (e) => {
      try {
        const d = JSON.parse((e as MessageEvent).data) as { isLive: boolean };
        if (d.isLive === false) {
          analytics.liveEnded(initial.format);
          setConnState('stopped');
        }
      } catch {
        /* ignore */
      }
    });

    es.addEventListener('viewers', (e) => {
      try {
        const d = JSON.parse((e as MessageEvent).data) as { count: number };
        if (typeof d.count === 'number') setViewers(d.count);
      } catch {
        /* ignore */
      }
    });

    es.onopen = () => {
      analytics.liveConnected(initial.format);
      setConnState((s) => (s === 'stopped' ? s : 'live'));
    };
    es.onerror = () => {
      analytics.liveReconnecting(initial.format);
      // EventSource reconnects on its own; reflect the transient state unless
      // the tournament has already ended.
      setConnState((s) => (s === 'stopped' ? s : 'reconnecting'));
    };

    return () => es.close();
  }, [code]);

  return { snapshot, connState, viewers };
}

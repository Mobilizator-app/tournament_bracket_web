'use client';

import { useEffect, useRef } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';

const FIT_PADDING = 24;

// Mirrors the app's InteractiveViewer (minScale 0.1, maxScale 3.0, free pan),
// and fits the whole bracket into view on first paint (and on resize).
export function ZoomPanStage({ children }: { children: React.ReactNode }) {
  const api = useRef<ReactZoomPanPinchRef>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => {
      if (!api.current || !wrapper.current || !content.current) return;
      const ww = wrapper.current.clientWidth;
      const wh = wrapper.current.clientHeight;
      const cw = content.current.scrollWidth;
      const ch = content.current.scrollHeight;
      if (!cw || !ch || !ww) return;
      const scale = Math.max(
        0.1,
        Math.min(1, (ww - FIT_PADDING * 2) / cw, (wh - FIT_PADDING * 2) / ch),
      );
      api.current.setTransform(FIT_PADDING, FIT_PADDING, scale, 0);
    };
    const t = setTimeout(fit, 60);
    window.addEventListener('resize', fit);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <TransformWrapper
        ref={api}
        minScale={0.1}
        maxScale={3}
        initialScale={1}
        limitToBounds={false}
        wheel={{ step: 0.08 }}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: 'max-content', height: 'max-content' }}
        >
          <div ref={content}>{children}</div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

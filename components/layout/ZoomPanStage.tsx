'use client';

import { useEffect, useRef } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';

const FIT_PADDING = 24;

// Mirrors the app's InteractiveViewer (minScale 0.1, maxScale 3.0, free pan).
// Fits the bracket to the viewport width on first paint and whenever the
// content or viewport resizes; tall brackets overflow vertically and are panned
// (like the app's "swipe to see more").
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
      const widthFit = (ww - FIT_PADDING * 2) / cw;
      const fitsWhole = widthFit * ch <= wh - FIT_PADDING * 2;
      const scale = fitsWhole
        ? Math.min(1, widthFit)
        : Math.min(1, Math.max(0.3, widthFit));
      api.current.setTransform(FIT_PADDING, FIT_PADDING, scale, 0);
    };

    // Refit whenever the content (bracket size) or viewport changes — this also
    // covers the first real layout after data renders.
    const ro = new ResizeObserver(() => fit());
    if (content.current) ro.observe(content.current);
    if (wrapper.current) ro.observe(wrapper.current);
    const t = setTimeout(fit, 80);
    return () => {
      clearTimeout(t);
      ro.disconnect();
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

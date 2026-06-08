'use client';

import { Component, type ReactNode } from 'react';
import { analytics } from '@/lib/events';

interface State {
  hasError: boolean;
}

/** Catches render-time crashes, reports them to Analytics, shows a fallback. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    analytics.exception(error.message ?? 'render error', true);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[100dvh] flex-col items-center justify-center gap-3 p-6 text-center text-text-secondary">
          <span className="text-lg font-bold uppercase text-text-primary">
            Something went wrong
          </span>
          <span>Please refresh the page.</span>
        </div>
      );
    }
    return this.props.children;
  }
}

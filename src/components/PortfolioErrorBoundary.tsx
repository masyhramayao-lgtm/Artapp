import React from 'react';

interface PortfolioErrorBoundaryProps {
  children: React.ReactNode;
}

interface PortfolioErrorBoundaryState {
  hasError: boolean;
}

/** Prevents uncaught UI errors from blanking the page and provides a clean reload action. */
export class PortfolioErrorBoundary extends React.Component<
  PortfolioErrorBoundaryProps,
  PortfolioErrorBoundaryState
> {
  public state: PortfolioErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): PortfolioErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error): void {
    console.error('Portfolio exhibition display error:', error);
  }

  public render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="exhibition-section" role="alert">
        <div className="container">
          <div className="empty-state-panel">
            <span className="room-index-label">EXHIBITION RECOVERY</span>
            <h2 className="empty-state-title">Exhibition View Could Not Load</h2>
            <p className="empty-state-body">
              Something unexpected interrupted the portfolio view. Reload the page to restore all
              exhibition rooms.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }
}

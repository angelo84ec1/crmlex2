import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2 style={{textAlign:'center'}}>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

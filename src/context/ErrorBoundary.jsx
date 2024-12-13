import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (<Container>
      <h1>Something went wrong.</h1>
      <p>Check the console for more information.</p>
      </Container>
);
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;

import React, { useState, useEffect } from "react";

class CurrentTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <>
        {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
      </>
    );
  }
}

export { CurrentTime };
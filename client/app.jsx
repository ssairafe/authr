import React from 'react';
import LandingPage from './landingPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'landingPage'
    };
    this.setView = this.setView.bind(this);
  }

  setView(view) {
    this.setState({
      view: view
    });
  }

  render() {
    if (this.state.view === 'landingPage') {
      return <LandingPage changeView={this.setView} />;
    }
    if (this.state.view === 'writersBlock') {
      return (
        <div>Writers Block</div>
      );
    }
  }
}

import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: []};
  }

  callApi() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => this.setState({apiResponse: res}))
      .catch(err => err);
  }

  componentDidMount() {
    this.callApi();
  }

  renderResponse() {
    return this.state.apiResponse.map(function(obj) {
      return <p className="app-intro">{obj.name}</p>;
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to wa.
          </p>
          {this.renderResponse()}
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          This will be a project soon
        </p>
        <LoginForm />
        <RegistrationForm /> 
      </div>
    );
  }
}

export default App;

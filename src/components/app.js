import React, { Component } from 'react'
import axios from 'axios'
import logo from '../images/logo.svg'
import '../styles/app.css'

const api_url = 'http://localhost:54017';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PrimeFormStatus: "",
      SumFormStatus: ""
    }
  }

  checkPrime = (number) => {
    const url = `${api_url}/isPrime?number=${number}`;
    axios.post(url)
      .then(res => {
        var status = 'Number ' + number + ' ';
        status += (res.data.isPrime) ? 'is a prime number' : 'is not a prime number'
        this.setState({ PrimeFormStatus: status })
      })
      .catch(err => {
        this.setState({ PrimeFormStatus: 'Error invoking API call' })
      })
  }

  checkSum = (numbers) => {
    const url = `${api_url}/sum?numbers=${numbers}`;
    axios.post(url)
      .then(res => {
        var status = 'Sum ' + res.data.result + ' ';
        status += (res.data.isPrime) ? 'is a prime number' : 'is not a prime number'
        this.setState({ SumFormStatus: status })
      })
      .catch(err => {
        this.setState({ SumFormStatus: 'Error invoking API call' })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is an amazing application</h1>
        </header>
        <div className="App-body">
          <div className="Column">
            <h1>Check for primality</h1>
            <p>Type one number.</p>
            <MyForm submit={this.checkPrime} status={this.state.PrimeFormStatus} placeholder="Type a number" />
          </div>
          <div className="Column">
            <h1>Calculate sum</h1>
            <p>Type one or more numbers, separated by a comma.</p>
            <MyForm submit={this.checkSum} status={this.state.SumFormStatus} placeholder="Type numbers" />
          </div>
        </div>
      </div>
    )
  }
}

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state.input);
    this.setState({ input: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={event => this.setState({ input: event.target.value })}
            placeholder={this.props.placeholder}
            required
          />
          <button type="submit">Check</button>
        </form>
        <div className="FormStatus">{this.props.status}</div>
      </div>
    )
  }
}

export default App;

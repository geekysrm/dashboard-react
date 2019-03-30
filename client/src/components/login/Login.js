import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  
  state = {
    username:"",
    password:"",
    error:""
  }
  
  componentDidMount(){
    if(localStorage.token){
      this.props.history.push("/dashboard")
    }
  }

  handleFormSubmit =(e) => {
    e.preventDefault();
    console.log(this.state);
    axios.post('/api/channels/login', {
    username: this.state.username,
    password: this.state.password
  })
  .then( (response) =>  {
    console.log(response.data);
    if(response.data.success){
      localStorage.setItem("token",response.data.token);
      this.props.history.push('/dashboard/');
    }
  })
  .catch( (error) =>  {
    console.log(error);
    this.setState({error:error.msg});
  });
  }
  
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label >Username</label>
            <input onChange={this.onChange} value={this.state.username} type="username" name="username" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label >Password</label>
            <input onChange={this.onChange} value={this.state.password} type="password" className="form-control" name="password" id="password" placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;

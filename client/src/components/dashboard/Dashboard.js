import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import SideBar from "./SideBar";
import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    if(localStorage.token){
    console.log(this.props.match.params.type);
    if(!this.props.match.params.type) this.props.history.push("/dashboard/bar")
    axios
      .get(`/api/channels/view-data-${this.props.match.params.type}`)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  else this.props.history.push("/")
}
  componentDidUpdate(prevProps, prevState) {

  if (prevProps.match.params.type !== this.props.match.params.type) {
    this.setState({data: []})
     axios
      .get(`/api/channels/view-data-${this.props.match.params.type}`)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
   
  }

  render() {
    const type = this.props.match.params.type;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 bg-secondary">
            <SideBar  />
          </div>
          <div className="col-md-8">
          <h1 className="display-4 stats-heading">Your Stats</h1>
            {this.state.data.length && type==="bar" && (
              <BarGraph data={this.state.data} />
            )
          }
            {this.state.data.length && type==="pie" && (
              <PieChart data={this.state.data} />
            ) }
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

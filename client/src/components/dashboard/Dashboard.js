import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BarGraph from "../bar-graph/BarGraph";
import PieChart from "../pie-chart/PieChart";
import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    data: []
  };

  // componentDidMount() {
  // 	axios.get('/api/channels/view-data-bar')
  //   .then( (response) => {
  //     console.log(response.data);
  //     this.setState({data:response.data})
  //   })
  //   .catch( (error) => {
  //     console.log(error);
  //   })
  // }

  componentDidMount() {
    axios
      .get("/api/channels/view-data-pie")
      .then(response => {
        console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.data.length)
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <nav className="nav flex-column">
                <Link className="nav-link active" to="/login">
                  Active
                </Link>
                <a className="nav-link" href="#">
                  Link
                </a>
                <a className="nav-link" href="#">
                  Link
                </a>
              </nav>
            </div>
            <div className="col-md-8">
              {/*<BarGraph data={this.state.data} />*/}
              <PieChart data={this.state.data} />
            </div>
          </div>
        </div>
      );
    else return <div>Loading bar graph...</div>;
  }
}

export default Dashboard;

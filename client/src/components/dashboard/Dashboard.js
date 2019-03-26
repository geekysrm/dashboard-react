import React, { Component } from "react";
import BarGraph from "../bar-graph/BarGraph";
import PieChart from "../pie-chart/PieChart";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <PieChart />
      </div>
    );
  }
}

export default Dashboard;

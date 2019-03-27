import React, { Component } from "react";
import { VictoryPie, VictoryTheme } from "victory";

// // Fetch below data from server (MySQL DB)
// const data = [{ y: 35 }, { y: 40 }, { y: 55 }];

class PieChart extends Component {
  render() {
     const newData = this.props.data.map((dataElement) => ({y:dataElement.data}))
    
    return (
      <div>
        <VictoryPie
          theme={VictoryTheme.material}
          colorScale={["#ffcd32", "#47acb1", "#f26522"]}
          style={{ parent: { maxWidth: "50%" } }}
          data={newData}
        />
      </div>
    );
  }
}

export default PieChart;

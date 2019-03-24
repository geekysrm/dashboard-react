import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";

// Fetch below data from server (MySQL DB)
const data = [
  { x: 1, y: 13 },
  { x: 2, y: 45 },
  { x: 3, y: 23 },
  { x: 4, y: 41 },
  { x: 5, y: 34 },
  { x: 5, y: 54 }
];

class BarGraph extends Component {
  render() {
    return (
      <div>
        <VictoryChart
          style={{ parent: { maxWidth: "50%" } }}
          theme={VictoryTheme.material}
          domainPadding={10}
        >
          <VictoryBar
            style={{ data: { fill: "#c43a31" } }}
            alignment="start"
            data={data}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default BarGraph;

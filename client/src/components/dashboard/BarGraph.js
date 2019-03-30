import React, { Component } from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";

class BarGraph extends Component {
  render() {
    const newData = this.props.data.map((dataElement,index) => ({x:index+1,y:dataElement.data}))
    
    return (
      <div>
        <VictoryChart
          style={{ parent: { maxWidth: "70%" } }}
          theme={VictoryTheme.material}
          domainPadding={10}
        >
          <VictoryBar
            labels={d => `y: ${d.y}`}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: {
                fill: "#2980B9"
              },
              labels: { fontSize: 9 }
            }}
            alignment="start"
            data={newData}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default BarGraph;

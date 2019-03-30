import React, { Component } from "react";
import { VictoryPie, VictoryTheme } from "victory";

class PieChart extends Component {
  render() {
    
     const newData = this.props.data.map((dataElement,index) => ({x:dataElement.data+"%",y:dataElement.data}));
    
    return (
      <div className="graph-wrapper">
        <VictoryPie
          theme={VictoryTheme.material}
          colorScale={["#ffcd32", "#47acb1", "#f26522"]}
          style={{ parent: { maxWidth: "70%" } }}
          data={newData}
        />
      </div>
    );
  }
}

export default PieChart;

import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CandlestickChart = ({ data }) => {
  // Map the data to the format expected by CanvasJS for candlestick charts
  const dataPoints = data
  dataPoints.forEach((item, index) => {
    dataPoints[index]['color']=
      item.close > item.open ? "green" : "red"
  ;
  });

  const options = {
    title: {
      text: "Candlestick Chart"
    },
    axisX: {
      valueFormatString: "MMM DD"
    },
    axisY: {
      title: "Price",
      prefix: "$"
    },
    data: [{
      type: "candlestick",
      showInLegend: false,
      risingColor: "green",
			fallingColor: "red",
      yValueFormatString: "$##0.00",
      dataPoints: dataPoints
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default CandlestickChart;

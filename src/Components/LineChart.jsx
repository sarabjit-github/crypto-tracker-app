import React from "react";
import { Chart } from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod, coinColor }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  if (timePeriod === "3h" || timePeriod === "24h") {
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      coinTimestamp.push(
        new Date(
          coinHistory?.data?.history[i].timestamp * 1000
        ).toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  } else {
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      coinTimestamp.push(
        new Date(
          coinHistory?.data?.history[i].timestamp * 1000
        ).toLocaleDateString()
      );
    }
  }

  const data = {
    labels: coinTimestamp,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: `${coinColor}`,
        borderColor: `${coinColor}`,
        borderWidth: 2,
        fill: false,
        showLine: true,
        borderJoinStyle: "miter",
        pointRadius: 2,
        pointBackgroundColor: "#E3F2FD",
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="crypto-chart-section">
        <div className="chart-heading">
          <h1> <span style={{color: `${coinColor}`}}>{coinName}</span> Price Chart</h1>
          <div>
            <p>Change: {coinHistory?.data?.change}%</p>
            <p>
              Current <span style={{color: `${coinColor}`}}>{coinName}</span> Price : $ {currentPrice}
            </p>
          </div>
        </div>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default LineChart;

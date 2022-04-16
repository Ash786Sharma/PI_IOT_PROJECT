import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import "./ProcessChart.css";

const ProcessChart = ({ data, range }) => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const chartOptions = {
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
        animations: {
          easing: "linear",
          dynamicAnimation: {
            speed: 500,
          },
        },
      },
      tooltip: {
        x: {
          format: "yyyy/MM/dd, hh:mm:ss TT",
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
          format: "yyyy/MM/dd, hh:mm:ss TT",
        },
        // format: "yyyy/MM/dd, HH:mm:ss TT",
        range: range,
      },
      yaxis: {
        labels: {
          formatter: (val) => val.toFixed(1),
        },
        range: 200,
        title: { text: "Value" },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };

  return (
    <div className="chart">
      {/* chart */}
      <Chart
        options={
          themeReducer === "theme-mode-dark"
            ? {
                ...chartOptions.options,
                theme: { mode: "dark" },
              }
            : {
                ...chartOptions.options,
                theme: { mode: "light" },
              }
        }
        series={data}
        type="line"
        height="100%"
      />
    </div>
  );
};

export default ProcessChart;

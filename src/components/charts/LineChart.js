import { Line } from "react-chartjs-2";

export const LineChart = ({ chartData }) => {
  if (Object.keys(chartData).length === 0) {
    return <div>Loading...</div>;
  }
  //console.log("chartData: " + JSON.stringify(chartData));
  return (
    <div>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Recent Attendance",
            },
            legend: {
              display: true,
              position: "bottom"
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};
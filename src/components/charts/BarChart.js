import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }) => {
  if (Object.keys(chartData).length === 0) {
    return <div>Loading...</div>;
  }
  //console.log("chartData: " + JSON.stringify(chartData));
  return (
    <div>
      <Bar
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
          }
        }}
      />
    </div>
  );
};


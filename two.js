const chartSection = document.getElementById("chart-section");

const myCanvas = document.createElement("canvas"); //make canvas element
myCanvas.setAttribute("id", "chart-area"); // put and id on the canvas
chartSection.appendChild(myCanvas); // appended canvas to section+

const allProducts = JSON.parse(localStorage.getItem("MyProducts"));

const chartLabels = [[], [], []];
allProducts.forEach((e) => {
  chartLabels[0].push(e.productName);
  chartLabels[1].push(e.imgClickCount);
  chartLabels[2].push(e.imgShowCount);
});

let myChartIndex = 0;
let animComplete;

const data = {
  labels: chartLabels[0],
  datasets: [
    {
      label: "Click Count",
      data: [],
      backgroundColor: ["#ff6f6c"],
      borderColor: ["#ff6f6c"],
      borderWidth: 1,
      order: 0,
    },
    {
      label: "View Count",
      data: [],
      order: 1,
      type: "bar",
      backgroundColor: ["rgba(0, 0, 0, 0.2)"],
    },
  ],
  borderWidth: 1,
};

new Chart("chart-area", {
  type: "bar",
  data: data,
  options: {
    animation: {
      onComplete: (context) => {
        if (myChartIndex < chartLabels[0].length) {
          context.chart.data.datasets[0].data.push(
            chartLabels[1][myChartIndex] //push first item of clicks array
          );
          context.chart.data.datasets[1].data.push(
            chartLabels[2][myChartIndex] //push first item of views array
          );
        }

        myChartIndex < chartLabels[0].length
          ? myChartIndex++
          : (animComplete = true);

        animComplete ? null : context.chart.update();
      },
      delay: 0,
    },
    scales: {
      x: { stacked: true },
      y: {
        beginAtZero: true, // Start the y-axis at zero
        ticks: {
          stepSize: 1, // Set the step size to 1 for whole numbers
        },
      },
    },
  },
});

let movingDiv = document.getElementById("movable-div");
document.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(e) {
  const { clientX, clientY } = e;

  movingDiv.style.left = `${clientX}px`;
  movingDiv.style.top = `${clientY}px`;
}

//Image Area
const imgSection = document.getElementById("imgSection");

// Image tags
const leftImage = document.getElementById("left");
const midImage = document.getElementById("mid");
const rightImage = document.getElementById("right");

//ul
const ul = document.getElementById("score-counter");

//vars
let voteCounter = 0;

const allProducts = [];

function NewProduct(productName, imgPath, imgShowCount = 0, imgClickCount = 0) {
  this.productName = productName;
  this.imgPath = imgPath;
  this.imgShowCount = imgShowCount;
  this.imgClickCount = imgClickCount;
  allProducts.push(this);
}

function generateIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function displayProduct() {
  let i = generateIndex();
  let j = generateIndex();
  let k = generateIndex();

  while (i === j || i === k || j === k) {
    j = generateIndex();
    k = generateIndex();
  }

  leftImage.src = leftImage.alt = allProducts[i].imgPath;
  midImage.src = midImage.alt = allProducts[j].imgPath;
  rightImage.src = rightImage.alt = allProducts[k].imgPath;

  allProducts[i].imgShowCount++;
  allProducts[j].imgShowCount++;
  allProducts[k].imgShowCount++;
}

imgSection.addEventListener("click", handleProductClick);

function handleProductClick({ target }) {
  allProducts.forEach((e) => {
    if (e.imgPath === target.alt) {
      e.imgClickCount++;
    }
  });
  voteCounter === 24 ? (voteLimiter(), dataToLocal()) : voteCounter++;

  displayProduct();
}

function showScore() {
  if (ul.children.length !== 0) {
    ul.innerHTML = "";
  }

  for (let i = 0; i < allProducts.length; i++) {
    let { productName, imgShowCount, imgClickCount } = allProducts[i];

    const li = document.createElement("li");

    li.textContent = `${productName} [View: ${imgShowCount}, Clicks: ${imgClickCount}]`;
    ul.appendChild(li);
  }
}

function voteLimiter() {
  //Limits vote / Start Chart JS
  imgSection.removeEventListener("click", handleProductClick);
  showScore();
  imgSection.innerHTML = "";

  const myCanvas = document.createElement("canvas"); //make canvas element
  myCanvas.setAttribute("id", "chart-area"); // put and id on the canvas
  imgSection.appendChild(myCanvas); // appended canvas to section+

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
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
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
}

function checkLocal() {
  const getProductsFromLocal = JSON.parse(localStorage.getItem("MyProducts"));
  console.log(getProductsFromLocal);

  if (getProductsFromLocal) {
    getProductsFromLocal.forEach(
      ({ productName, imgPath, imgShowCount, imgClickCount }) => {
        new NewProduct(productName, imgPath, imgShowCount, imgClickCount);
      }
    );
  } else {
    new NewProduct("Bag", "./assets/bag.jpg"),
      new NewProduct("Banana", "./assets/banana.jpg"),
      new NewProduct("Bathroom", "./assets/bathroom.jpg"),
      new NewProduct("Boots", "./assets/boots.jpg"),
      new NewProduct("Breakfast", "./assets/breakfast.jpg"),
      new NewProduct("Bubblegum", "./assets/bubblegum.jpg"),
      new NewProduct("Chair", "./assets/chair.jpg"),
      new NewProduct("Cthulu", "./assets/cthulhu.jpg"),
      new NewProduct("Dog-duck", "./assets/dog-duck.jpg"),
      new NewProduct("Dragon", "./assets/dragon.jpg"),
      new NewProduct("Pen", "./assets/pen.jpg"),
      new NewProduct("Pet-sweep", "./assets/pet-sweep.jpg"),
      new NewProduct("Scissors", "./assets/scissors.jpg"),
      new NewProduct("Shark", "./assets/shark.jpg"),
      new NewProduct("Sweep", "./assets/sweep.png"),
      new NewProduct("Tauntaun", "./assets/tauntaun.jpg"),
      new NewProduct("Unicorn", "./assets/unicorn.jpg"),
      new NewProduct("Water-can", "./assets/water-can.jpg"),
      new NewProduct("Wine-glass", "./assets/wine-glass.jpg");
  }
}

function dataToLocal() {
  const allProductsToJsonString = JSON.stringify(allProducts);
  localStorage.setItem("MyProducts", allProductsToJsonString);
}

checkLocal();
displayProduct();

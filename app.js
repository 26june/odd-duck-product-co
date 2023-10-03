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

function newProduct(productName, imgPath) {
  this.productName = productName;
  this.imgPath = imgPath;
  this.imgShowCount = 0;
  this.imgClickCount = 0;
}

const allProducts = [
  new newProduct("Bag", "./assets/bag.jpg"),
  new newProduct("Banana", "./assets/banana.jpg"),
  new newProduct("Bathroom", "./assets/bathroom.jpg"),
  new newProduct("Boots", "./assets/boots.jpg"),
  new newProduct("Breakfast", "./assets/breakfast.jpg"),
  new newProduct("Bubblegum", "./assets/bubblegum.jpg"),
  new newProduct("Chair", "./assets/chair.jpg"),
  new newProduct("Cthulu", "./assets/cthulhu.jpg"),
  new newProduct("Dog-duck", "./assets/dog-duck.jpg"),
  new newProduct("Dragon", "./assets/dragon.jpg"),
  new newProduct("Pen", "./assets/pen.jpg"),
  new newProduct("Pet-sweep", "./assets/pet-sweep.jpg"),
  new newProduct("Scissors", "./assets/scissors.jpg"),
  new newProduct("Shark", "./assets/shark.jpg"),
  new newProduct("Sweep", "./assets/sweep.png"),
  new newProduct("Tauntaun", "./assets/tauntaun.jpg"),
  new newProduct("Unicorn", "./assets/unicorn.jpg"),
  new newProduct("Water-can", "./assets/water-can.jpg"),
  new newProduct("Wine-glass", "./assets/wine-glass.jpg"),
];

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
  voteCounter === 2 ? voteLimiter() : voteCounter++;

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

  console.log(chartLabels[1]);

  new Chart("chart-area", {
    type: "bar",
    data: {
      labels: chartLabels[0],
      datasets: [
        {
          label: "Click Count",
          data: chartLabels[1],
          borderWidth: 1,
          order: 0,
        },
        {
          label: "View Count",
          data: chartLabels[2],
          borderWidth: 1,
          order: 1,
          type: "line",
          fill: false,
          tension: 0,
          borderColor: "rgb(255, 0, 0)",
        },
      ],
      borderWidth: 1,
    },
    options: {
      scales: {
        y: [
          {
            display: true,
            ticks: {
              suggestedMin: 0,
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

displayProduct();

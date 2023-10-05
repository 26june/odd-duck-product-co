//Image Area
const imgSection = document.getElementById("imgSection");

// Image tags
const leftImage = document.getElementById("left");
const midImage = document.getElementById("mid");
const rightImage = document.getElementById("right");

//mid section tag
const midSection = document.getElementById("mid-section-left");

//ul
const webTable = document.getElementById("score-counter");

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

function generateRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function generateIndex() {
  let i = generateRandom();
  let j = generateRandom();
  let k = generateRandom();

  while (i === j || i === k || j === k) {
    j = generateRandom();
    k = generateRandom();
  }

  return [i, j, k];
}

let prevIndex = [];

function displayProduct() {
  let duplicateCheck;
  let currentIndex;

  while (duplicateCheck !== -3) {
    duplicateCheck = 0;
    currentIndex = generateIndex();
    currentIndex.forEach((e) => {
      duplicateCheck += prevIndex.indexOf(e);
    });
  }

  prevIndex = currentIndex;

  leftImage.src = leftImage.alt = allProducts[currentIndex[0]].imgPath;
  midImage.src = midImage.alt = allProducts[currentIndex[1]].imgPath;
  rightImage.src = rightImage.alt = allProducts[currentIndex[2]].imgPath;

  allProducts[currentIndex[0]].imgShowCount++;
  allProducts[currentIndex[1]].imgShowCount++;
  allProducts[currentIndex[2]].imgShowCount++;

  voteCounter === 25
    ? (midSection.textContent = `You have finished voting`)
    : (midSection.textContent = `You have ${25 - voteCounter} votes remaining`);
}

imgSection.addEventListener("click", handleProductClick);

function handleProductClick({ target }) {
  allProducts.forEach((e) => {
    if (e.imgPath === target.alt) {
      e.imgClickCount++;
    }
  });

  voteCounter === 24
    ? (voteLimiter(), dataToLocal(), voteCounter++)
    : voteCounter++;

  displayProduct();
}

function showScore() {
  if (webTable.children.length !== 0) {
    webTable.innerHTML = "";
  }

  const tr = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.textContent = "Product";
  let td2 = document.createElement("td");
  td2.textContent = "Views";
  let td3 = document.createElement("td");
  td3.textContent = "Click";
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  webTable.appendChild(tr);

  for (let i = 0; i < allProducts.length; i++) {
    let wantedProps = [
      allProducts[i].productName,
      allProducts[i].imgShowCount,
      allProducts[i].imgClickCount,
    ];

    const tr = document.createElement("tr");

    wantedProps.forEach((element) => {
      let td = document.createElement("td");
      td.textContent = element;
      tr.appendChild(td);
    });

    webTable.appendChild(tr);
  }
}

function voteLimiter() {
  //Limits vote / Start Chart JS

  imgSection.innerHTML = "";

  const myLink = document.createElement("a");
  myLink.textContent = "Go to Page 2";
  myLink.setAttribute("href", "/chart.html");
  imgSection.appendChild(myLink);
  midSection.textContent = `You have finished voting`;

  showScore();
}

function checkLocal() {
  const getProductsFromLocal = JSON.parse(localStorage.getItem("MyProducts"));

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

//left section should be current stats
//mid empty section should be votes left count
//border highlight on hovered image
//vote percentage on pg2?

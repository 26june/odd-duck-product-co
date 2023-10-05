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

  const myLink = document.createElement("a");
  myLink.textContent = "Go to Page 2";
  myLink.setAttribute("href", "/chart.html");
  imgSection.appendChild(myLink);
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

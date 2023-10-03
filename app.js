//Image Area
const imgSection = document.getElementById("imgSection");

// Image tags
const leftImage = document.getElementById("left");
const midImage = document.getElementById("mid");
const rightImage = document.getElementById("right");

function newProduct(productName, imgPath) {
  this.productName = productName;
  this.imgPath = imgPath;
  this.imgShowCount = 0;
}

const allProducts = [
  new newProduct("bag", "./assets/bag.jpg"),
  new newProduct("banana", "./assets/banana.jpg"),
  new newProduct("bathroom", "./assets/bathroom.jpg"),
  new newProduct("boots", "./assets/boots.jpg"),
  new newProduct("breakfast", "./assets/breakfast.jpg"),
  new newProduct("bubblegum", "./assets/bubblegum.jpg"),
  new newProduct("chair", "./assets/chair.jpg"),
  new newProduct("cthulu", "./assets/cthulhu.jpg"),
  new newProduct("dog-duck", "./assets/dog-duck.jpg"),
  new newProduct("dragon", "./assets/dragon.jpg"),
  new newProduct("pen", "./assets/pen.jpg"),
  new newProduct("pet-sweep", "./assets/pet-sweep.jpg"),
  new newProduct("scissors", "./assets/scissors.jpg"),
  new newProduct("shark", "./assets/shark.jpg"),
  new newProduct("sweep", "./assets/sweep.png"),
  new newProduct("tauntaun", "./assets/tauntaun.jpg"),
  new newProduct("unicorn", "./assets/unicorn.jpg"),
  new newProduct("water-can", "./assets/water-can.jpg"),
  new newProduct("wine-glass", "./assets/wine-glass.jpg"),
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
  rightImage.src = midImage.alt = allProducts[k].imgPath;

  allProducts[i].imgShowCount++;
  allProducts[j].imgShowCount++;
  allProducts[k].imgShowCount++;
}

displayProduct();

imgSection.addEventListener("click", handleProductClick);

function handleProductClick({ target }) {
  if (target === leftImage) {
    console.log(leftImage.alt);
  } else if (target === midImage) {
    console.log("Clicked Mid");
  } else if (target === rightImage) {
    console.log("Clicked Right");
  } else {
    console.log("Clicked on the container");
  }
}

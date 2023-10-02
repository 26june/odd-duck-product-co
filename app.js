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

gridArea.addEventListener("click", handleProductClick);

function handleProductClick(event) {
  console.log(event);
  alert("Clicked");
}

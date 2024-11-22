console.log("hello world js");
let username = "yuuu"
console.log(username);

let product = {
  name: "イヤホン",
  price: 30000,
};

console.log(typeof product.name); // string
console.log(typeof product.price); // number

let fruits = ["apple", "banana", "berry"];
console.log(fruits[1]);
fruits[3] = "mango";
console.log(typeof fruits);

const getProductInfo = (productName, productPrice) => {
  console.log(`${productName}の値段は、${productPrice}円です`);
}

console.log(getProductInfo("巨峰", 1500));

const add = (a, b) => {
  return a*b;
};

console.log(add(2, 4));
let bodyElement = document.querySelector("body");
let firstColorSpanElement = document.getElementById("color-1");
let secondColorSpanElement = document.getElementById("color-2");
firstColorSpanElement.value = "#008000";
secondColorSpanElement.value = "#0000FF";

let firstColor = firstColorSpanElement.value;
let secondColor = secondColorSpanElement.value;

backGroundColor(firstColor, secondColor);

firstColorSpanElement.addEventListener("input", (e) => {
  firstColor = e.target.value;
  backGroundColor(firstColor, secondColor);
});

secondColorSpanElement.addEventListener("input", (e) => {
  secondColor = e.target.value;
backGroundColor(firstColor, secondColor);
});



function backGroundColor(color1, color2) {
  bodyElement.style.background = `linear-gradient(14deg, ${color1}, ${color2})`;
}




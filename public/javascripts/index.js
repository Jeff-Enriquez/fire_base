console.log("this is my javascript file")
const containers = document.querySelectorAll(".container");
const content = document.querySelector(".content");
const imgs = content.querySelectorAll("img");
const paragraphs = content.querySelectorAll("p");

for(let i = 0; i < containers.length; i++){
  containers[i].onmouseover = function(){
    containers[i].style.outline = "2px solid #777";
    containers[i].style.outlineOffset = "-2px";
  };
  containers[i].onmouseout = function(){
    containers[i].style.outline = "none";
  };
}
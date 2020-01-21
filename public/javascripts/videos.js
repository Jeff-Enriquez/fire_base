/*----- app's state (variables) -----*/
let commentIdx, commentId, text;
const vidId = document.querySelector(".container").id;

/*----- cached element references -----*/
const dotContainers = document.querySelectorAll(".dot-container");
const dotBtns = document.querySelectorAll(".dots");
const div = document.createElement("div");
const h4Edit = document.createElement("h4");
const h4Delete = document.createElement("h4");
const contexts = document.querySelectorAll(".context");
const comments = document.querySelectorAll(".comment");

/*----- event listeners -----*/
for(let i = 0; i < dotBtns.length; i++){
	dotBtns[i].addEventListener("click", function() { 
		commentIdx = i;
		commentId = dotContainers[commentIdx].id;
		renderEditDelete();
		console.log(dotContainers[commentIdx].id);
	});
}

document.querySelector("html").addEventListener("click", function() {
	if(dotContainers[commentIdx].contains(div)) {
		dotContainers[commentIdx].removeChild(div);
	}
}, true)

h4Edit.addEventListener("click", function() {
	renderEdit();
});

h4Delete.addEventListener("click", function() {
	const myform = document.createElement("form");
	myform.setAttribute("method", "post");
	myform.setAttribute("action", `/videos/${vidId}/comment/${commentId}/?_method=DELETE`);
	document.body.appendChild(myform);
	myform.submit();
});

/*----- functions -----*/
function init() {
	h4Edit.innerText="Edit";
	h4Edit.className="edit";
	h4Delete.innerText="Delete";
	div.appendChild(h4Edit);
	div.appendChild(h4Delete);
}

function renderEditDelete(){
	dotContainers[commentIdx].appendChild(div);
}

function renderEdit(){
	text = dotContainers[commentIdx].parentNode.querySelector("div").querySelector("p").innerText;
	let ele = dotContainers[commentIdx].parentNode.parentNode;
	dotContainers[commentIdx].parentNode.remove();
	const myform = createEditForm();
	ele.appendChild(myform);
}

function createEditForm() {
	const myform = document.createElement("form");
	myform.setAttribute("action", `/videos/${vidId}/comment/${commentId}/?_method=PUT`);
	myform.setAttribute("method", "POST");
	const textArea = document.createElement("textarea");
	setAttributes(textArea, {"rows": "1", "type": "text", "name": "comment"});
	textArea.innerText = text;
	const btn = document.createElement("button");
	btn.setAttribute("type", "submit");
	btn.innerText = "confirm";
	myform.appendChild(textArea);
	myform.appendChild(btn);
	return myform;
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

init();

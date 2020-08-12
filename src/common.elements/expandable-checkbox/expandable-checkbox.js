let coll = document.getElementsByClassName("expand-checkbox-button");
let i;
let angle = window.getComputedStyle(
	document.querySelector('.expand-checkbox-button'), ':after'
).getPropertyValue('trasform');

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
    if (angle === "rotate(45deg)") {
      angle = "rotate(225deg)";
    } else {
      angle = "rotate(45deg)";
    }
  });
}
//? Burger Menu Code */
//todo Burger Menu Code */

let counter = 0;
function openMenu() {
  counter++;
  const nav = document.querySelector("nav");
  const navbar = document.querySelector(".navbar");
  const uper = document.querySelector(".uper-menu-mobile");
  navbar.classList.toggle("resize");
  uper.classList.toggle("uper-space-changer");
  nav.classList.toggle("show");
}

//? go to mini Code */
//todo go to mini Code */
function modifyUrl(title, url) {
  if (typeof history.pushState != "undefined") {
    var obj = {
      Title: title,
      Url: url,
    };
    history.pushState(obj, obj.Title, obj.Url);
  }
}

//? Draggble Code */
//todo Draggble Code */

const aTags = document.querySelectorAll("a");
const images = document.querySelectorAll("img");
aTags.forEach((aTag) => {
  aTag.setAttribute("draggable", false);
});
images.forEach((aTag) => {
  aTag.setAttribute("draggable", false);
});

//? Start Program Code(Modal) */
//todo Start Program Code(Modal) */


function startModal() {
  const body = document.querySelector("body");
  body.classList.add("start-mode");
  const startModalBtn = document.querySelector(".start-modal .btn");
  startModalBtn.addEventListener("click", backToWeb);

  function backToWeb() {
    body.classList.remove("start-mode");
    const startModalSection = document.querySelector(".start-modal-section");
    const startModalDiv = document.querySelector(".start-modal");
    startModalDiv.style.width = 0;
    startModalDiv.style.height = 0;
    setTimeout(() => {
      startModalSection.style.display = "none";
    }, 120);
  }
}
if (localStorage.getItem("item") === "1") {
  const startModal0 = document.querySelector(".start-modal-section");
  const loading = document.querySelector(".loading-container");
  startModal0.style.display = "none";
  loading.style.display = "none";
  const body = document.querySelector("body");
  body.classList.remove("start-mode");
} else {
  window.addEventListener("DOMContentLoaded", startModal);
}

//? Auto Type Code */
//todo Auto Type Code */

const texts = ["ربات تلگرام", "فرانت اند"];
const job = document.querySelector(".job span");

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function autoType() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, index++);
  job.innerText = `${letter}`;

  const timeout = setTimeout(autoType, 250);

  if (letter.length === currentText.length) {
    index = 0;
    count++;
    setTimeout(backType, 800);
    clearTimeout(timeout);
  }
}

let indexBack = texts[count].length;
function backType() {
  letter = letter.slice(0, indexBack--);
  job.innerText = `${letter}`;
  const timeout2 = setTimeout(backType, 250);
  if (letter.length === 0) {
    indexBack = currentText.length - 1;
    autoType();
    clearTimeout(timeout2);
  }
}
autoType();

//? To Up Button Code */
//todo To Up Button Code */

const toUp = document.querySelector(".to-up");
window.addEventListener("scroll", function () {
  const scroll = this.scrollY;
  if (scroll > 500) {
    toUp.style.opacity = 1;
  } else {
    toUp.style.opacity = 0;
  }
});

//? Sections` Alert Code */
//todo Sections` Alert Code */

const menuItems = document.querySelectorAll("nav a");
const mainSections = document.querySelectorAll("main section");

window.addEventListener("scroll", showAlert);
let current;
let sectionName = [
  "work-samples-section",
  "skills-section",
  "services-section",
  "about-me",
];

let alertCount = 0;

function showAlert() {
  const alertBox = document.querySelector(".section-alert");
  const alertBoxText = document.querySelector(".section-alert p");

  mainSections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeigth = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeigth / 3) {
      current = section.getAttribute("class").split(" ")[0];
    }
  });

  if (sectionName.includes(current)) {
    window.addEventListener("scroll", () => {
      let scroll = this.scrollY;
      const alertImg = document.querySelector(".alert-icon-container img");
      if (scroll > 500) {
        alertBoxText.style.display = "inline";

        if (current === "work-samples-section") {
          alertBoxText.innerText = "بخش نمونه کار ها";
          alertBox.classList.add("show-alert");
          alertImg.setAttribute("src", "./assets/img/tools.gif");
        }

        if (current === "skills-section") {
          alertBoxText.innerText = "بخش تخصص ها";
          alertBox.classList.add("show-alert");
          alertImg.setAttribute("src", "./assets/img/skills.gif");
        }

        if (current === "services-section") {
          alertBoxText.innerText = "بخش خدمات";
          alertBox.classList.add("show-alert");
          alertImg.setAttribute("src", "./assets/img/service.gif");
        }

        if (current === "about-me") {
          alertBoxText.innerText = "بخش درباره من";
          alertBox.classList.add("show-alert");
          alertImg.setAttribute("src", "./assets/img/about.gif");
        }
      } else {
        alertBox.classList.remove("show-alert");
        alertImg.setAttribute("src", "");
      }
    });
  }
}

//? Loading Code */
//todo Loading Code */

window.addEventListener("load", function () {
  const loader = document.querySelector(".loading-container");
  loader.classList.add("hidden");
  this.setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

//? Work Samples Tabs Code */
//todo Work Samples Tabs Code */

function tabFunc(event) {
  let noneDisplay = 0;
  const tabItem = document.querySelectorAll(".categories-tabs div .btn");
  const workSamplesContainer = document.querySelector(".work-samples");
  const workSample = document.querySelectorAll(".work-sample-item");

  tabItem.forEach((item) => {
    item.classList.remove("active");
  });

  const category = event.target.id;

  workSample.forEach((item) => {
    item.style.display = "none";
    if (item.classList.contains(category)) {
      workSamplesContainer.classList.remove("empty-container");
      item.style.display = "block";
    }
    if (category === "all") {
      if (!item.classList.contains("empty")) {
        item.style.display = "block";
        workSamplesContainer.classList.remove("empty-container");
      }
    }
    if (item.style.display === "none") {
      noneDisplay++;
    }
    if (noneDisplay === workSample.length) {
      if (item.classList.contains("empty")) {
        const emptyItem = document.querySelector(".empty");
        workSamplesContainer.removeChild(emptyItem);
      }
      const newDiv = document.createElement("div");
      newDiv.className = "work-sample-item empty";
      newDiv.innerText = "موردی در این بخش یافت نشد!!";
      workSamplesContainer.classList.add("empty-container");
      newDiv.classList.add("align");
      workSamplesContainer.appendChild(newDiv);
    }
  });

  const currentTab = event.target;
  currentTab.classList.add("active");
}

//? Next & Back in About me Code */
//todo Next & Back in About me Code */

const nextBackbtn = document.querySelectorAll(".next-back img");
const aboutmePages = document.querySelectorAll(".about-me li");

nextBackbtn.forEach((item) => {
  item.addEventListener("click", nextBack);
});

let pageNumber = 0;

function nextBack(event) {
  aboutmePages.forEach((item) => {
    item.style.opacity = 0;
    item.classList.remove("li-chosed");
    console.log(item);
  });

  if (event.target.classList.contains("nextPage")) {
    pageNumber++;
  } else if (event.target.classList.contains("backPage")) {
    pageNumber--;
  }

  if (pageNumber > aboutmePages.length - 1) {
    pageNumber = 0;
  }
  if (pageNumber < 0) {
    pageNumber = aboutmePages.length - 1;
  }
  console.log(pageNumber);

  aboutmePages[pageNumber].classList.add("li-chosed");
  setTimeout(() => {
    aboutmePages[pageNumber].style.opacity = 1;
  }, 100);
}

///
const radioSkill = document.querySelectorAll(".radio-container input")
const skillBoxes = document.querySelectorAll(".skill")
radioSkill.forEach((item)=>{
  item.addEventListener("click", checked)
})

function checked(event){
  skillBoxes.forEach((item)=>{
    item.classList.remove("skill-show")
  })
  const skillBox = event.target.parentElement.parentElement;
  if (event.currentTarget.checked) {
    skillBox.classList.add("skill-show")
  }
}

///

const skillBars = document.querySelectorAll(".skill-bar-now")

skillBars.forEach((item)=>{
  const percent = item.classList[1].split("-")[1]
  if (percent === "100") {
    item.style.borderRadius = "5px";
  }
  item.style.width = percent+ "%"
})
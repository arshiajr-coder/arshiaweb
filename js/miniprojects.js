function modifyUrl(title, url) {
  if (typeof history.pushState != "undefined") {
    var obj = {
      Title: title,
      Url: url,
    };
    history.pushState(obj, obj.Title, obj.Url);
  }

  localStorage.setItem("item", JSON.stringify(1));
}

window.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
});

//////// Picture Editor Code /////
const $ = document;
const editorBox = $.querySelector(".picture-editor-container");
const fileInput = $.querySelector(".file-input");
const chooseImg = $.querySelector(".choose-img");
const previewImg = $.querySelector(".preview-img img");
const filterSlider = $.querySelector(".slider input");
const filterName = $.querySelector(".filter-name");
const sliderPrecent = $.querySelector(".slider .value");
const rotateOptions = $.querySelectorAll(".rotate button");
const resetFilter = $.querySelector(".reset-filter");
const saveImgBtn = $.querySelector(".save-img")

const loadImg = () => {
  const file = fileInput.files[0];
  previewImg.addEventListener("load", () => {
    editorBox.classList.remove("disable");
  });
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);

  if (previewImg.src.includes("/assets/img/image-placeholder.svg")) {
    previewImg.style.maxHeight = "335px";
  } else {
    previewImg.style.maxHeight = "300px";
  }
};

if (previewImg.src.includes("/assets/img/image-placeholder.svg")) {
  previewImg.style.maxHeight = "335px";
} else {
  previewImg.style.maxHeight = "300px";
}

fileInput.addEventListener("change", loadImg);
chooseImg.addEventListener("click", () => fileInput.click());

const filterOptions = document.querySelectorAll(".filter button");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0,
  rotate = 0,
  flipY = 1,
  flipX = 1;

const optionsArray = ["brightness", "saturation", "inversion", "grayscale"];

filterOptions.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".option-active").classList.remove("option-active");
    item.classList.add("option-active");
    filterName.textContent = item.textContent;

    if (optionsArray.indexOf(item.id) !== -1) {
      if (item.id === "grayscale" || item.id === "inversion") {
        filterSlider.max = "100";
      } else {
        filterSlider.max = "200";
      }
      filterSlider.value = eval(item.id);
      sliderPrecent.textContent = eval(item.id) + "%";
    }
  });
});

const updateSlider = () => {
  sliderPrecent.textContent = filterSlider.value + "%";
  
  switch (document.querySelector(".option-active").id) {
    case "brightness":
      brightness = filterSlider.value;
      break;
    case "saturation":
      saturation = filterSlider.value;
      break;
    case "inversion":
      inversion = filterSlider.value;
      break;
    case "grayscale":
      grayscale = filterSlider.value;
      break;
  }
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

rotateOptions.forEach((item) => {
  item.addEventListener("click", () => {
    switch (item.id) {
      case "left":
        rotate -= 90;
        break;
      case "right":
        rotate += 90;
        break;
      case "horizontal":
        flipX = flipX === 1 ? -1 : 1;
        break;
      case "vertical":
        flipY = flipY === 1 ? -1 : 1;
        break;
    }
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipX}, ${flipY})`;
  });
});

resetFilter.addEventListener("click", ()=>{
  brightness = 100
  saturation = 100
  inversion = 0
  grayscale = 0
  rotate = 0
  flipY = 1
  flipX = 1
  filterOptions[0].click()
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipX}, ${flipY})`;
})


const downloadImg = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width/2, canvas.height/2);
  if(rotate !== 0){
     ctx.rotate(rotate * Math.PI / 180);  
  }
  ctx.scale(flipX, flipY);
  ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2 , canvas.width, canvas.height);
  
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();

}

saveImgBtn.addEventListener("click", downloadImg)
filterSlider.addEventListener("input", updateSlider);
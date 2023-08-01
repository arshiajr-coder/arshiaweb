function modifyUrl(title, url) {
  if (typeof history.pushState != "undefined") {
    var obj = {
      Title: title,
      Url: url,
    };
    history.pushState(obj, obj.Title, obj.Url);
  }

  localStorage.setItem("item", JSON.stringify(1))
}

window.addEventListener("DOMContentLoaded", function() {
    localStorage.clear()
})
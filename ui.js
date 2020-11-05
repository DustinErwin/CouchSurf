$(document).ready(function () {
  var dropdown = $(".dropdown");
  var dropdownBtn = $("#dropdownBtn");
  var ytSelect = $("#youtubeSurf");
  var ytWidget = $("#youtubeWidget");
  var gameSelect = $("#gameSelect");
  var gameWidget = $("#gameWidget");

  dropdownBtn.on("click", function () {
    dropdown.toggleClass("is-active");
  });

  ytSelect.on("click", function () {
    ytWidget.toggleClass("is-hidden");
    ytSelect.toggleClass("has-text-grey");
  });

  gameSelect.on("click", function () {
    gameWidget.toggleClass("is-hidden");
    gameSelect.toggleClass("has-text-grey");
  });
});

function play(a) {
  a.setAttribute("src", "./assets/images/Play.png");
}
function covid(a) {
  a.setAttribute("src", "./assets/images/Couch Covid Blasters (2).gif");
}
function sky(a) {
  a.setAttribute("src", "./assets/images/Everyone's Sky.gif");
}
function ninja(a) {
  a.setAttribute("src", "./assets/images/Ninja vs EVILCORP.gif");
}
function rewire(a) {
  a.setAttribute("src", "./assets/images/Re-Wire.gif");
}
function offline(a) {
  a.setAttribute("src", "./assets/images/Off The Line.gif");
}

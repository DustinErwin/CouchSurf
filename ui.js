$(document).ready(function(){
 var dropdown =  $(".dropdown");
 var dropdownBtn = $("#dropdownBtn");
 var ytSelect = $("#youtubeSurf");
 var ytWidget = $("#youtubeWidget");
 var gameSelect = $('#gameSelect');
 var gameWidget = $("#gameWidget")
 var weatherSelect = $("#weatherSelect")
 var weatherWidget = $("#weatherWidget")
 var newsSelect = $("#newsSelect")
 var newsWidget =$("#newsWidget")


dropdownBtn.on("click", function (){
  dropdown.toggleClass("is-active")
})

ytSelect.on("click", function(){
  ytWidget.toggleClass("is-hidden")
  ytSelect.toggleClass("has-text-grey")
  
})

gameSelect.on("click", function(){
  gameWidget.toggleClass("is-hidden")
  gameSelect.toggleClass("has-text-grey")
})

weatherSelect.on("click", function(){
  weatherWidget.toggleClass("is-hidden")
  weatherSelect.toggleClass("has-text-grey")
})

newsSelect.on("click", function(){
  newsWidget.toggleClass("is-hidden")
  newsSelect.toggleClass("has-text-grey")
})



  }); 
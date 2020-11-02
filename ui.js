$(document).ready(function(){
 var dropdown =  $(".dropdown");
 var dropdownBtn = $("#dropdownBtn");
 var ytSelect = $("#youtubeSurf");
 var ytWidget = $("#youtubeWidget");
 var gameSelect = $('#gameSelect');
 var gameWidget = $("#gameWidget")



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




  }); 
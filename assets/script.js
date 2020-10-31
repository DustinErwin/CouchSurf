//youtube assignments 
let apiKey = "AIzaSyDMgUuuhmaYprHEA1ZG7iJBa-OY-kk092c";
let videoOption = $(".videoOptions");
let data = "";
let signInBtn = $(".signInBtn");
let testVideoLink = "https://www.youtube.com/embed/4H2lnt3QkyA";
let videoPlayer = $("#videoPlayer");

//grabs youtube api data: top video based on categorys
signInBtn.on("click", function () {
  let category = videoOption.val();
  $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/videos?",
    data: {
      key: apiKey,
      part: "snippet",
      chart: "mostPopular",
      regionCode: "US",
      videoCategoryId: category,
      maxResults: 1,
    },
    success: function (data) {
      videoPlayer.attr("src", `https://www.youtube.com/embed/${data.items[0].id}`);
      console.log(category)
    },
    error: function () {
      console.log("Request Failed");
    },
  });
});
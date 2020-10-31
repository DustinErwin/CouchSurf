//Youtube Section

//youtube assignments
let youTubeApiKey = "AIzaSyDMgUuuhmaYprHEA1ZG7iJBa-OY-kk092c";
let videoOption = $(".videoOptions");
let data = "";
let videoSelectBtn = $(".videoSelectBtn");
let testVideoLink = "https://www.youtube.com/embed/4H2lnt3QkyA";
let videoPlayer = $("#videoPlayer");

//grabs youtube api data: top video based on categorys
videoSelectBtn.on("click", function () {
  let category = videoOption.val();
  $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/videos?",
    data: {
      key: youTubeApiKey,
      part: "snippet",
      chart: "mostPopular",
      regionCode: "US",
      videoCategoryId: category,
      maxResults: 1,
    },
    success: function (data) {
      videoPlayer.attr(
        "src",
        `https://www.youtube.com/embed/${data.items[0].id}`
      );
      console.log(category);
    },
    error: function () {
      console.log("Request Failed");
    },
  });
});

//news api section
gNewsApiKey = 'c5a54deae1f487f4cb1dc7a4c62630cd'
newsOptions = $('.newsOptions').val()
newsSelectBtn = $('.newsSelectBtn')

newsSelectBtn.on("click", function () {
    $.ajax({
        url: 'https://gnews.io/api/v4/top-headlines?token=' + gNewsApiKey + '&max=3&lang=en&topic=' + newsOptions,
        type: "GET",
        success: function (data) {
         
        },
        error: function () {
          console.log("Request Failed");
        },
      });
    })
      
      
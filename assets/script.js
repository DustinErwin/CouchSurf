//Youtube Section

//youtube assignments
let youTubeApiKey = "AIzaSyDMgUuuhmaYprHEA1ZG7iJBa-OY-kk092c";
let videoOption = $(".videoOptions");
let data = "";
let videoSelectBtn = $(".videoSelectBtn");
let testVideoLink = "https://www.youtube.com/embed/4H2lnt3QkyA";
let videoPlayer = $("#videoPlayer");
let videoArray;
if (videoArray == null) videoArray = []; //creates an array for local storage if it doesn't yet exist
if (videoArray != []) {
  //stops a bug when D.S.V() tries to run without a value
  displaySavedVideos();
}

//grabs local storage and diplays saved videos on screen
function displaySavedVideos() {
  videosDiv = $(".savedVideos");
  videosDiv.empty();
  savedVideoList = JSON.parse(localStorage.getItem("savedVideoList"));
  if (savedVideoList != null) {
    for (i = 0; i < savedVideoList.length; i++) {
      pTag = $("<p>");
      pTag.text(savedVideoList[i].items[0].snippet.title);
      pTag.attr("id", savedVideoList[i].items[0].id);
      videosDiv.append(pTag);
      //creates dynamic onClick that changes video on screen
      pTag.on("click", function () {
        videoPlayer.attr(
          "src",
          `https://www.youtube.com/embed/${$(this).attr("id")}`
        );
      });
    }
  }
}

function getVideoData() {
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
      localStorage.setItem("currentYoutubeVideo", JSON.stringify(data));
    },
    error: function () {
      console.log("Request Failed");
    },
  });
}

//grabs youtube api data: top video based on categories
videoSelectBtn.on("click", function () {
  getVideoData();
});
//Youtube Save Video for Later
$(".saveVideo").on("click", function () {
  //if there is local storage, videoArray grabs that list and adds current video, then sets to local storage
  if (JSON.parse(localStorage.getItem("savedVideoList") !== null)) {
    videoArray = [];
    let currentVideos = JSON.parse(localStorage.getItem("savedVideoList"));
    //adds each saved item in local storage to videoArray
    for (i = 0; i < currentVideos.length; i++) {
      videoArray.push(currentVideos[i]);
    }
    //adds current video to beginning of array
    videoArray.unshift(JSON.parse(localStorage.getItem("currentYoutubeVideo")));
  }
  //if no local storage, videoArray only adds currentvideo, then sets to local storage
  else {
    videoArray = [];
    videoArray.push(JSON.parse(localStorage.getItem("currentYoutubeVideo")));
  }
  localStorage.setItem("savedVideoList", JSON.stringify(videoArray));
  displaySavedVideos();
});

//Button that deletes saved Videos
deleteSaves = $(".deleteSaves");
deleteSaves.on("click", function () {
  localStorage.removeItem("savedVideoList"); //removes saved videos from local storage
  displaySavedVideos(); //displays saved videos (in this case, deletes them)
});

// //news api section
// gNewsApiKey = "c5a54deae1f487f4cb1dc7a4c62630cd";
// newsOptions = $(".newsOptions").val();
// newsSelectBtn = $(".newsSelectBtn");

// newsSelectBtn.on("click", function () {
//   $.ajax({
//     url:
//       "https://gnews.io/api/v4/top-headlines?token=" +
//       gNewsApiKey +
//       "&max=3&lang=en&topic=" +
//       newsOptions,
//     type: "GET",
//     success: function (data) {},
//     error: function () {
//       console.log("Request Failed");
//     },
//   });
// });

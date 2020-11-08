//Youtube Section

//youtube assignments
let youTubeApiKey = "AIzaSyDMgUuuhmaYprHEA1ZG7iJBa-OY-kk092c";
let videoOption = $(".videoOptions");
let videoSelectBtn = $(".videoSelectBtn");
let videoPlayer = $("#videoPlayer");

//displays current videos saved in local storage as soon as page loads
displaySavedVideos();

//creates p tags and delete button for saved items
function displaySavedVideos() {
  videosDiv = $(".savedVideos");
  videosDiv.empty();
  savedVideoList = JSON.parse(localStorage.getItem("savedVideoList"));
  if (savedVideoList != null) {
    for (i = 0; i < savedVideoList.length; i++) {
      pTag = $("<p>");
      pTag.addClass("videoTitles");
      //creates single Delete button
      deleteSingleBtn = $("<button>")
        .attr({
          type: "button",
          class: "couchSurf-btn deleteSingleBtn individual-delete-button",
          value: savedVideoList[i].items[0].snippet.title,
        })
        .text("Delete");
      pTag
        .attr({
          value: "savedVideoList[i].items[0].snippet.title",
          id: savedVideoList[i].items[0].id,
        })
        .text(savedVideoList[i].items[0].snippet.title);
      //append individual delete button button
      pTag.append(deleteSingleBtn);
      videosDiv.append(pTag);
    }
  }
}

//creates dynamic onClick that changes video on screen
$(document).on("click", ".videoTitles", function () {
  videoPlayer.attr(
    "src",
    `https://www.youtube.com/embed/${$(this).attr("id")}`
  );
});

$(document).on("click", ".deleteSingleBtn", function () {
  //pull saved video list and set equal to variable
  savedVideoList = JSON.parse(localStorage.getItem("savedVideoList"));
  //for each item, check if $this id === saved video list name
  for (i = 0; i < savedVideoList.length; i++) {
    //if true, remove that index from the list
    if (
      savedVideoList[i].items[0].snippet.title === deleteSingleBtn.attr("value")
    ) {
      savedVideoList.splice([i], 1);
      //then set that new list back to local storage
      localStorage.setItem("savedVideoList", JSON.stringify(savedVideoList));
    }
  }

  //set the new list back in storage
  //remove the pTag on screen containing deleted information
  $(this).parent().remove();
});

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
      console.warn("Request Failed");
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

//Button that deletes all saved Videos
deleteSaves = $(".deleteSaves");
deleteSaves.on("click", function () {
  localStorage.removeItem("savedVideoList");

  displaySavedVideos(); //displays saved videos (in this case, deletes them)
});

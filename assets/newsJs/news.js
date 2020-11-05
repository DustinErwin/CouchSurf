//Api Key Assignment
gNewsApiKey = "c5a54deae1f487f4cb1dc7a4c62630cd";

//calls displaySavedArticles
displaySavedArticles();

//displays saved articles from local storage
function displaySavedArticles() {
  savedArticlesDiv = $(".savedArticlesDiv");
  savedArticlesDiv.empty();
  savedArticleList = JSON.parse(localStorage.getItem("savedArticleList"));
  if (savedArticleList != null) {
    for (i = 0; i < savedArticleList.length; i++) {
      //creates delete button
      deleteSingleBtn = $("<button>")
        .attr({
          type: "button",
          class: "couchSurf-btn deleteSingleBtn individual-delete-button",
          value: "saved[i].items[0].snippet.title",
        })
        .text("Delete");
      //creates a ptag from local storage data
      pTag = $("<p>")
        .text(
          `${savedArticleList[i].articles[0].title} (${savedArticleList[i].articles[0].source.name})`
        )
        .val(savedArticleList[i].articles[0].title)
        .addClass("pTag")
        .append(deleteSingleBtn);

      savedArticlesDiv.append(pTag);
    }
  }
}

function getNewsData() {
  let newsOptions = $(".newsOptions").val();

  $.ajax({
    url:
      "https://gnews.io/api/v4/top-headlines?token=" +
      gNewsApiKey +
      "&max=1&lang=en&q=" +
      newsOptions +
      "&country=us",
    type: "GET",
    success: function (data) {
      localStorage.setItem("currentNewsArticle", JSON.stringify(data));
      displayCurrentArticle();
    },
    error: function () {
      console.log("Request Failed");
    },
  });
}

$(".newsSelectBtn").on("click", function () {
  getNewsData();
});

//grabs the data from local storage based on current selected article and displays it.
function displayCurrentArticle() {
  $(".placeholderImg").addClass("hidden");
  //assign HTML elememts
  currentArticleDiv = $(".currentArticleDiv");
  currentArticleTitle = $(".currentArticleTitle");
  currentArticle = JSON.parse(localStorage.getItem("currentNewsArticle"));
  currentNewsImage = $(".currentNewsImage");
  currentArticleContent = $(".currentArticleContent");
  currentArticleSource = $(".currentArticleSource");

  //Empties previous content
  currentArticleDiv.empty();

  //creates tags
  titleTag = $("<h2>");
  imageTag = $("<img />");
  descriptionTag = $("<p>");
  sourceTag = $("<a>");
  titleTag.text(currentArticle.articles[0].title);
  currentArticleDiv.append(titleTag);
  // appends News Image
  imageTag.attr("width", "480");
  imageTag.attr("src", currentArticle.articles[0].image);
  currentArticleDiv.append(imageTag);
  //append news content below image
  descriptionTag.text(currentArticle.articles[0].description);
  currentArticleDiv.append(descriptionTag);
  //append news source
  sourceTag.text("Source: " + currentArticle.articles[0].source.name);
  sourceTag.attr("href", currentArticle.articles[0].source.url);
  currentArticleDiv.append(sourceTag);
  newsContainer.prepend(currentArticleDiv);
}

//grabs save Article Button
saveArticleBtn = $(".saveArticle");

currentNewsArticle = [];

saveArticleBtn.on("click", function () {
  //if there is local storage, newsArray grabs that list and adds current Article, then sets to local storage
  if (JSON.parse(localStorage.getItem("savedArticleList") !== null)) {
    currentNewsArticle = [];
    let savedArticleList = JSON.parse(localStorage.getItem("savedArticleList"));
    //adds each saved item in local storage to currentNewsArticle
    for (i = 0; i < savedArticleList.length; i++) {
      currentNewsArticle.push(savedArticleList[i]);
    }
    //adds current video to beginning of array
    currentNewsArticle.unshift(
      JSON.parse(localStorage.getItem("currentNewsArticle"))
    );
  }
  //if no local storage, currentNewsArticle only adds currentvideo, then sets to local storage
  else {
    console.log("this works");
    currentNewsArticle = [];
    currentNewsArticle.push(
      JSON.parse(localStorage.getItem("currentNewsArticle"))
    );
  }
  localStorage.setItem("savedArticleList", JSON.stringify(currentNewsArticle));
  displaySavedArticles();
});

//Clicking on a title changes news on screen to selected title info
$(document).on("click", ".pTag", function () {
  for (i = 0; i < savedArticleList.length; i++) {
    if ($(this).val() === savedArticleList[i].articles[0].title) {
      //Grab News Container
      currentArticleDiv = $(".currentArticleDiv");
      //empties news container
      currentArticleDiv.empty();
      //creates tags
      titleTag = $("<h2>");
      imageTag = $("<img />");
      descriptionTag = $("<p>");
      sourceTag = $("<a>");
      titleTag.text(savedArticleList[i].articles[0].title);
      currentArticleDiv.append(titleTag);
      // appends News Image
      imageTag.attr("width", "480");
      imageTag.attr("src", savedArticleList[i].articles[0].image);
      currentArticleDiv.append(imageTag);
      //append news content below image
      descriptionTag.text(savedArticleList[i].articles[0].description);
      currentArticleDiv.append(descriptionTag);
      //append news source
      sourceTag.text("source" + savedArticleList[i].articles[0].source.name);
      sourceTag.attr("href", savedArticleList[i].articles[0].source.url);
      currentArticleDiv.append(sourceTag);
    }
  }
});

//Button that deletes saved Articles
deleteNewsBtn = $(".deleteNewsBtn");
deleteNewsBtn.on("click", function () {
  localStorage.removeItem("savedArticleList");
  displaySavedArticles(); //displays saved articles (in this case, deletes them)
});

//deletes single ptag for news items
$(document).on("click", ".deleteSingleNewsBtn", function () {
  //pull saved video list and set equal to variable
  savedArticleList = JSON.parse(localStorage.getItem("savedArticleList"));
  //for each item, check if $this id === saved video list name
  for (i = 0; i < savedArticleList.length; i++) {
    //if true, remove that index from the list
    if (
      savedArticleList[i].articles[0].title ===
      deleteSingleNewsBtn.attr("value")
    ) {
      savedVideoList.splice([i], 1);
      //then set that new list back to local storage
      localStorage.setItem(
        "savedArticleList",
        JSON.stringify(savedArticleList)
      );
    }
  }
});

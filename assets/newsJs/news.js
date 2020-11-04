//news api section

displaySavedArticles();

gNewsApiKey = "c5a54deae1f487f4cb1dc7a4c62630cd";
newsSelectBtn = $(".newsSelectBtn");

newsSelectBtn.on("click", function () {
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
      displayCurrentArticles();
    },
    error: function () {
      console.log("Request Failed");
    },
  });
});

//grabs the data from local storage based on current selected article and displays it.
function displayCurrentArticles() {
  //assign HTML elememts
  currentArticleTitle = $(".currentArticleTitle");
  currentArticle = JSON.parse(localStorage.getItem("currentNewsArticle"));
  currentNewsImage = $(".currentNewsImage");
  currentArticleContent = $(".currentArticleContent");
  currentArticleSource = $(".currentArticleSource");
  newsContainer = $(".newsContainer");

  //Empties previous content
  newsContainer.empty();

  //creates tags
  titleTag = $("<h2>");
  imageTag = $("<img />");
  descriptionTag = $("<p>");
  sourceTag = $("<a>");

  titleTag.text(currentArticle.articles[0].title);
  newsContainer.append(titleTag);
  // appends News Image
  imageTag.attr("width", "480");
  imageTag.attr("src", currentArticle.articles[0].image);
  newsContainer.append(imageTag);
  //append news content below image
  descriptionTag.text(currentArticle.articles[0].description);
  newsContainer.append(descriptionTag);
  //append news source
  sourceTag.text("Source: " + currentArticle.articles[0].source.name);
  sourceTag.attr("href", currentArticle.articles[0].source.url);
  newsContainer.append(sourceTag);
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
    currentNewsArticle = [];
    currentNewsArticle.push(
      JSON.parse(localStorage.getItem("currentNewsArticle"))
    );
  }
  localStorage.setItem("savedArticleList", JSON.stringify(currentNewsArticle));
  displaySavedArticles();
});

//displays saved articles from local storage
function displaySavedArticles() {
  savedArticlesDiv = $(".savedArticlesDiv");
  savedArticlesDiv.empty();
  savedArticleList = JSON.parse(localStorage.getItem("savedArticleList"));

  if (savedArticleList != null) {
    for (i = 0; i < savedArticleList.length; i++) {
      pTag = $("<p>");
      pTag.attr("href");
      pTag.text(
        `${savedArticleList[i].articles[0].title} (${savedArticleList[i].articles[0].source.name})`
      );
      pTag.val(savedArticleList[i].articles[0].title);
      savedArticlesDiv.append(pTag);

      //Clicking on a title changes news on screen to selected title info
      pTag.on("click", function () {
        for (i = 0; i < savedArticleList.length; i++) {
          if ($(this).val() === savedArticleList[i].articles[0].title) {
            //Grab News Container
            newsContainer = $(".newsContainer");
            //empties news container
            newsContainer.empty();
            //creates tags
            titleTag = $("<h2>");
            imageTag = $("<img />");
            descriptionTag = $("<p>");
            sourceTag = $("<a>");
            titleTag.text(savedArticleList[i].articles[0].title);
            newsContainer.append(titleTag);
            // appends News Image
            imageTag.attr("width", "480");
            imageTag.attr("src", savedArticleList[i].articles[0].image);
            newsContainer.append(imageTag);
            //append news content below image
            descriptionTag.text(savedArticleList[i].articles[0].description);
            newsContainer.append(descriptionTag);
            //append news source
            sourceTag.text(
              "source" + savedArticleList[i].articles[0].source.name
            );
            sourceTag.attr("href", savedArticleList[i].articles[0].source.url);
            newsContainer.append(sourceTag);
          }
        }
      });
    }
  }
}

//Button that deletes saved Articles
deleteNewsBtn = $(".deleteNewsBtn");
deleteNewsBtn.on("click", function () {
  localStorage.removeItem("savedArticleList");
  displaySavedArticles(); //displays saved videos (in this case, deletes them)
});

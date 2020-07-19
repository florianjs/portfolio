let articleSection = document.getElementById("articles-section");

function init() {
  axios
    .get("https://dev.to/api/articles?username=icesofty")
    .then(function (response) {
      response.data.forEach((element) => {
        console.log(element.title);
        articleSection.innerHTML += element.title;
      });
    })
    .catch(function (error) {
      console.warn(error);
    });
}

init();

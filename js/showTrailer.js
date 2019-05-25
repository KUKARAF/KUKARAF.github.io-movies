function descriptionShow(text, title) {
  document.getElementById("reader").innerText = text;
  document.getElementById("readerTitle").innerText = title;
  document.getElementsByClassName("hiddenDescription")[0].style.display =
    "block";
  //alert(text)
}

document.getElementsByClassName("hiddenDescription")[0].onclick = function() {
  this.style.display = "none";
};

$(function() {
  var apiKey = "6fdc5c01510bdf1f0ae8d691f2fe166f";

  topMovieList = [];
  $.get(
    "https://api.themoviedb.org/3/list/109407?page=1&api_key=" + apiKey,
    function(movies) {
      $.each(movies.items, function(key, movie) {
        $.get(
          "https://api.themoviedb.org/3/movie/" +
            movie.id +
            "/videos?api_key=" +
            apiKey,
          function(trailers) {
            if (trailers.results.length) {
              console.log(movie);

              htmlMovie = `
      <div class="col-md-3">
        <div class="mb-6 bg movieCard autoComplete">
            <img class="w-100" src="http://image.tmdb.org/t/p/w500${
              movie.poster_path
            }">
            <div class="movieCard overlay">
              <h2 class="title">${movie.title}</h2>
              <p class="description" tit="${
                movie.title
              }" onclick=descriptionShow(this.innerText,this.getAttribute("tit")) >${
                movie.overview
              }</p>
              <div class="btn-group  movieDetails movieDetailButton" role="group" aria-label="Button group with nested dropdown">
                <a class="btn btn-secondary" data-fancybox data-type="iframe" data-src="/movie.html#http://image.tmdb.org/t/p/w1280${
                  movie.backdrop_path
                }" href="javascript:;">
                  More
                </a>
                <a class="trailerPlay btn btn-secondary" data-fancybox href="https://www.youtube.com/watch?v=${
                  trailers.results[0].key
                }">
                  <i class="trailerPlay fas fa-play"></i>
                </a>

              </div>
            </div>
          </div>
          <!-- close movie container  -->
</div>
              `;

              topMovieList.push(htmlMovie);
            }
          }
        );

        $("#topMovieCardsContainerlMovies").html(topMovieList);
      });
    }
  );
});

setTimeout(function() {
  document.getElementById(
    "topMovieCardsContainerlMovies"
  ).innerHTML = topMovieList.join("");
  console.log(topMovieList);
}, 2000);

// TEST
function loadTrailer(o) {
  event.preventDefault();
  document.getElementsByClassName("YoutubeTrailer")[0].style.display =
    "initial";
  b = o.parentElement.parentElement.parentElement.getAttribute("movieID");
  console.log(b);
  loadjsonastxt(b);
}
a = "";

function loadjsonastxt(b) {
  console.log("do nothing ");
  //seems i have badly formated json files
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     a = this.responseText;
  //     console.log(a);

  //     document.getElementById("ytb").src =
  //       "http:" + a.split(",")[a.split(",").length - 1].split("'")[3];
  //   }
  // };

  // xhttp.open("GET", "../moovies/" + b + "_data.json", true);
  // xhttp.send();
}

function loadMainmovie() {
  loadjsonastxt("299536");
  // document.getElementsByClassName("YoutubeTrailer")[0].style.display =
  //   "initial";
}

function goToMovie(o) {
  event.preventDefault();
  b = o.parentElement.parentElement.parentElement.getAttribute("movieID");
  console.log(b);

  // $.fancybox.open({
  // 	src  : '/movie.html#'+b,
  //   type : 'iframe',
  //   scrollingIframe: 'no',
  //   scrolling : 'no',

  // 	opts : {
  // 		afterShow : function( instance, current ) {
  // 			console.info( 'done!' );
  // 		}
  // 	}
  // });
}

function hideTrailer() {
  document.getElementsByClassName("YoutubeTrailer")[0].style.display = "none";
  document.getElementById("ytb").src = undefined;
}

// hideTrailer();

function loadTrailer() {
  console.log("asdasdds");
}

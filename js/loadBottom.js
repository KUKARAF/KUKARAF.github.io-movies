empty = `  <i class=\"far fa-star\"></i>`
full = ` <i class=\"fas fa-star\"></i>`


function generateStars(num) {
  starhtml = "";
  if (num == 0) {
    return empty + empty + empty + empty + empty;
  } else if (num == 1) {
    return full + empty + empty + empty + empty;
  } else if (num == 2) {
    return full + full + empty + empty + empty;
  } else if (num == 3) {
    return full + full + full + empty + empty;
  } else if (num == 4) {
    return full + full + full + full + empty;
  } else {
    return full + full + full + full + full;
  }
}

$(function() {
  var apiKey = "6fdc5c01510bdf1f0ae8d691f2fe166f";
  moviesListt = [];
  topMovieList = [];
  $.get(
    "https://api.themoviedb.org/3/list/109283?page=1&api_key=" + apiKey,
    function(movies) {
      $.each(movies.items, function(key, movie) {
        $.get(
          "https://api.themoviedb.org/3/movie/" +
            movie.id +
            "/videos?api_key=" +
            apiKey,
          function(trailers) {
            if (trailers.results.length) {
              // console.log("do it");

              var movieHtml = `
      <div class="container-fluid px-0 secondMovieSpace autoComplete" movieID=457136>
        <div class="row no-gutters secondMovieCard" style="background-image: url(http://image.tmdb.org/t/p/w1280${
          movie.backdrop_path
        })">
          <div class="col-md-3">
            <img class="w-100" src="http://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
            <div class="p-3 p-md-4 d-block d-md-none mobile-overlay">
            <h2 class="title">${movie.title}</h2>

            <div class="rating">
            ${generateStars(Math.round(movie.vote_average/2))}
            </div>

            <p class="description" tit="${
              movie.title
            }" onclick=descriptionShow(this.innerText,this.getAttribute("tit")) >${movie.overview}</p>

            <div class="btn-group bottomButton" role="group" aria-label="Button group with nested dropdown">
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
          <div class="col-md-9 text-left d-none d-md-block">

            <div class="p-3 p-md-4">
            <h2 class="title">${movie.title}</h2>

            <div class="rating">
            ${generateStars(Math.round(movie.vote_average/2))}
            </div>

            <p class="description" tit="${
              movie.title
            }" onclick=descriptionShow(this.innerText,this.getAttribute("tit")) >${movie.overview}</p>

            <div class="btn-group bottomButton" role="group" aria-label="Button group with nested dropdown">
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

        </div>

      </div>
      `;
            } else {
              var movieHtml = ``;
              console.log("movie not loaded Error")
              console.log(movie)
            }

            moviesListt.push(movieHtml);
          }
        );
      });

      //   $("#moviesList").html(moviesListt);
    }
  );
});

setTimeout(function() {
  document.getElementById("moviesList").innerHTML = moviesListt.join("");
}, 2000);

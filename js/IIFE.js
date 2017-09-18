$(function() {
  buildHeader();
  buildMain();
  buildFooter();
});

$(document).ready(function() {

  $(".reset").on("click", function() {
    reset();
  });

  $(".vsai").on("click", function() {
    aiModal();
  });

  $(".start").on("click", function() {
    start();
  });

});

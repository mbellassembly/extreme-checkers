$(function() {
  buildHeader();
  buildMain();
  buildFooter();
});

$(document).ready(function() {

  $(".reset").on("mouseup", function() {
    reset();
  });

  $(".vsai").on("mouseup", function() {
    aiModal();
  });

  $(".start").on("mouseup", function() {
    start();
  });

});

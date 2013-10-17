//$.fn.hexed = function() {
$(function(){

  var randomCol = '#'+Math.floor(Math.random()*16777215).toString(16);
  $("#rand_swatch").css("background-color", randomCol);

  $( "#red, #green, #blue" ).slider({
    orientation: "horizontal",
    range: "min",
    min: 0,
    max: 255,
    slide: refreshSwatch,
    change: refreshSwatch
  });
  $( "#red" ).slider( "value", 0 );
  $( "#green" ).slider( "value", 0 );
  $( "#blue" ).slider( "value", 0 );

  $( "#input_red" ).change(function() {
    $( "#red" ).slider( "value", $(this).val() );
  });
  $( "#input_green" ).change(function() {
    $( "#green" ).slider( "value", $(this).val() );
  });
  $( "#input_blue" ).change(function() {
    $( "#blue" ).slider( "value", $(this).val() );
  });

});

function refreshSwatch() {
  var 
  red = $( "#red" ).slider( "value" ),
  green = $( "#green" ).slider( "value" ),
  blue = $( "#blue" ).slider( "value" ),
  color = "rgb(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ")";
  $( "#swatch" ).css( "background-color", color);
  $('#input_red').val(red);
  $('#input_green').val(green);
  $('#input_blue').val(blue);
}

function startGame () {
  $("input[name=difficulty]").attr("disabled", "disabled");
  $("input[name=turns]").attr("disabled", "disabled");
  //alert($("input[name=difficulty]").val() + $("input[name=turns]").val());
  $("#playButton").hide("fast"); //just for appearance's sake
  $("#game").show("fast");
}

function showResult(){
  $("#swatch").show("fast");
  $("#result").show("fast");
  var y = $(window).scrollTop();
  $("#result").scrollTop(y + 800);  
  $( "#red, #green, #blue" ).slider({ disabled: true });
  $("#input_red, #input_green, #input_blue").attr("disabled", "disabled");
  $("input[type=submit]").attr("disabled", "disabled");

}

function next(){
  window.location.reload();
}

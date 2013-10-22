//$.fn.hexed = function() {
$(function(){
  $( "#red, #green, #blue" ).slider({ //set slider properties
    orientation: "horizontal",
    range: "min",
    min: 0,
    max: 255,
    slide: refreshSwatch,
    change: refreshSwatch
  });
  $( "#red" ).slider( "value", 0 ); //init slider values
  $( "#green" ).slider( "value", 0 );
  $( "#blue" ).slider( "value", 0 );

  $( "#input_red" ).change(function() { //sync value box to slider
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
  var red = $( "#red" ).slider( "value" ), //grab values
  green = $( "#green" ).slider( "value" ),
  blue = $( "#blue" ).slider( "value" ), 
  color = "rgb(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ")";
  $( "#swatch" ).css( "background-color", color); //color solution
  $('#input_red').val(red); //update value box
  $('#input_green').val(green);
  $('#input_blue').val(blue);
}
$.fn.hexed = function() {
    var difficulty, turns; 
    $("#final_score").hide();	
    var start, r, g, b,
	startGame, showResult, next;
	
    startGame = function() {
      total_score = 0; //start final score at 0
	  
	  $(this).text("Got it!"); //set text for next step
	  start =  new Date().getTime(); //get timer
	  var timer = setInterval(function() { //update timer
	    $('#time').text(Math.floor((new Date - start) / 1000) + " seconds");
	  }, 1000);
	  
	  r = Math.floor(255*Math.random());  //get random color
	  g = Math.floor(255*Math.random());
	  b = Math.floor(255*Math.random());
	  var randomCol = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
	  $("#rand_swatch").css("background-color", randomCol); //set guess color
	  
	  difficulty = parseInt(document.getElementsByName("difficulty")[0].value); //get difficulty value
	  turns = parseInt(document.getElementsByName("turns")[0].value); //get turn value
	  $("input[name=difficulty]").attr("disabled", "disabled"); //disable inputs
	  $("input[name=turns]").attr("disabled", "disabled");
	  $("#game").show("slow"); //show next step
	  $(this).unbind().click(showResult); //ind next function
	},
	

	showResult = function() {
	  $(this).text("Next"); //text for next step
	  var red = $( "#red" ).slider( "value" ), //get guess value
	  green = $( "#green" ).slider( "value" ),
	  blue = $( "#blue" ).slider( "value" ),
	  //Plotka's formula of doom and demise
	  accuracy = (Math.abs(r - red) + Math.abs(g - green) + Math.abs(b - blue))/765,
	  milliseconds_taken =  new Date().getTime() - start,
	  score = Math.floor(((15 - difficulty- accuracy*100)/(15 - difficulty))
			  * (15000-milliseconds_taken));
	  if(score < 0) //reduce to 0 if < 0
		score = 0;
	  total_score += score; //add score
	  $("#scoreboard").text( score.toString() ); //show score
	  $("#timer").hide("fast"); //hide timer
	  $("#swatch").show("slow"); //show result
	  $("#result").show("slow");
	  var y = $(window).scrollTop(); //scroll
	  $("#result").scrollTop(y + 800);  
	  $( "#red, #green, #blue" ).slider({ disabled: true }); //disable
	  $("#input_red, #input_green, #input_blue").attr("disabled", "disabled");
	  $("input[type=submit]").attr("disabled", "disabled");
	  $(this).unbind().click(next); //nest step
	},

	next = function (){
	  $("#scores").html($("#scores").html() + "<li class='resultScore'>" + $("#result").html() + "</li>"); //add list items
	  turns--; //decrement turns
	  if(turns != 0) {
	    $("#time").text("0 seconds"); //set timer to 0
	    $("#timer").show("fast"); //show timer
        $(this).text("Got it!");
		$("#swatch").hide("slow"); //hide 
	    $("#result").hide("slow",  function() {});
		$('#input_red').val(0); //reset values
        $('#input_green').val(0);
        $('#input_blue').val(0);
        $( "#red, #green, #blue").slider("option", "value", $("#red, #green, #blue").slider("option", "min"));
		$( "#red, #green, #blue" ).slider({ disabled: false}); // reenable
	    $("#input_red").attr("disabled", false);
	    $("#input_green").attr("disabled", false);
		$("#input_blue").attr("disabled", false);
	    $("input[type=submit]").attr("disabled", false);
		r = Math.floor(255*Math.random()); //new color
	    g = Math.floor(255*Math.random());
	    b = Math.floor(255*Math.random());
	    var randomCol = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
	    $("#rand_swatch").css("background-color", randomCol);
		$(this).unbind().click(showResult);
		start =  new Date().getTime();
	  } else {
	  	$("#timer").hide("fast"); //hide/show
	  	$("#total_score").text(total_score);
		$("#final_score").show("fast");
		$("#result").hide("slow")
		$(this).text("Play Again!"); //new button
		$(this).unbind().click(function() {
            window.location = window.location; //reload window
		});
	  }
	};
	$(this).click(startGame);
}

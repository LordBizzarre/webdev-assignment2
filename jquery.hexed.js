(function($) {

    $.fn.hexed = function(options) {
        // Establish default settings
        var 
        defaults = {
            difficulty: 5,
            turns: 10
        },
        settings = $.extend({}, defaults, options),
        difficulty,
        turns;
        $("#display").width(200).height(200); //sets size of display
        for (item in settings) {
            if(item.first = difficulty)
                difficulty = item.second;
            else if(item.first = turns)
                turns = item.second;
        }
        
        var function2, 
        start, 
        r, g, b;
        
        var function1 = function () { //listen for the first click
                start =  new Date().getTime(); // to get the time simply recall the RSA
                                                                           // and subtract start from it
                this.innerHTML = "Got it!"; //change text of button
                r = Math.floor(255*Math.random()); //generate and show color
                g = Math.floor(255*Math.random());
                b = Math.floor(255*Math.random());
                var randomColor = "rgb(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")"
                $("#display").css("background-color", randomColor);
                $(this).unbind().click(function2);
        };
        
        function2 = function() { //listen for a second click
                this.innerHTML = "Start!";
                var redGuess = document.forms["red"]["val"].value; //get their color guess
                var greenGuess = document.forms["green"]["val"].value;
                var blueGuess = document.forms["blue"]["val"].value;
                if(redGuess == null || greenGuess == null || blueGuess == null ||
                          redGuess == "" || greenGuess == "" || greenGuess == "") {
                                                  this.innerHTML = "Got it!";
                        alert("You need to pick a value for all 3 sliders!");
                } else {
                        turns--; //decrement turns 
                        //using Plotka's formula
                        var accuracy = (Math.abs(r - parseInt(redGuess)) + Math.abs(g - parseInt(greenGuess)) 
                                          + Math.abs(b - parseInt(blueGuess)))/765
                        var milliseconds_taken =  new Date().getTime() - start;
                        var score = Math.floor(((15 - difficulty - accuracy*100)/(15-difficulty))
                                          * (15000-milliseconds_taken));
                        if(score < 0)
                                score = 0;
                        
                        $("#score_board").text( score.toString() );
                                                
                        if(turns != 0) 
                                $(this).unbind().click(function1);
                        else 
                                $(this).unbind().click(function() {
                                        alert("Game Over! Refresh your page to play again!");
                                });
                }
        };
        this.click(function1); //sets the first listener to function 1
        return this;
};
        


    }
}(jQuery));

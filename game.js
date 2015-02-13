(function(jquery){

	var game = (function(){
		var player = (function(){
			var score = 0;
			var currentNumOfPins;
			$ball = jquery('#ball');
			$ball.on('webkitAnimationEnd', function(){
				$ball.removeClass('animate');
				frame.updateCounters(score, currentNumOfPins);
			});

			return {
				roll: function(){ 
					currentNumOfPins = Math.floor(Math.random()*11); 
					$ball.addClass('animate');
					score += currentNumOfPins;
					return currentNumOfPins;
				}
			};
		})();

		var frame = (function() {
			var number = 0;
			var roll = 1;
			var rollMax = 2;
			var $el = jquery('#frame');
			var $turn = $el.find('#turn label');
			var $roll = $el.find('#roll');
			var $counters = $el.find('#counters');
			var $score = $el.find('#score .value');

			$el.find('button').on('click', function(){
				var numOfPins = player.roll();
				if (numOfPins == 10) {
					if (roll === 1) {
						rollMax = 4;
						counters.addClass('strike');
					} else if (roll === 2) {
						rollMax = 3;
						counters.addClass('spare');
					}
				}
			});

			return {
				startTurn: function(){
					$el.addClass('animate');
				},

				updateCounters: function(score, numOfPins) {
					$roll.find(".roll" + roll + " .value").text(numOfPins);
					$score.text(score);
					roll++;
				}
			}
		})();

		var intro = (function($nextEl){
			var $el = jquery('#intro');

			$el.find('h1').on('webkitAnimationEnd', function(){
				$el.on('webkitAnimationEnd', function(){
					frame.startTurn();
				});
				$el.addClass('animate');
			});
			
			return {
				animate: function(){
					$el.children().addClass('animate');
				}
			}
		})();

		intro.animate();

	})();
})(jQuery);
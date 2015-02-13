(function(jquery){

	var game = (function(){
		var player = (function(){
			var score = 0;
			var pinsDown = 0;
			var rollScore = 0;
			$ball = jquery('#ball');
			$ball.on('webkitAnimationEnd', function(){
				$ball.removeClass('animate');
				frame.updateCounters(score, pinsDown);
			});

			return {
				roll: function(rollNum){ 
					pinsDown = Math.floor(Math.random()*(10 - pinsDown)) + 1; 
					$ball.addClass('animate');
					score += pinsDown;
					rollScore = rollNum == 1 ? pinsDown : rollScore + pinsDown;
				},
				isStrike: function( rollNum ) { return rollNum == 1 & rollScore == 10; },
				isSpare:  function( rollNum ) { return rollNum == 2 & rollScore == 10; }
			};
		})();

		var frame = (function() {
			var turn = 1;
			var rollNum = 1;
			var rollMax = 2;
			var $el = jquery('#frame');
			var $turn = $el.find('#turn .value');
			var $roll = $el.find('#roll');
			var $counters = $el.find('#counters');
			var $score = $el.find('#score .value');

			$el.find('button').on('click', function(){ player.roll(rollNum); });

			$roll.on('transitionend', function(){
				if ($roll.hasClass('animate')) {
					$roll.find('.value').text('');
					$turn.text(turn);
					$counters.removeClass('strike spare');
					$roll.removeClass('animate');
				}
			});

			return {
				startTurn: function(){ $el.addClass('animate'); },

				updateCounters: function(score, numOfPins) {
					$roll.find(".roll" + rollNum + " .value").text(numOfPins);
					$score.text(score);
					if (player.isStrike(rollNum)) {
						rollMax = 4;
						$counters.addClass('strike');
					} else if (player.isSpare(rollNum)) {
						rollMax = 3;
						$counters.addClass('spare');
					}

					if (rollNum == rollMax) {
						rollNum = 1;
						rollMax = 2;
						turn++;
						$roll.addClass('animate');
					} else {
						rollNum++;						
					}
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
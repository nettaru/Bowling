(function(jquery){

	var game = (function(){
		var player = (function(){
			var score = 0;

			return {
				roll: function(){ return Math.floor(Math.random()*11); },

				getScore: function() { return score; },

				setScore: function(numOfPins) { score += numOfPins; }
			};
		})();

		var frame = (function() {
			var number = 0;
			var roll = 1;
			var rollMax = 2;
			var $el = jquery('#frame');
			var startTurn = function(){
				$el.addClass('animate');

			};
			var bindEvents = function(){
				$el.on('start', startTurn);
				$el.find('button').on('click', function(){
					var score = player.roll();
					if (score = 10) {
						rollMax = (roll === 1) ? 4 : 3;
					};
					roll++;

					animate(score, roll);
				});
			}();

			return {
				getNumber: function(){ return number; },

				startTurn: function(){ },

				getEl:	function(){ return $el; },
			}
		})();

		var intro = (function($nextEl){
			var $el = jquery('#intro');

			var bindEvents = function(){
				$el.find('h1').on('webkitAnimationEnd', function(){
					$el.on('webkitAnimationEnd', function(){
						$nextEl.trigger('start');
					});
					$el.addClass('animate');
				});
			};
			
			return {
				animate: function(){
					bindEvents();
					$el.children().addClass('animate');
				}
			}
		})(frame.getEl());

		var play = (function(){
			intro.animate();

		})();
	})();
})(jQuery);
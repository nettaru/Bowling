(function(jquery){

	var game = (function(){
		var player = (function(){
			var score = 0;

			return {
				roll: function(){ return Math.floor(Math.random()*10) + 1; },

				getScore: function() { return score; },

				setScore: function(numOfPins) { score += numOfPins; }
			};
		})();

		var frame = (function(frameNum) {
			var number = frameNum;
			var $el = jquery('#frame');

			return {
				getNumber: function(){ return number; },

				startTurn: function(){ ; },				
			}
		})();

		var intro = (function(){
			var $el = jquery('#intro');

			$el.find('h1').on('webkitAnimationEnd', function(){$el.addClass('animate');});
		})();
	})();
})(jQuery);
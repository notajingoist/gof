(function (){

	var app = angular.module('app', []);

	// console.log($(document).height());
	// console.log($(document).width());
	// var setHeight = function(elements) {
	// 	elements.height($(document).height());
	// };
	// 
	function EventController($scope) {
		$scope.$chapters = angular.element('.chapter');
		$leftFoot = angular.element('.left-foot');
		$rightFoot = angular.element('.right-foot');
		
		//console.log($scope.$feet);
		//
		//
		//
		

		$scope.$on('mouseMove', function(event, points) {
			var x = points[0];
			var y = points[1];

			var height = $(document).height();
			var width = $(document).width();

			if ($scope.currentChapter === 0) {


				//console.log(points);
				//do stuff for fish pedicure with x, y input
				//
				//console.log($leftFoot);
				

				for (var i = 0; i < $leftFoot.length; i++) {
					//console.log(x);
					var regionLimit = 0.2 * width;
					var outerRegionLimit = -50;//0 * width;

					if (x > outerRegionLimit && x < (width/2) - regionLimit) {
						//move left foot
						
						displacement = x - (width/4);
						displacement = (displacement * 0.2) + (.14 * width);

						//console.log(displacement);
						$($leftFoot[i]).css({
							left: displacement
						});
					} else if (x < (width - outerRegionLimit) && x > (width/2) + regionLimit) {
						//move right foot

						//displacement = (width/2) - (x - (width/4));
						displacement = x - (width/2) - (width/4);
						displacement = (displacement * 0.2) + ((.50 - .14) * width);
						//displacement = 
						//
						
						//console.log(displacement);
						//console.log($rightFoot);
						$($rightFoot[i]).css({
							left: displacement
						});
					}
				}

				var getRandomNum2 = function(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}

				var $ripples = angular.element('.ripple');
				//console.log($ripples);
				for (var i = 0; i < $ripples.length; i++) {
					var idx = (i + 1) % 12;
					var currLeft = $($ripples[i]).css('left').replace(/[^-\d\.]/g,'');
					var currTop = $($ripples[i]).css('top').replace(/[^-\d\.]/g,'');
					//var currRotate = $($ripples[i]).css('');
					//console.log($($ripples[i]));

					$($ripples[i]).css({
						left: parseInt(currLeft) + (getRandomNum2(-5, 5) % (width-parseInt(currLeft))),
						top: parseInt(currTop) + (getRandomNum2(-5, 5) % (height-parseInt(currTop))),
					});

					//console.log(currLeft);

					//console.log(allRipples[i]);
				}


			} else {
				//do stuff for other chapters
			}

		});


		// $scope.$feet.on('click', function(e) {
		// 	alert("hey");
		// });


		// if ($scope.currentChapter === 0) {
		// 	console.log($scope.$chapters);

		// 	// $scope.$chapters.on('click', function(e) {
		// 	// 	alert(e);
		// 	// });

		// } else {
		// 	console.log('blah');
		// }

		
		// for (var i = 0; i < $scope.$chapters.length; i++) {
		// 	//var $chapter = $scope.$chapters[i];
		// 	$($scope.$chapters[i]).on('click', function() {
		// 		//alert ('hey ' + i);
		// 	});
		// }
	}
	
	// function CanvasController() {
	// 	//this.currentChapter = 0;

	// 	var chapters = angular.element('.chapter');
	// 	console.log(chapters);
	// }

	function OatController($scope) {

	}

	function FishController($scope) {
		$scope.currentMode = 'both';

		var fish = this;

		this.isModeSet = function(mode) {
			return $scope.currentMode === mode;
		};

		this.setMode = function(activeMode) {
			$scope.currentMode = activeMode;
		};

		this.makeRipple = function(rippleClass, rippleId) {
			return '<div class="ripple ripple-'  + rippleClass + ' id="ripple-' + rippleId + '"></div>';
		}

		var ripples = angular.element('.ripples');
		var height = $(document).height();
		var width = $(document).width();

		var numRipples = 77;
		for (var i = 0; i < numRipples; i++) {
			var idx = (i + 1) % 12;
			var ripple = this.makeRipple(idx, i);
			// $(ripple).css({
			// 	left: 100,
			// 	bottom: 0
			// });
			ripples.append(ripple);
		}

		this.getRandomNum = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		var allRipples = $('.ripple');
		for (var i = 0; i < allRipples.length; i++) {
			var idx = (i + 1) % 12;
			
			
			$(allRipples[i]).css({
				left: this.getRandomNum(width*0, width*1),
				top: this.getRandomNum(height*0, height*1),
				WebkitTransform: 'rotate(' + this.getRandomNum(0, 360) + 'deg'
			});

			//console.log(allRipples[i]);
		}
		
		//console.log(ripples[0]);
	}

	function chapterConditions(activeChapter) {
		if (activeChapter === 0) {
			console.log($('.chapter')[0]);

		}
	}

	function ChapterController($scope) {
		$scope.currentChapter = 0;
		//chapterConditions($scope.currentChapter);


		// var chapters = $('.chapter');
		// console.log(chapters[0]);
		//setHeight(chapters);

		this.isSet = function(chapter) {
			return $scope.currentChapter === chapter;
		};

		// this.resetChapters = function() {
		// 	FishController.resetMode();
		// 	console.log(FishController);
		// }

		this.setChapter = function(activeChapter) {
			$scope.currentChapter = activeChapter;

			//chapterConditions(this.currentChapter);
		};

		$(document).mousemove(function(event) {
			//console.log(event);
			//console.log(event);
			$scope.$broadcast('mouseMove', [event.pageX, event.pageY]);
		});
	}

	app.controller('ChapterController', ChapterController);

	app.controller('FishController', FishController);

	app.controller('OatController', OatController);

	//app.controller('CanvasController', CanvasController);

	app.directive('chapterSection', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/chapter-section.html',
			controller: EventController,
			controllerAs: 'event'
		};

	});

	app.directive('navContents', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/nav-contents.html'
		};
	});


	//controller: ChapterController,
	//controllerAs: 'chapter'
	

})();

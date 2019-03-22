( function( $ ) {

	UAGBTimeline = {

		init: function() {
		},

		/**
		 * Alter the_content.
		 */
		_run: function( id ) {
			var $scope = $(id).find(".uagb-timeline");
			if ( 'undefined' == typeof $scope )
			return;

			// Define variables.
			var $this          		= $scope.find( '.uagb-timeline-wrapper' );
			var timeline_main   	= $scope.find(".uagb-timeline__main");
			var animate_border 		= $scope.find(".uagb-timeline__field");
			var timeline_icon  		= $scope.find(".uagb-timeline__marker");
			var line_inner   		= $scope.find(".uagb-timeline__line__inner");
			var line_outer   		= $scope.find(".uagb-timeline__line");
			var $icon_class 		= $scope.find(".uagb-timeline__marker");
			var $card_last 			= $scope.find(".uagb-timeline__field:last-child");

			var timeline_start_icon = $icon_class.first().position();
			var timeline_end_icon = $icon_class.last().position();

			line_outer.css('top', timeline_start_icon.top );

			var timeline_card_height = $card_last.height();

			var last_item_top = $card_last.offset().top - $this.offset().top;

			var $last_item, parent_top;

			if( $scope.hasClass('uagb-timeline__arrow-center')) {

				line_outer.css('bottom', timeline_end_icon.top );

				parent_top = last_item_top - timeline_start_icon.top;
				$last_item = parent_top + timeline_end_icon.top;

			} else if( $scope.hasClass('uagb-timeline__arrow-top')) {

				var top_height = timeline_card_height - timeline_end_icon.top;
				line_outer.css('bottom', top_height );

				$last_item = last_item_top;

			} else if( $scope.hasClass('uagb-timeline__arrow-bottom')) {

				var bottom_height = timeline_card_height - timeline_end_icon.top;
				line_outer.css('bottom', bottom_height );

				parent_top = last_item_top - timeline_start_icon.top;
				$last_item = parent_top + timeline_end_icon.top;

			}

			var viewportHeight = document.documentElement.clientHeight;
			var elementPos = $this.offset().top;

			var photoViewportOffsetTop = elementPos - $(document).scrollTop();

			var elementEnd = $last_item + 20;

			var initial_height = 0;

			line_inner.height(initial_height);

			var num = 0;

			function uagbTimelineInit(){
				var $document = $(document);
				// Repeat code for window resize event starts.
				timeline_start_icon = $icon_class.first().position();
				timeline_end_icon 	= $icon_class.last().position();

				$card_last 			= $scope.find(".uagb-timeline__field").last();

				line_outer.css('top', timeline_start_icon.top );

				timeline_card_height = $card_last.height();

				last_item_top = $card_last.offset().top - $this.offset().top;

				if( $scope.hasClass('uagb-timeline__arrow-center')) {

					line_outer.css('bottom', timeline_end_icon.top );
					parent_top = last_item_top - timeline_start_icon.top;
					$last_item = parent_top + timeline_end_icon.top;

				} else if( $scope.hasClass('uagb-timeline__arrow-top')) {

					var top_height = timeline_card_height - timeline_end_icon.top;
					line_outer.css('bottom', top_height );
					$last_item = last_item_top;

				} else if( $scope.hasClass('uagb-timeline__arrow-bottom')) {

					var bottom_height = timeline_card_height - timeline_end_icon.top;
					line_outer.css('bottom', bottom_height );
					parent_top = last_item_top - timeline_start_icon.top;
					$last_item = parent_top + timeline_end_icon.top;
				}
				elementEnd = $last_item + 20;

				// Repeat code for window resize event ends.

				var viewportHeight = document.documentElement.clientHeight;
				var viewportHeightHalf = viewportHeight/2;
				var elementPos = $this.offset().top;
				var new_elementPos = elementPos + timeline_start_icon.top;

				var photoViewportOffsetTop = new_elementPos - $document.scrollTop();

				if (photoViewportOffsetTop < 0) {
					photoViewportOffsetTop = Math.abs(photoViewportOffsetTop);
				} else {
					photoViewportOffsetTop = -Math.abs(photoViewportOffsetTop);
				}

				if ( elementPos < (viewportHeightHalf) ) {

					if ( (viewportHeightHalf) + Math.abs(photoViewportOffsetTop) < (elementEnd) ) {
						line_inner.height((viewportHeightHalf) + photoViewportOffsetTop);
					}else{
						if ( (photoViewportOffsetTop + viewportHeightHalf) >= elementEnd ) {
							line_inner.height(elementEnd);
						}
					}
				} else {
					if ( (photoViewportOffsetTop  + viewportHeightHalf) < elementEnd ) {
						if (0 > photoViewportOffsetTop) {
							line_inner.height((viewportHeightHalf) - Math.abs(photoViewportOffsetTop));
							++num;
						} else {
							line_inner.height((viewportHeightHalf) + photoViewportOffsetTop);
						}
					}else{
						if ( (photoViewportOffsetTop + viewportHeightHalf) >= elementEnd ) {
							line_inner.height(elementEnd);
						}
					}
				}

				var timeline_icon_pos, timeline_card_pos;
				var elementPos, elementCardPos;
				var timeline_icon_top, timeline_card_top;
				timeline_icon = $scope.find(".uagb-timeline__marker");
				animate_border 	= $scope.find(".uagb-timeline__field");

				if( animate_border.length == 0 ){
					animate_border  = $scope.find(".uagb-timeline__animate-border")
				}

				for (var i = 0; i < timeline_icon.length; i++) {

					timeline_icon_pos = $(timeline_icon[i]).offset().top;
					timeline_card_pos = $(animate_border[i]).offset().top;

					elementPos = $this.offset().top;
					elementCardPos = $this.offset().top;

					timeline_icon_top = timeline_icon_pos - $document.scrollTop();
					timeline_card_top = timeline_card_pos - $document.scrollTop();

					if ( ( timeline_card_top ) < ( ( viewportHeightHalf ) ) ) {

						animate_border[i].classList.remove("out-view");
						animate_border[i].classList.add("in-view");

					} else {
						// Remove classes if element is below than half of viewport.
						animate_border[i].classList.add("out-view");
						animate_border[i].classList.remove("in-view");
					}

					if ( ( timeline_icon_top ) < ( ( viewportHeightHalf ) ) ) {

						// Add classes if element is above than half of viewport.
						timeline_icon[i].classList.remove("uagb-timeline__out-view-icon");
						timeline_icon[i].classList.add("uagb-timeline__in-view-icon");

					} else {

						// Remove classes if element is below than half of viewport.
						timeline_icon[i].classList.add("uagb-timeline__out-view-icon");
						timeline_icon[i].classList.remove("uagb-timeline__in-view-icon");

					}
				}

			}

			window.addEventListener("load", uagbTimelineInit);
			window.addEventListener("resize", uagbTimelineInit);
			window.addEventListener("scroll", uagbTimelineInit);

		},

	}

	$( document ).ready(function() {
		UAGBTimeline.init()
	})


} )( jQuery )

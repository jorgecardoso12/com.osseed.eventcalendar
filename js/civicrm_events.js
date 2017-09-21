(function ($, _) {
	$(function() {

		var locations = [];
		function loadLocations() {
			$("#calendarlocations .box_wrap input").each(function(){
				if ($(this).is(':checked')) locations.push($(this).val());
			});
		}
		loadLocations();
		// console.log(locations);

		$("#calendarlocations .box_wrap input").on("click",function(){
			locations = [];
			loadLocations();
			// console.log(locations);
			$(".full-calendar").each(function(){
				if (!$(this).data('fullCalendar')) return;
				$(this).fullCalendar('rerenderEvents');
			});

		});

		$(".full-calendar").each(function(){
			if ($(this).data('fullCalendar')) return;
			$(this).fullCalendar($.extend({
				eventRender: function(event, element, view) {
					//~ console.log(event, element, view);
					element.on('click',function(e){
						e.preventDefault();
					});


					var eventlocation = event.event_location;
					eventlocation = eventlocation==='' || event.event_location===null ? '' : eventlocation;
					// console.log(eventlocation);
					if ($.inArray(eventlocation, locations)<0) return false;

					element.find('.fc-content').prepend(
						'<span class="fc-multiple-add pull-right pointer hidden-print" title="Register participants"><i class="fa fa-plus-square-o"></i></span>'+
						'<span class="fc-view-event pull-right pointer hidden-print" title="View event details"><i class="fa fa-share"></i></span>'
						//+'<span class="fc-event-location '+ location_trim +' hidden">'+event.event_location+'</span>'
					);
					// console.log(event.event_location);
					element.find('.fc-multiple-add').on('click',function(){
						document.location.href = CRM.url('civicrm/lalgbt/multipleregister', {
							eventids: [event.event_id],
							reset: 1,
						});
					});


					element.find('.fc-view-event').on('click',function(){
						console.log(event.url);
						document.location.href = event.url;
					});
				},
			},$(this).data('events-data')));

			// $('#calendarlocations inpu').on('change', function(){
			// 	$(event.event_location).hide();
			// 	console.log(location_trim);
			// 	//  $('.fc-event-location').closest($('div')).hide();
			// });

		});


	});
}(CRM.$, CRM._));

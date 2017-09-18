<div id="calendarKey">
	{foreach from=$eventTypesColors item="event" key="id"}
		<span class="event-type-key" style="background: {$event.color}">{$event.name}</span>
	{/foreach}
</div>
<h2>Filter by Location:</h2>
<div id="calendarlocations">
	<div class="box_wrap">
		<input checked type="checkbox" value="" name="no-location" id="no-location">
		<label for="{$event_location}">(no location)</label>
	</div>
	{foreach from=$custom_event_locations|json_decode item="event_location"}
		<div class="box_wrap">
			<input checked type="checkbox" value="{$event_location}" name="{$event_location}" id="{$event_location}">
			<label for="{$event_location}">{$event_location}</label>
		</div>
	{/foreach}
	<!-- <span class="event-type-key" style="background: {$event.color}"></span> -->
</div>

<div class="full-calendar" data-events-data="{$civicrm_events|htmlspecialchars}"></div>

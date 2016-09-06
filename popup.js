$('document').ready(function(){
	if (localStorage["selectionsInitial"] === undefined) {
		localStorage["selectionsInitial"] = [0,0]
	}
	var selectionsInitial = JSON.parse("[" + localStorage["selectionsInitial"] + "]");
	initializeSavedSelections(selectionsInitial)
	$("select").on("change", function(){
		saveSelectionData()
	})
	$("#add_button").click( function() {
		$(".selection").append(timezoneSelector + remove_button)
		saveSelectionData()
	})
	$(".remove_button").click(function(){
		$(this).parent("div").remove()
		saveSelectionData()
	})

	$("#create").click(function(){
		calculateTimeDifferences()
	})

	var time = $("input").val();
	var home = $(".user_location select")[0]
	var locations = $(".selection select")

	var output = new TimeOutput(time,home,locations)

});


function TimeOutput(time, homeSelection, selections) {
	this.time = time
	this.homeSelection = homeSelection
	this.selections = selections

	this.homeTimeDifference = Number(this.homeSelection.options[this.homeSelection.selectedIndex].getAttribute('value'))
	this.homeLocation = this.homeSelection.options[this.homeSelection.selectedIndex].text
	GMTTimeArray(this.time, 8.5) 

	function timeAsArray(time) {
		var timeArray = time.split(':').slice(0,2)
		timeArray[0] = Number(timeArray[0])
		timeArray[1] = Number(timeArray[1])
		return timeArray
	}

	function GMTTimeArray(time, timeDifference){
		var timeArray = timeAsArray(time)
		console.log( timeArray )
		// if (Number.isInteger(timeDifference)) {
		// 	return [timeArray[0] + timeDifference, timeArray[1]]
		// } else if ( timeDifference > 0 ) {
		// 	return [ timeArray[0] + Math.floor(timeDifference), timeArray[1] + 30 ]
		// } else {
		// 	return [ timeArray[0] + Math.round(timeDifference), timeArray[1] + 30 ]
		// }
	}

}

function calculateTimeDifferences(){
	var userHomeSelection = $(".user_location select")[0]
	var userTimeDifference = userHomeSelection.options[userHomeSelection.selectedIndex].getAttribute('value')
	var userLocation = userHomeSelection.options[userHomeSelection.selectedIndex].text
	var otherSelections = $(".selection select")
	var output = userLocation + "\n"
	for (i=0; i<otherSelections.length; i++) {
		otherTimeDifference = otherSelections[i].options[otherSelections[i].selectedIndex].getAttribute('value')  
		otherLocation = otherSelections[i].options[otherSelections[i].selectedIndex].text  
		output = output + otherTimeDifference + otherLocation + "\n"
	}
}

function initializeSavedSelections(indexValues) {
	for (i=0; i<indexValues.length; i++) {
		if (i === 0) {
			$(".user_location").append(timezoneSelector)	
		} else {
			remove_button = '<div class="remove_button"></div>'
			$(".selection").append('<div>' + timezoneSelector + remove_button + '</div>')
	}
		$("select")[i].selectedIndex = indexValues[i]
	}
}

function saveSelectionData(){
	var $selections = $('select')

	var selectionsInitial = []
	for (i=0; i<$selections.length; i++){
		selectionsInitial.push($selections[i].selectedIndex)
	}
	localStorage.selectionsInitial = selectionsInitial
}

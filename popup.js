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
	convertTimeToSeconds("12:00:00")

});

function GMTTime(time, timeDifference) {
	console.log( "time " + time )
	console.log( "timeDifference" +timeDifference )
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

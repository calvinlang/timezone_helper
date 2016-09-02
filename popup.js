$('document').ready(function(){
	if (localStorage["selectionsInitial"] === undefined) {
		localStorage["selectionsInitial"] = []
	}
	var selectionsInitial = JSON.parse("[" + localStorage["selectionsInitial"] + "]");
	initializeSavedSelections(selectionsInitial)
});



function initializeSavedSelections(indexValues) {
	console.log( indexValues )
	if (indexValues.length > 0) {
		for (i=0; i<indexValues.length; i++) {
			$(".selection").append(timezoneSelector)
			$(".selection select")[i].selectedIndex = indexValues[i]
		}
	} else {
		$(".selection").append(timezoneSelector);
		$selections = $('select')
	}
	saveSelectionData
}

function saveSelectionData(){
	var $selections = $('select')

	var selectionsInitial = []
	for (i=0; i<$selections.length; i++){
		selectionsInitial.push($selections[i].selectedIndex)
	}
	localStorage.selectionsInitial = selectionsInitial
}



// To get the value in the select box but this only does the top one

// $( "select option:selected" ).attr("timeZoneId")
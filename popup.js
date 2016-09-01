$('document').ready(function(){
	$(".selection").append(localStorage["lastSave"]);
	$(".add_button").click(function() {
		$(".selection").append(timezoneSelector);
		saveSelectionData()
	});
	$('select').select(function(){
		saveSelectionData()
	});
	saveSelectionData()

});

function saveSelectionData(){
	var selections = $('select')
	localStorage.lastSave = ""
	for (i=0; i<selections.length; i++){
		localStorage.lastSave = localStorage.lastSave + selections[i].outerHTML
	}
}


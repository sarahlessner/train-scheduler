$( document ).ready(function() {
displayTrains();

//firebase https://train-scheduler-77540.firebaseio.com/


var counter = localStorage.length/4;
//when #submit-button is clicked
$("#submit-button").on("click", function(){

	//prevent default
	event.preventDefault();

	// #train-name 
	var trainName = $("#train-name").val().trim();

	// #destination 
	var destination = $("#destination").val().trim();

	// #first-train 
	var firstTrain = $("#first-train").val().trim();

	// #frequency
	var frequency = $("#frequency").val().trim();

	$("#train-name").val('');
	$("#destination").val('');
	$("#first-train").val('');
	$("#frequency").val('');

	//store data in local storage, eventually firebase
	// localStorage.clear();

	localStorage.setItem("train-"+counter, trainName);
	localStorage.setItem("destination-"+counter, destination);
	localStorage.setItem("first-"+counter, firstTrain);
	localStorage.setItem("frequency-"+counter, frequency);

	counter++;

	//call the function to display train data
	displayTrains();
});

//function to display train data
function displayTrains() {
	// console.log("displayTrains");
	// console.log(localStorage.length);
	//empty #table-body
	$("#table-body").empty();
	//loop through length of trainName array (accessed from storage?)
	      

	for (var i = 0; i < localStorage.length/4; i++) {
		// console.log(i);
		//jquery table row - store as variable
		var myRow = $("<tr>");
			//query <td> elements for each column of table appended to <tr>
				//append trainName at index also append scope = "row"

		myRow.append($("<td>").html(localStorage.getItem("train-"+i)));
		myRow.append($("<td>").html(localStorage.getItem("destination-"+i)));
		myRow.append($("<td>").html(localStorage.getItem("first-"+i)));
		myRow.append($("<td>").html(localStorage.getItem("frequency-"+i)));

		$("#table-body").append(myRow);
	};
				//append destination at index
				//append frequency at index
				//calculate next arrival & minutes away based on frequency & first train time/current time
					//store result of calculation as variables for next arrival &  minutes away
					//append next arrival <td>
					//append minutes away <td>
		//append <tr> to #table-body
};
	

});



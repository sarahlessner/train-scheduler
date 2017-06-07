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

	//If any of the fields are empty - alert user
	if ((trainName === "") || (destination === "") || 
	   (firstTrain === "") || (frequency === "")) {
		alert("Please complete all fields before submitting!");
	}

	else {

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
	};
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

		myRow.append($("<td>").html(localStorage.getItem("train-"+i)));
		myRow.append($("<td>").html(localStorage.getItem("destination-"+i)));
		//calculate next arrival and minutes away with moment.js based on frequency and first train and current time

		//store calculations as variables for next arrival &  minutes away

		//append frequency
		myRow.append($("<td>").html(localStorage.getItem("frequency-"+i)));
		//append next arrival <td>
		//append minutes away <td>
		//these 2 rows are here for testing my rows display - delete after appending above 2 lines
		myRow.append($("<td>").html(localStorage.getItem("first-"+i))); 
		myRow.append($("<td>").html(localStorage.getItem("first-"+i))); 
		//append <tr> to #table-body
		$("#table-body").append(myRow);
	};
	
};
	
});



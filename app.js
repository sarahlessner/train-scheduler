$( document ).ready(function() {

	// Initialize Firebase
   var config = {
    apiKey: "AIzaSyAhmGGs74CTF3OvdTAfn0VAqnDu87UHNZ4",
    authDomain: "train-scheduler-77540.firebaseapp.com",
    databaseURL: "https://train-scheduler-77540.firebaseio.com",
    projectId: "train-scheduler-77540",
    storageBucket: "train-scheduler-77540.appspot.com",
    messagingSenderId: "635654226813"
  	};

  	firebase.initializeApp(config);

  	var database = firebase.database();
  	//initialize variables for storing user input
  	var trainName = "";
  	var destination = "";
  	var firstTrain = "";
  	var frequency = "";

	//when #submit-button is clicked
	$("#submit-button").on("click", function(){
		
		//prevent default
		event.preventDefault();
		
		// #train-name 
		trainName = $("#train-name").val().trim();

		// #destination 
		destination = $("#destination").val().trim();

		// #first-train 
		firstTrain = $("#first-train").val().trim();

		// #frequency
		frequency = $("#frequency").val().trim();
		// convert frequency to integer for validating input
		frequency = (parseInt(frequency));

		//If any of the fields are empty - alert user
		if ((trainName === "") || (destination === "") || 
		   (firstTrain === "") || (frequency === "")) {
			alert("Please complete all fields before submitting!");
		}
		//check if user entered a number into the "frequency" form field
		else if (Number.isInteger(frequency) === false ){
			alert("Train Frequency must be a number!");
		}
		//check if function to validate military time input is false
		else if (validateMilitary(firstTrain) === false) {
			//do nothing alert will come from function
		}

		else {
		//clear form fields
		$("#train-name").val('');
		$("#destination").val('');
		$("#first-train").val('');
		$("#frequency").val('');

		//push user input to firebase
		database.ref().push({
	        trainName: trainName,
	        destination: destination,
	        firstTrain: firstTrain,
	        frequency: frequency
	      });
		};
	});

	//function to validate user input for first train time - check if its compatible with military time format
	function validateMilitary(timestring) {
		//check if user input string is 5 characters in length and check that 3rd character is ":"
		if ((timestring.length !== 5) || (timestring.charAt(2) !== ":")) {
			alert("Please enter First Train time in HH:mm format!");
			return false;
		}
		//save user input into separate variables for hours and minutes
		var hours = (parseInt(timestring.slice(0, 2)));
		var mins = (parseInt(timestring.slice(3, 5)));
		//check if hours and minutes are integers
		if ((Number.isInteger(hours) === false) || (Number.isInteger(mins) === false)) {
			alert("Please enter hours and minutes as numbers!");
			return false;
		}
		//check if hours and minutes ranges are valid for time formatting
		if ((hours < 0 || hours > 23) || (mins < 0 || mins > 59)) {
			alert("Hours must be 00-23, minutes must be 00-59");

			return false;
		}

		return true;
	};

	//get info from firebase
	database.ref().on("child_added", function(snapshot) {
		//save the key as a variable
		var myKey = snapshot.key;

		//fetch user input from database
		var trainName = snapshot.val().trainName;
		var destination = snapshot.val().destination;
		var frequency = snapshot.val().frequency;
		var firstTrain = snapshot.val().firstTrain;

		//initializing moment objects 
		var mFirstTrain = moment(firstTrain, "HH:mm");
		var currentTime = moment();

		// get diff bt current time and first train
		var timeDiff = currentTime.diff(mFirstTrain, 'minutes');
		var minutesAway = 0;
		var nextTrain = moment();
		// check if time difference is less than or equal to 0 to determine if first train has not come yet
		if (timeDiff <= 0) {
		// set minutesaway to the time that remains before the first train
			minutesAway = -timeDiff;
		// set the next train to the first scheduled train since the first one hasn't arrived yet
			nextTrain = mFirstTrain;

		}

		else {
		//convert users input of frequency to an integer
			var frequencyToInt = parseInt(frequency);
		//find out how long since the most recent train
			var timeSinceLast = (timeDiff % frequencyToInt);
		//subtract that from the trains frequency to determine how many minutes until the next train
			minutesAway = (frequencyToInt - timeSinceLast);
			nextTrain = currentTime.add(minutesAway, 'minutes');

		}

		//create row to store user input and moment calculations
		var myRow = $("<tr>");
		//store firebase key in the row
		myRow.attr("id", myKey);
		//append user input
		myRow.append($("<td>").html(trainName));
		myRow.append($("<td>").html(destination));
		myRow.append("<td class='text-center'>"+frequency+"</td>");
		myRow.append($("<td class='text-center'>").html(nextTrain.format("HH:mm")));
		myRow.append($("<td class='text-center'>").html(minutesAway));
		//delete button 
		var myData = $("<td class='text-center'>");
		var myBtn = $("<button>");
		var mySpan = $("<span>");
		myBtn.addClass("remove-button");
		myBtn.attr("data-key", myKey);
		mySpan.addClass("glyphicon glyphicon-minus-sign");
		mySpan.attr("aria-hidden", "true");
		myBtn.append(mySpan);
		myData.append(myBtn);
		myRow.append(myData);

		//append row to id table-body
		$("#table-body").append(myRow);

	});

	//remove train on click
	$("body").on("click", ".remove-button", function(){
	    //remove data from firebase associated with this buttons key
	     database.ref().child($(this).attr("data-key")).remove();

	});
	//watcher for child removed
	database.ref().on("child_removed", function(snapshot) {
		//save the key as a variable
		var myKey = snapshot.key;
		//remove row with id that matches key of child that was removed
		$("#"+myKey).remove();
	});


//doc ready closing
});



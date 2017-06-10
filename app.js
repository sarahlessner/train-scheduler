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
	// reference for yourself: firebase.database.ServerValue.TIMESTAMP

  	var database = firebase.database();

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

		//reference with key/value pairs for storing user input in firebase

		database.ref().push({
	        trainName: trainName,
	        destination: destination,
	        firstTrain: firstTrain,
	        frequency: frequency
	      });
		};
	});

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


		var myRow = $("<tr>");

		myRow.append($("<td>").html(trainName));
		myRow.append($("<td>").html(destination));
		myRow.append("<td class='text-center'>"+frequency+"</td>");
		myRow.append($("<td class='text-center'>").html(nextTrain.format("HH:mm")));
		myRow.append($("<td class='text-center'>").html(minutesAway));
		//delete and refresh buttons
		//delete
		var myData = $("<td class='text-center'>");
		var myBtn = $("<button>");
		var mySpan = $("<span>");
		myBtn.attr("class", "remove-button");
		myBtn.attr("data-key", myKey);
		mySpan.attr("class", "glyphicon glyphicon-minus-sign");
		mySpan.attr("aria-hidden", "true");
		myBtn.append(mySpan);
		myData.append(myBtn);
		myRow.append(myData);
		//another way to add the button
		// myRow.append("<td>"+"<button id='refresh-button'>"+"<span class='glyphicon glyphicon-remove' aria-hidden='true'>"+"</span>"+"</button>"

		//append all to id table-body
		$("#table-body").append(myRow);

	});

	//remove train
	$("body").on("click", ".remove-button", function(){
	     //removes from display
	     $(this).closest('tr').remove();
	     //figure out how to remove in firebase
	     database.ref().child($(this).attr("data-key")).remove();

	});




//doc ready closing
});



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
  	var frequency = 0;
  	//calculated using moment.js and firstTrain/frequency user input
  	var nextArrival = 0;
  	var minutesAway = 0;



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





database.ref().on("child_added", function(snapshot) {

var trainName = snapshot.val().trainName;
var destination = snapshot.val().destination;
var frequency = snapshot.val().frequency;
var firstTrain = snapshot.val().firstTrain;

// var checkTime = //using moment pass in first train time
// var currentTime = moment();

// // get diff bt check and current time

// var timeDiff = // another moment calculation (difference)


var myRow = $("<tr>");


myRow.append("<td>"+trainName+"</td>");
myRow.append("<td>"+destination+"</td>");
myRow.append("<td>"+frequency+"</td>");
//replace with variable storing calculation for next arrival
myRow.append("<td>"+frequency+"</td>");
//replace with variable storing calculation for minutes away
myRow.append("<td>"+frequency+"</td>");
//delete button
myRow.append("<td>"+"<button>"+"<span class='glyphicon glyphicon-refresh' aria-hidden='true'>"+"</span>"+"</button>"+"<button>"+"<span class='glyphicon glyphicon-remove' aria-hidden='true'>"+"</span>"+"</button>"+"</td>");
//append to id table-body
$("#table-body").append(myRow);

});

//remove train
// $("body").on("click", ".delete-train", function(){
//      $(this).closest ('tr').remove();
//      childKey = $(this).parent().parent().attr('id');
//      database.child(childKey).remove();
// });




//doc ready closing
});



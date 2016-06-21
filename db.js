var database;
var results;

function loadDB() {
	var config = {
		apiKey: "AIzaSyAR5mkKau0nYAF7BCrYdB1_EnqmFPlyPf4",
		authDomain: "hirschbergsort.firebaseapp.com",
		databaseURL: "https://hirschbergsort.firebaseio.com",
		storageBucket: "",
	};
	firebase.initializeApp(config);
	
	database = firebase.database();
}

function submit(pos, man, num, res) {
	return database.ref("Results/").push({
		UnixTime: Date.now(),
		Date: Date(),
		Position: pos,
		Manager: man,
		ReqNumber: num,
		Results: res
	});
}

function getData() {
	var newline = "\r\n"
	var data = "Competency Ranking Report" + newline + newline +
	           "Date,Position,Manager,Number,Results" + newline;
	
	database.ref("Results/").once("value").then(function(snapshot) {
		snapshot.forEach(function(child) {
			data += child.val().Date + ",";
			data += child.val().Position + ",";
			data += child.val().Manager + ",";
			data += child.val().ReqNumber + ",";
			child.val().Results.forEach(function(res) {
				data += res + ",";
			});
			data += newline;
		})
	});
	
	return data;
}

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


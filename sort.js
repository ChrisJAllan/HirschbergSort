var items;
var lead_count = 3;
var leaderboard, dropped;
var count;
var Button1 = document.getElementById("Button1");
var Button2 = document.getElementById("Button2");

function var_init() {
	items = Array(0);
	leaderboard = Array(lead_count);
	try {
		leaderboard.fill("--");
	} catch (err) {
		for (i = 0; i < lead_count; i++) { leaderboard[i] = "--"; }
	}
	dropped = Array(0);
	update_leaderboard();
	document.getElementById("lead_count").value = lead_count;
}

function lead_insert(item, index) {
	Button1.innerText = "--";
	Button2.innerText = "--";
	
	Button1.disabled = true;
	Button2.disabled = true;
	
	if (leaderboard[lead_count - 1] != "--") {
			dropped.push(item);
	}
	if (index < lead_count) {
		for (i = lead_count - 1; i > index; i--) {
			leaderboard[i] = leaderboard[i - 1];
		}
		leaderboard[index] = item;
	}
	
	update_leaderboard();
	
	items.shift();
	if (items.length > 0) {
		full_comp(items[0]);
	}
}

function full_comp(item) {
	var i = 0;
	for (; i < lead_count && leaderboard[i] != "--"; i++) {}
	sub_comp(item, 0, i);
}

function sub_comp(item, start, end) {
	if (start == end) {
		lead_insert(item, start);
	} else {
		var middle = Math.floor((start + end) / 2);
		single_comp(item, leaderboard[middle], start, middle, end);
	}
}

function single_comp(item1, item2, start, mid, end) {
	Button1.innerText = item1;
	Button2.innerText = item2;
	
	Button1.onclick = function() { sub_comp(item1, start, mid); };
	Button2.onclick = function() { sub_comp(item1, mid + 1, end); };
	
	Button1.disabled = false;
	Button2.disabled = false;
}

function add_items() {
	// TODO: advanced checking
	var_init();
	
	var text = document.getElementById("input").value;
	var new_items = text.split("\n");
	
	for (i = 0; i < new_items.length; i++) {
		if (new_items[i] != "") { // TODO: check for duplicates
			items.push(new_items[i]);
		}
	}
	
	if (items.length > 0) {
		full_comp(items[0]);
	}
}

function update_leaderboard() {
	var leadHTML = "";
	for (var i = 0; i < lead_count; i++) {
		leadHTML += "<li>"+leaderboard[i]+"</li>";
	}
	document.getElementById("leaderboard").innerHTML = leadHTML;
}

function lead_change() {
	var value = document.getElementById("lead_count").value;
	if (Number(value) > 0) {
		lead_count = Number(value);
		add_items(); // TODO
	} else {
		document.getElementById("lead_count").value = lead_count;
	}
}

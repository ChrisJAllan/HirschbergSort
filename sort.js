var items;
var lead_count = 3;
var leaderboard, dropped;
var count;
var Button1 = document.getElementById("Button1");
var Button2 = document.getElementById("Button2");
var min, mid, max;

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

function start_comp() {
	if (items.length == 0) {
		return;
	}
	
	for (min = 0, max = 0; max < lead_count && leaderboard[max] != "--"; max++) {}
	next_comp();
}

function next_comp() {
	if (min == max) {
		lead_insert(items[0], min);
		return;
	}
	
	mid = Math.floor((max + min) / 2);
	enable_buttons();
}

function greater() {
	max = mid;
	next_comp();
}

function lessthan() {
	min = mid + 1;
	next_comp();
}

function lead_insert(item, index) {
	disable_buttons();
	
	if (index < lead_count) {
		if (leaderboard[lead_count - 1] != "--") {
			dropped.push(leaderboard[lead_count - 1]);
		}
		for (i = lead_count - 1; i > index; i--) {
			leaderboard[i] = leaderboard[i - 1];
		}
		leaderboard[index] = item;
	} else {
		dropped.push(item);
	}
	
	update_leaderboard();
	
	items.shift();
	start_comp();
}

function reset() {
	var_init();
	
	var text = document.getElementById("input").value;
	var new_items = text.split("\n");
	
	for (i = 0; i < new_items.length; i++) {
		if (new_items[i] != "") {
			items.push(new_items[i]);
		}
	}
	
	start_comp();
}

function enable_buttons() {
	Button1.innerText = items[0];
	Button2.innerText = leaderboard[mid];
	
	Button1.disabled = false;
	Button2.disabled = false;
}

function disable_buttons() {
	Button1.innerText = "--";
	Button2.innerText = "--";
	
	Button1.disabled = true;
	Button2.disabled = true;
}

function add_items() {
	disable_buttons();
	var text = document.getElementById("input").value;
	var new_items = text.split("\n");
	
	//check for removed items
	//  if removed from leaderboard: reset if dropped items
	//  if removed from dropped: remove from dropped
	//remove items in leaderboard or dropped
	//add remaing items
	
	for (c = 0; c < lead_count && leaderboard[c] != "--"; c++) {}
	for (i = 0; i < c; i++) {
		if (new_items.indexOf(leaderboard[i]) == -1) {
			reset();
			return;
		} else {
			new_items.splice(new_items.indexOf(leaderboard[i]), 1);
		}
	}
	for (i = 0; i < dropped.length; i++) {
		if ((ni = new_items.indexOf(dropped[i])) == -1) {
			dropped.splice(i--, 1);
		} else {
			new_items.splice(ni, 1);
		}
	}
	
	items = Array(0);
	for (i = 0; i < new_items.length; i++) {
		if (new_items[i] != "") {
			items.push(new_items[i]);
		}
	}
	
	start_comp();
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
		var old = lead_count;
		lead_count = Number(value);
		
		if (lead_count < old) {
			for (c = 0; c < lead_count && leaderboard[c] != "--"; c++) {}
			for (i = c; i < old; i++) {
				dropped.push(leaderboard[i]);
				leaderboard.splice(i, 1);
				update_leaderboard();
				start_comp();
			}
		} else if (lead_count > old) {
			if (dropped.length > 0) {
				reset();
			} else {
				for (i = old; i < lead_count; i++) {
					leaderboard.push("--");
				}
				update_leaderboard();
				start_comp();
			}
		}
	} else {
		document.getElementById("lead_count").value = lead_count;
	}
}

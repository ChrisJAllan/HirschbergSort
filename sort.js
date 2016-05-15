var item;
var lead_count = 3;
var leaderboard, dropped;
var count;
var Button1 = document.getElementById("Button1");
var Button2 = document.getElementById("Button2");
var min, mid, max;
var items = ["Establishes stretch goals", "Drives for results", "Takes initiative", "Develops strategic perspective", "Champions change", "Connects the group to the outside world", "Communicates powerfully and prolifically", "Inspires and motivates others to high performance", "Builds relationships", "Develops others", "Works in a collaborative manner with others", "Has technical and professional expertise", "Solves problems and analyzes issues", "Initiates innovation"];
var descriptions = ["Sets challenging but definitive goals for self and workgroup", "Operates with speed and intensity, translates long-term goals into immediate actions", "Initiates new programs, processes, relationships or technologies to accomplish goals", "Knows how immediate work relates to organizational strategy, translates into actionable steps", "Leads projects or programs that support organizational goals so that others support them", "Connects the workgroup to those outside the group and organization, markets his/her workgroup effectively and influences others in the organization", "Shares insights on issues/problems, clarifies purpose and links that purpose to actions", "Moves others to high level of performance, unlocks exceptional results in self and others", "Is trusted by others, is aware and supportive of needs of individuals and balances results with individual needs", "Provides on-going feedback in a helpful manner to develop skills and talents of others", "Works in a collaborative manner with others, helps resolve unproductive conflict", "Has the technical skills, product knowledge and professional skills to do the job", "Has and applies problem analysis and problem solving skills on technical and interpersonal level", "Actively considers new ideas and works to improve processes"];
var preview;

function reset() {
	
	leaderboard = Array(lead_count);
	for (i = 0; i < lead_count; i++) { leaderboard[i] = "--"; }
	
	dropped = false;
	
	show_buttons();
	update_leaderboard();
	
	document.getElementById("lead_count").value = lead_count;
	document.getElementById("print").disabled = true;
	
	item = 0;
	start_comp();
}

function start_comp() {
	if (item == items.length) {
		show_results();
		document.getElementById("print").disabled = false;
		return;
	}
	
	for (min = 0, max = 0; max < lead_count && leaderboard[max] != "--"; max++) {}
	next_comp();
}

function next_comp() {
	if (min == max) {
		lead_insert(min);
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

function lead_insert(index) {
	disable_buttons();
	
	if (index < lead_count) {
		if (leaderboard[lead_count - 1] != "--") {
			dropped = true;
		}
		for (i = lead_count - 1; i > index; i--) {
			leaderboard[i] = leaderboard[i - 1];
		}
		leaderboard[index] = items[item];
	} else {
		dropped = true;
	}
	
	update_leaderboard();
	
	item++;
	start_comp();
}

function enable_buttons() {
	Button1.innerText = items[item];
	Button2.innerText = leaderboard[mid];
	
	document.getElementById("Def1").innerText = descriptions[item];
	document.getElementById("Def2").innerText = descriptions[mid];
	
	Button1.disabled = false;
	Button2.disabled = false;
}

function disable_buttons() {
	Button1.innerText = "--";
	Button2.innerText = "--";
	
	Button1.disabled = true;
	Button2.disabled = true;
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
	var old = lead_count;
	lead_count = Number(value);
	
	if (lead_count < old) {
		for (c = 0; c < lead_count && leaderboard[c] != "--"; c++) {}
		for (i = c; i < old; i++) {
			dropped = true;
			leaderboard.splice(i, 1);
			update_leaderboard();
			start_comp();
		}
	} else if (lead_count > old) {
		if (dropped) {
			reset();
		} else {
			for (i = old; i < lead_count; i++) {
				leaderboard.push("--");
			}
			update_leaderboard();
			start_comp();
		}
	}
}

function show_buttons() {
	document.getElementById("buttonarea").style.display = "block";
	document.getElementById("resultarea").style.display = "none";
}

function show_results() {
	document.getElementById("buttonarea").style.display = "none";
	document.getElementById("resultarea").style.display = "block";
}

function print_preview() {
	preview = window.open("print.html");
}

function print_ready() {
	var position = document.getElementById("position").value;
	
	preview.document.getElementById("title").innerText = "Competency Importance Results for the " + position + " Position";
	
	var leadHTML = "";
	for (var i = 0; i < lead_count; i++) {
		leadHTML += "<li>"+leaderboard[i]+"</li>";
	}
	preview.document.getElementById("results").innerHTML = leadHTML;
	
	preview.print();
}


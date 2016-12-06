var item;
var lead_count = 5;
var leaderboard, dropped;
var count;
var min, mid, max;
var items = ["Establishes stretch goals", "Drives for results", "Takes initiative", "Develops strategic perspective", "Champions change", "Connects the group to the outside world", "Communicates powerfully and prolifically", "Inspires and motivates others to high performance", "Builds relationships", "Develops others", "Works in a collaborative manner with others", "Has technical and professional expertise", "Solves problems and analyzes issues", "Initiates innovation"];
var descriptions = ["Sets challenging but definitive goals for self and workgroup", "Operates with speed and intensity, translates long-term goals into immediate actions", "Initiates new programs, processes, relationships or technologies to accomplish goals", "Knows how immediate work relates to organizational strategy, translates into actionable steps", "Leads projects or programs that support organizational goals so that others support them", "Connects the workgroup to those outside the group and organization, markets his/her workgroup effectively and influences others in the organization", "Shares insights on issues/problems, clarifies purpose and links that purpose to actions", "Moves others to high level of performance, unlocks exceptional results in self and others", "Is trusted by others, is aware and supportive of needs of individuals and balances results with individual needs", "Provides on-going feedback in a helpful manner to develop skills and talents of others", "Works in a collaborative manner with others, helps resolve unproductive conflict", "Has the technical skills, product knowledge and professional skills to do the job", "Has and applies problem analysis and problem solving skills on technical and interpersonal level", "Actively considers new ideas and works to improve processes"];
var preview;

function load() {
	for (i = 1; i <= items.length; i++) {
		$("#lead_count").append("<option value=\""+i+"\">"+i+"</option>");
	}
	
	reset();
}

function reset() {
	
	leaderboard = Array(lead_count);
	for (i = 0; i < lead_count; i++) { leaderboard[i] = "--"; }
	
	dropped = false;
	
	show_buttons();
	update_leaderboard();
	
	$("#lead_count").val(lead_count);
	$("#print").attr("disabled", true);
	$("#email").attr("disabled", true);
	
	item = 0;
	start_comp();
}

$("#tog").click(function() {
	if ($("#tog").text() == "hide") {
		$("#help").slideUp("fast");
		$("#tog").text("show");
	} else {
		$("#help").slideDown("fast");
		$("#tog").text("hide");
	}
});

function start_comp() {
	if (item == items.length) {
		show_results();
		$("#print").attr("disabled", false);
		$("#email").attr("disabled", false);
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
	$("#Button1").text(items[item]);
	$("#Button2").text(leaderboard[mid]);
	
	$("#Def1").text(descriptions[item]);
	$("#Def2").text(descriptions[items.indexOf(leaderboard[mid])]);
	
	$("#Button1").attr("disabled", false);
	$("#Button2").attr("disabled", false);
}

function disable_buttons() {
	$("#Button1").text("--");
	$("#Button2").text("--");
	
	$("#Button1").attr("disabled", true);
	$("#Button2").attr("disabled", true);
}

function update_leaderboard() {
	var leadHTML = "";
	for (var i = 0; i < lead_count; i++) {
		leadHTML += "<li>"+leaderboard[i]+"</li><input type=\"hidden\" name=\"res"+i+"\" value=\""+leaderboard[i]+"\" />";
	}
	$("#leaderboard").html(leadHTML);
}

function lead_change() {
	var value = $("#lead_count").val();
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
	$("#buttonarea").css("display", "block");
	$("#resultarea").css("display", "none");
}

function show_results() {
	$("#buttonarea").css("display", "none");
	$("#resultarea").css("display", "block");
}


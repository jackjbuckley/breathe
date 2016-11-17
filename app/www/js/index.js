var iosUUID;
var connectionBegan = false;
	var onData = function(buffer) {
	// Decode the ArrayBuffer into a typed Array based on the data you expect
	var data = new Uint8Array(buffer);
	console.log(data);
	display(data);
        if(document.getElementById("profile").style.animation == "") {
        document.getElementsByTagName('style')[1].innerHTML = "#profile{background:#FF6347;} #profile:before{background:#FF6347;} #profile:after{background:#FF6347;} #heartIcon{fill:red;}";
            document.getElementById('profile').style.animation = "pulse 1s ease infinite"; }
	if(connectionBegan == false) {
        document.getElementById("connectSound").play();
		connectionBegan = true;
	}
	}
	
	function scan() {
		document.getElementById("logo").style.marginLeft = "10vw";
        ble.scan(["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], 5, function(device) {
		console.log(JSON.stringify(device)); iosUUID = device.id; setTimeout(function(){ connect(); }, 1000);
		}, function() { alert("ERROR SCANNING BLUETOOTH") });
        
	}
	
	function connect() {
		ble.connect(iosUUID, function() { setTimeout(function(){ notify(); }, 1000);}, function() { connectAndroid(); });

	}
	
	function connectAndroid() {
		ble.connect("C6:75:13:F9:9D:3D", function() { setTimeout(function(){ notify(); }, 1000);}, function() { alert("ERROR CONNECTING TO DEVICE") });

	}
	
	function notify() {
		ble.startNotification(iosUUID, "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400003-b5a3-f393-e0a9-e50e24dcca9e", onData, function() { notifyAndroid(); });
	}
	
	function notifyAndroid() {
		ble.startNotification("C6:75:13:F9:9D:3D", "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "6e400003-b5a3-f393-e0a9-e50e24dcca9e", onData, function() { alert("ERROR RECEIVING NOTIFICATIONS") });
	}
	function display(data) {
		var string = "";
		for(var i = 0; i < data.length; i++) {
			var s = String.fromCharCode(data[i]);
			string = string + s;
		}
		document.getElementById('incoming').innerHTML = string;
        
        var d = new Date();
        
        var reading = parseInt(string);
        d = d.toString();
        
        console.log(reading)
        
        dataLog.push(reading);
        
        timeLog.push(d);
        
        var timeArrayToString = JSON.stringify(timeLog);
        
        localStorage.setItem("timeLog", timeArrayToString);
        
        var dataArrayToString = JSON.stringify(dataLog);
        
        localStorage.setItem("dataLog", dataArrayToString);
    }
	function iosTop() {
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByHexString("#0074D9");
		StatusBar.styleLightContent();

	}

    var timeLog;
    var dataLog;

    if(localStorage.getItem("timeLog") == null) {
        dataLog = [];
        timeLog = [];
        
    }
    else {
        timeLog = localStorage.getItem("timeLog");
        
        timeLog = JSON.parse(timeLog);
        
        dataLog = localStorage.getItem("dataLog");
        
        dataLog = JSON.parse(dataLog);
    }

function showSettings() {
    document.getElementById('settings').style.visibility = "visible";
    document.getElementById('history').style.visibility = "hidden";
    document.getElementById('header').style.visibility = "hidden";
    document.getElementById('circle').style.visibility = "hidden";
    
    document.getElementById("gearIcon").style.fill = "red";
    document.getElementById("heartIcon").style.fill = "white";
    document.getElementById("clockIcon").style.fill = "white";
}

function closeSettings() {
    var backgroundChoice = document.getElementById('backgroundChoice').value;
    
    localStorage.setItem("backgroundChoice", backgroundChoice);
    
    document.body.style.background = "url('" + backgroundChoice + "')";
    document.body.style.backgroundSize = "cover";
    
    document.getElementById('settings').style.visibility = "hidden";
    document.getElementById('header').style.visibility = "visible";
    document.getElementById('circle').style.visibility = "visible";
    
    document.getElementById("gearIcon").style.fill = "white";
    document.getElementById("heartIcon").style.fill = "red";
    document.getElementById("clockIcon").style.fill = "white";
}

function showHistory() {
    document.getElementById('history').style.visibility = "visible";
    document.getElementById('settings').style.visibility = "hidden";
    document.getElementById('header').style.visibility = "hidden";
    document.getElementById('circle').style.visibility = "hidden";
    
    document.getElementById("gearIcon").style.fill = "white";
    document.getElementById("heartIcon").style.fill = "white";
    document.getElementById("clockIcon").style.fill = "red";
}

function showMainPage() {
    document.getElementById('history').style.visibility = "hidden";
    document.getElementById('settings').style.visibility = "hidden";
    document.getElementById('header').style.visibility = "visible";
    document.getElementById('circle').style.visibility = "visible";
    
    document.getElementById("gearIcon").style.fill = "white";
    document.getElementById("heartIcon").style.fill = "red";
    document.getElementById("clockIcon").style.fill = "white";
}
function invertColours() {
    toInvertColours = !toInvertColours;
    
    localStorage.setItem("invertColours", toInvertColours);
    
    if(toInvertColours == true) {
        document.getElementById("html").style.filter = "invert(1)";
    }
    else {
        document.getElementById("html").style.filter = "none";
    }
}

if(localStorage.getItem("backgroundChoice") != null) {
    var backgroundChoice = localStorage.getItem("backgroundChoice");
    document.body.style.background = "url('" + backgroundChoice + "')";
    document.body.style.backgroundSize = "cover";
    
    document.getElementById(backgroundChoice).selected = true;
    
}

if(localStorage.getItem("invertColours") != null) {
    if(localStorage.getItem("invertColours") == "true") {
        toInvertColours = true;
    }
    else {
        toInvertColours = false;
    }
    
    if(toInvertColours == true) {
        document.getElementById("html").style.filter = "invert(1)";
        document.getElementById("invertToggle").checked = true;
    }
    else {
        ddocument.getElementById("html").style.filter = "none";
    }
}
else {
    toInvertColours = false;
}


function check() {
    i++;
    
    if(i == 30) {
        snd.play();
        
        document.getElementById("circle").style.background = "url('easter/cage.gif')";
    }
}

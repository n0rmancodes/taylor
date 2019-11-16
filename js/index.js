var d = document.getElementById("input_text")
d.focus();

d.addEventListener("keydown", function (e) {
	if (e.keyCode == 13) {
		download();
	} 
});

function download() {
	document.getElementById("video").pause();
	document.getElementById("video").innerHTML = ""
	document.title = "[DOWNLOADING...] taylor - youtube video downloader";
	document.getElementById("downloadInfo").style.display = "none";
	document.getElementById("error").style.display = "none";
	document.getElementById("input_text").style.display = "none";
	document.getElementById("download").style.display = "none";
	document.getElementById("deets").innerHTML = "checking link..."
	document.getElementById("loading").style.display = "block"
	document.getElementById("input_text").disabled = true;
	var ytLink = document.getElementById("input_text").value
	if(!ytLink.includes("https://youtu")) {
		if(!ytLink.includes("https://www.youtu")){
			nomatch();
			return;
		}
	}
	if (ytLink.includes("https://youtu.be/")) {
		var yID = document.getElementById("input_text").value.substring(17,28);
		var ytLink = "https://youtube.com/watch?v=" + yID;
	} 
	if (!yID) {
		var yID = document.getElementById("input_text").value.substring(32,43);
	}
	const http = new XMLHttpRequest();
	document.getElementById("deets").innerHTML = "generating API request..."
	const dUrl = "https://taylorbackend.herokuapp.com/?url=" + ytLink;
	document.getElementById("deets").innerHTML = "setting up connection..."
	http.open("GET", dUrl);
	document.getElementById("deets").innerHTML = "sending API request..."
	http.send();
	document.getElementById("deets").innerHTML = "recieving API data..."
	http.onreadystatechange=(e)=>{
		document.getElementById("deets").innerHTML = "parsing API data..."
		var JSONData = JSON.parse(http.responseText);
		var downloadLink = JSONData.datainfo[0].url;
		var quality = JSONData.datainfo[0].resolution;
		var mType = JSONData.datainfo[0].container;
		var type = JSONData.datainfo[0].type;
		if (!downloadLink) {dl2(); return;}
		document.getElementById('deets').innerHTML = 'writing details to HTML file...'
		document.getElementById("vidDL").href = downloadLink;
		document.getElementById("vidQuality").innerHTML = quality;
		document.getElementById("fileType").innerHTML = mType;
		document.getElementById("video").innerHTML = "<source src='"+ downloadLink + "' type='" + type + "'>";
		document.getElementById("video").poster = "http://i3.ytimg.com/vi/" + yID + "/maxresdefault.jpg"
		document.getElementById("downloadInfo").style.display = "block";
		document.getElementById("loading").style.display = "none";
		document.getElementById("warn").style.display = "none";
		document.getElementById("error").style.display = "none";
		document.getElementById("deets").innerHTML = "process complete!"
		document.title = "[DOWNLOAD COMPLETE] taylor - youtube video downloader";

 	}
}

function dl2() {
	const http = new XMLHttpRequest();
	const dUrl2 = "https://vbdfgnaodgnboir.herokuapp.com/?url=" + ytLink;
	http.open("GET", dUrl2);
	document.getElementById("deets").innerHTML = "no link avaliable, trying another API (1/2)"
	http.send();
	document.getElementById("deets").innerHTML = "no link avaliable, trying another API (2/2)"
	http.onreadystatechange=(e)=>{
		document.getElementById("deets").innerHTML = "parsing API data..."
		var JSONData = JSON.parse(http.responseText);
		var downloadLink = JSONData[0].url;
		var quality = JSONData[0].qualityLabel;
		var mType = JSONData[0].mimeType;
		var type = JSONData[0].type;
		if (!downloadLink) {invalid(); return;}
		document.getElementById('deets').innerHTML = 'writing details to HTML file...'
		document.getElementById("vidDL").href = downloadLink;
		document.getElementById("input_text").style.display = "none";
		document.getElementById("download").style.display = "none";
		document.getElementById("vidQuality").innerHTML = quality;
		document.getElementById("fileType").innerHTML = mType;
		document.getElementById("video").innerHTML = "<source src='"+ downloadLink + "' type='" + type + "'>"
		var ytLink = document.getElementById("input_text").value
		if(!ytLink.includes("https://youtu")) {
			if(!ytLink.includes("https://www.youtu")){
				nomatch();
				return;
			}
		}
		if (ytLink.includes("https://youtu.be/")) {
			var yID = document.getElementById("input_text").value.substring(17,28);
			var ytLink = "https://youtube.com/watch?v=" + yID;
		} 
		if (!yID) {
			var yID = document.getElementById("input_text").value.substring(32,43);
		}
		document.getElementById("video").poster = "http://i3.ytimg.com/vi/" + yID + "/maxresdefault.jpg"
		document.getElementById("downloadInfo").style.display = "block";
		document.getElementById("loading").style.display = "none";
		document.getElementById("warn").style.display = "none";
		document.getElementById("error").style.display = "none";
		document.getElementById("deets").innerHTML = "process complete!"
		document.title = "[DOWNLOAD COMPLETE] taylor - youtube video downloader";
 	}
}

function nomatch() {
	document.getElementById("input_text").value = "";
	document.getElementById("input_text").placeholder = "try a new link";
	document.getElementById("input_text").focus();
	document.getElementById("err_txt").innerHTML = "the link must be a secure youtube link";
	document.getElementById("error").style.display = "block";
	document.getElementById("deets").innerHTML = "";
	document.getElementById("input_text").style.display = "";
	document.getElementById("download").style.display = "";
	document.getElementById("loading").style.display = 'none';
	document.title = "[ERROR] taylor - youtube video downloader";
	document.getElementById("input_text").disabled = false;
}

function invalid() {
	document.getElementById("input_text").value = "";
	document.getElementById("input_text").placeholder = "try a new link";
	document.getElementById("input_text").focus();
	document.getElementById("input_text").style.display = "";
	document.getElementById("download").style.display = "";
	document.getElementById("err_txt").innerHTML = "this link for one reason or another (likely copyright issues) could not be downloaded. another possibility is that the API could be down or being blocked by youtube."
	document.getElementById("loading").style.display = 'none';
	document.getElementById("error").style.display = "block";
	document.getElementById("deets").innerHTML = "";
	document.title = "[ERROR] taylor - youtube video downloader";
	document.getElementById("input_text").disabled = false;
}

function redir() {
	document.getElementById("redirecting").style.display = 'block';
	document.getElementById("downloadInfo").style.display = 'none';
	document.getElementById("error").style.display = "none";
	document.getElementById("input_text").style.display = "none";
	document.getElementById("download").style.display = "none";
}
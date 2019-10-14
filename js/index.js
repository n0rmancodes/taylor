if (!localStorage.getItem("cookie")) {cook()}
applySettings();
if (localStorage.getItem('lang') === 'es') {toES()}


function toES() {
	document.getElementById("input_text").placeholder = "ingresar información"
	document.getElementById("download").innerHTML = "descargar"
	document.getElementById("search").innerHTML = "buscar"
	document.getElementById("welcome").innerHTML = "taylor es un descargador de youtube de alta calidad, simple y sin publicidad."
}

function download() {
	document.getElementById("downloadPreview").pause();
	document.title = "[DOWNLOADING...] taylor - youtube video downloader"
	document.getElementById("downloadInfo").style.display = "none";
	document.getElementById("error").style.display = "none";
	document.getElementById("deets").innerHTML = "checking link..."
	if (localStorage.getItem('lang') === 'es') {document.getElementById("deets").innerHTML = "comprobando enlace..."}
	document.getElementById("loading").style.display = "block"
	document.getElementById("input_text").disabled = true;
	if(!document.getElementById("input_text").value.includes("https://youtu")) {
		if(!document.getElementById("input_text").value.includes("https://www.youtu")){
			nomatch()
			return;
		}
	}
	document.getElementById("deets").innerHTML = "encontrando ID de video..."; 
	if (localStorage.getItem('lang') === 'es') {document.getElementById("deets").innerHTML = ""}
	if (document.getElementById("input_text").value.includes("https://youtube.com/watch?v=")) {
		var yID = document.getElementById("input_text").value.substring(28, 39);
	}
	if (document.getElementById("input_text").value.includes("https://www.youtube.com/watch?v=")) {
		var yID = document.getElementById("input_text").value.substring(32, 43);
	}
	if (!yID) {
		noMeta();
		return;
	}
	document.getElementById("deets").innerHTML = "receiving video metadata..."; 
	if (localStorage.getItem('lang') === 'es') {document.getElementById("deets").innerHTML = "recibiendo metadatos de video..."}
	const http = new XMLHttpRequest();
	const mURL = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAT-yaK5XzJw8Q9njDrJgxwPdXSA4binAc&part=snippet&id=" + yID;
	http.open("GET", mURL);
	http.send();
	http.onreadystatechange=(e)=>{
		var JSONData = JSON.parse(http.responseText);
		var vidTitle = JSONData.items[0].snippet.title;
		var vidAuthor = JSONData.items[0].snippet.channelTitle;
		var vidThumb = JSONData.items[0].snippet.thumbnails.standard.url;
		if (JSONData.items[0].snippet.thumbnails.standard.url) {var vidThumb = JSONData.items[0].snippet.thumbnails.high.url}
		document.getElementById("deets").innerHTML = "writing to HTML file...";
		document.getElementById("vidTitle").innerHTML = vidTitle;
		document.getElementById("vidAuthor").innerHTML = vidAuthor;
		document.getElementById("downloadPreview").poster = vidThumb;
	}
	const dUrl = "https://you-link-revived.herokuapp.com/?url=" + document.getElementById("input_text").value;
	document.getElementById("deets").innerHTML = "getting download link..."
	if (localStorage.getItem('lang') === 'es') {document.getElementById("deets").innerHTML = "obtener enlace de descarga..."}
	http.open("GET", dUrl);
	http.send();
	http.onreadystatechange=(e)=>{
		var JSONData = JSON.parse(http.responseText);
		var downloadLink = JSONData[0].url;
		var quality = JSONData[0].qualityLabel;
		var mType = JSONData[0].mimeType;
		if (!downloadLink) {invalid(); return;}
		document.getElementById('deets').innerHTML = 'writing details to HTML file...'
		if (localStorage.getItem('lang') === 'es') {document.getElementById("deets").innerHTML = "escribir detalles en un archivo HTML"}
		document.getElementById("vidType").innerHTML = mType;
		document.getElementById("vidDL").href = downloadLink;
		document.getElementById("vidQuality").innerHTML =  quality;
		if (mType === "mp4") {document.getElementById("videoSrc_mp4").src = downloadLink} else {document.getElementById("videoSrc_webm").src = downloadLink}
		document.getElementById("downloadInfo").style.display = "block";
		document.getElementById("loading").style.display = "none";
		document.getElementById("warn").style.display = "none";
		document.getElementById("error").style.display = "none";
		document.getElementById("deets").innerHTML = "process complete!"
		document.getElementById("downloadPreview").play();
		document.getElementById("downloadPreview").currentTime-=10
		document.title = "[DOWNLOAD COMPLETE] taylor - youtube video downloader"
		document.getElementById("input_text").disabled = false;
 	}
}

function nomatch() {
	document.getElementById("err_txt").innerHTML = "the link must be a secure youtube link";
	document.getElementById("error").style.display = "block";
	document.getElementById("deets").innerHTML = "";
	document.getElementById("loading").style.display = 'none';
	document.getElementById("input_text").disabled = false;
	document.title = "[ERROR] taylor - youtube video downloader"
}

function apiDown() {
	document.getElementById("err_txt").innerHTML = "the api seems to be down right now. please report this to @SomeCallMeNorm on twitter."
	document.getElementById("error").style.display = "block";
	document.getElementById("deets").innerHTML = "";
	document.getElementById("loading").style.display = 'none';
	document.getElementById("input_text").disabled = false;
	document.title = "[ERROR] taylor - youtube video downloader"
}

function apiDown2() {
	document.getElementById("err_txt").innerHTML = "the API doesn't seem to be working at the moment. please report this to @SomeCallMeNorm on twitter and in the meantime, use <a href='https://youtubemp4.site/?url=" + document.getElementById("input_text").value + "'>this alternative</a>."
	document.getElementById("error").style.display = "block";
	document.getElementById("deets").innerHTML = "";
	document.getElementById("loading").style.display = 'none';
	document.getElementById("input_text").disabled = false;
	document.title = "[ERROR] taylor - youtube video downloader"
}

function invalid() {
	document.getElementById("err_txt").innerHTML = "this link for one reason or another (likely copyright issues) could not be downloaded. another possibility is that the API could be down."
	document.getElementById("loading").style.display = 'none';
	document.getElementById("error").style.display = "block";
	document.getElementById("deets").innerHTML = "";
	document.getElementById("input_text").disabled = false;
	document.title = "[ERROR] taylor - youtube video downloader"
}

function search() {
	if (!document.getElementById("input_text").value) {document.getElementById("err_txt").innerHTML = "Please enter a search query."; document.getElementById("error").style.display = "block"; }
	document.getElementById("deets").innerHTML = "your browser is opening the page...";
	document.getElementById("loading").style.display = "block";
	document.getElementById("error").style.display = "none";
	window.open("https://youtube.com/results?search_query=" + document.getElementById("input_text").value, "_self")
}

function legal() {
	alert("Taylor is not responsible for any legal repercussions facing for using Taylor. The download API we use blocks out copyrighted content. Some may still seep through, however.")
}

function cook() {
	alert("By continuing to use this site, you consent to Taylor storing cookies in your computer. These are just to save your settings and we store no personal information.");
	localStorage.setItem("cookie", "consented!")
}

function save() {
	document.getElementById("deets").innerHTML = "saving your settings..."
	document.getElementById("loading").style.display = 'block'
	localStorage.setItem("lang", document.getElementById("lang").value)
	localStorage.setItem("theme", document.getElementById("theme").value)
	document.getElementById("deets").innerHTML = ""
	document.getElementById("loading").style.display = 'none'
	document.getElementById("settings").style.display = 'none'
	location.reload();
}

function applySettings() {
	document.getElementById("deets").innerHTML = "applying settings..."
	document.getElementById("loading").style.display = "block";
	if (localStorage.getItem("lang") === "en") {document.getElementById("lang").value = "en"}
	if (localStorage.getItem("theme") === "T1") {document.getElementById("theme").value = "T1";}
	if (localStorage.getItem("theme") === "T2") {document.getElementById("theme").value = "T2"; whiteMode();}
	document.getElementById("loading").style.display = "none";
}

function whiteMode() {
	document.getElementById("body").style = "background-color:white;"
	document.getElementById("title").style = "color:black;"
	document.getElementById("welcome").style = "color:black;"
	document.getElementById("wel_txt").style = "color:black;"
	document.getElementById("input_text").style = "2px none black"
}


function noMeta() {
	document.getElementById("war_txt").innerHTML = "due to the way your link is formatted, we can not provide metadata for it at this time. we apologize for the inconvienice."
	document.getElementById("warn").style.display = "block";
	document.getElementById("deets").innerHTML = "";
	document.getElementById("loading").style.display = 'none';
	document.getElementById("input_text").disabled = false;
	setTimeout(function () {
		document.getElementById("warn").style.display = 'none'
		getLink();
		document.getElementById("loading").style.display = 'block';
		document.getElementById("vidMeta").style.display = "none";
	}, 5000);
	document.title = "[ERROR] taylor - youtube video downloader"
	
}

function noMeta2() {
	document.getElementById("war_txt").innerHTML = "due to the metadata API seeming to be down, we can not provide metadata for it at this time. we apologize for the inconvienice."
	document.getElementById("warn").style.display = "block";
	document.getElementById("deets").innerHTML = "";
	document.getElementById("loading").style.display = 'none';
	document.getElementById("input_text").disabled = false;
	setTimeout(function () {
		document.getElementById("warn").style.display = 'none'
		getLink();
		document.getElementById("loading").style.display = 'block';
		document.getElementById("vidMeta").style.display = "none";
	}, 5000);
	document.title = "[ERROR] taylor - youtube video downloader"
}
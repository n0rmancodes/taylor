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
	document.title = "[DOWNLOADING...] taylor - youtube video downloader"
	document.getElementById("downloadInfo").style.display = "none";
	document.getElementById("error").style.display = "none";
	document.getElementById("deets").innerHTML = "checking link..."
	if (localStorage.getItem('lang') === 'es') {document.getElementById("deets").innerHTML = "comprobando enlace..."}
	document.getElementById("loading").style.display = "block"
	document.getElementById("input_text").disabled = true;
	var ytLink = document.getElementById("input_text").value
	if(!ytLink.includes("https://youtu")) {
		if(!ytLink.includes("https://www.youtu")){
			nomatch()
			return;
		}
	}
	if (ytLink.includes("https://youtu.be/")) {
		var yID = document.getElementById("input_text").value.substring(17,28);
		var ytLink = "https://youtube.com/watch?v=" + yID;
	}
	const http = new XMLHttpRequest();
	const dUrl = "https://you-link-revived.herokuapp.com/?url=" + ytLink;
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
		document.getElementById("vidDL").href = downloadLink;
		document.getElementById("vidQuality").innerHTML =  quality;
		document.getElementById("downloadInfo").style.display = "block";
		document.getElementById("loading").style.display = "none";
		document.getElementById("warn").style.display = "none";
		document.getElementById("error").style.display = "none";
		document.getElementById("deets").innerHTML = "process complete!"
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

function legal() {
	alert("Taylor is not responsible for any legal repercussions facing for using Taylor. The download API we use blocks out copyrighted content. Some may still seep through, however.")
}

function cook() {
	alert("By continuing to use this site, you consent to Taylor storing cookies in your computer. These are just to save your settings and we store no personal information.");
	localStorage.setItem("cookie", "consented!")
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
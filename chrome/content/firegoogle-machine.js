/*
# 
#
# Da modificare per creare la barra ricerca docente con link utili
#
#
#
#
 */

//ricerca pagine web
function websearch() { 
  var fgtext = document.getElementById("searchtext").value;
  var itasearch;
  document.getElementById("italiano").selected ? itasearch="lr%3Dlang_it" : itasearch="";
  var strsearch = "http://www.google.it/search?hl=it&q="+fgtext+"&btnG=Cerca+con+Google&meta="+itasearch;
  window.content.document.location.href = strsearch;
}

//ricerca pdf con google dorks
function pdfsearch(){
  var fgtext = document.getElementById("searchtext").value;
  var itasearch;
  document.getElementById("italiano").selected ? itasearch="lr%3Dlang_it" : itasearch="";
  var strsearch = "http://www.google.it/search?hl=it&q=filetype%3Apdf+"+fgtext+"&btnG=Cerca+con+Google&meta="+itasearch;
  window.content.document.location.href = strsearch;
}

//ricerca immagini
function imagesearch() {         
  var fgtext = document.getElementById("searchtext").value;
  var strsearch = "http://images.google.it/images?q="+fgtext+"&hl=it&btnG=Cerca+con+Google";
  window.content.document.location.href = strsearch;
}

//ricerca nei newsgroup
function groupsearch() {         
   var fgtext = document.getElementById("searchtext").value;
   var itasearch;
   document.getElementById("italiano").selected ? itasearch="&meta=group%3Dit.*" : itasearch="";
   var strsearch = "http://groups.google.it/groups?q="+fgtext+"&hl=it&btnG=Cerca+con+Google"+itasearch;
   window.content.document.location.href = strsearch;
}

//ricerca nelle directory
function directorysearch() {     
   var fgtext = document.getElementById("searchtext").value;
   var itasearch;
   document.getElementById("italiano").selected ? itasearch="%2FWorld%2FItaliano&hl=it" : itasearch="";
   var strsearch = "http://www.google.com/search?q="+fgtext+"&btnG=Cerca+con+Google&hl=it&cat=gwd%2FTop"+itasearch;
   window.content.document.location.href = strsearch;
}

//ricerca nelle news
function newssearch() {          
   var fgtext = document.getElementById("searchtext").value;
   var itasearch;
   document.getElementById("italiano").selected ? itasearch="hl=it&ned=it" : itasearch="hl=en&ned=us";
   var strsearch = "http://news.google.com/news?"+itasearch+"&q="+fgtext+"&btnG=Cerca+nelle+News";
   window.content.document.location.href = strsearch;
}

//stampa pagina about
function about() {
  window.openDialog("chrome://ingunisannio/content/about.xul");
}



/*
*  This file is part of 'IngUnisannio'.
*
* 'IngUnisannio' is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License,
* or any later version.
*
* 'IngUnisannio' is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with 'IngUnisannio'.  If not, see <http://www.gnu.org/licenses/>.
*
* Author: Stefano Viola < stefanoviola [at] sanniolug [dot] org >
* Collaborator: Ivan Morgillo < imorgillo [at] sanniolug [dot] org >
*/

var updateUtility = {
    message: '',
    autore: '',
    versione: '',
    dataRilascio: '',
    url: "http://esteban.homelinux.org/extensions/ingunisannio/agg.xml",
    urlLocal: "chrome://ingunisannio/content/aggLocal.xml",


 onLoad: function() {
	// Do some initialization
    },
    
     check: function(){
	 document.getElementById("aggiornamento").value = this.message;
	 document.getElementById("autore").value = this.autore;
	 document.getElementById("dataRilascio").value = this.dataRilascio;
	 document.getElementById("versione").value = this.versione;
    },

 update: function(){
     var title;
     var version;
     var description;
     var builtDate;
     var titleValue;
     var versionValue;
     var descriptionValue;

     var versionLocal;
     var versionLocalValue;
     var linkDownload;
     var linkDownloadValue;
     var dateBuild;
     var dateBuildValue;
     var authorBuild;
     var authorBuildValue;

     var reqLocal = new XMLHttpRequest();
     var req = new XMLHttpRequest();  
     req.open('GET', this.url, false);   
     reqLocal.open('GET', this.urlLocal, false);
     reqLocal.send(null);
     req.send(null);
    
     if(req.status == 200){
	 
	 var xmldoc = req.responseXML;
	
	 title = xmldoc.getElementsByTagName("title");
	 version = xmldoc.getElementsByTagName("version");
	 description = xmldoc.getElementsByTagName("description");
	 linkDownload = xmldoc.getElementsByTagName("linkDownload");
	 dateBuild = xmldoc.getElementsByTagName("lastBuildDate");
	 authorBuild = xmldoc.getElementsByTagName("author");
	 
	 
	 titleValue = title[0].textContent; 
	 versionValue = version[0].textContent;
	 descriptionValue = description[0].textContent;
	 linkDownloadValue = linkDownload[0].textContent;
	 dateBuildValue = dateBuild[0].textContent; 
	 authorBuildValue = authorBuild[0].textContent;

	 this.autore = authorBuildValue;
	 this.dataRilascio = dateBuildValue;
	 this.versione = versionValue;
	 //alert(titleValue+"\n"+versionValue+"\n"+descriptionValue);
	 
	}  

	else{
	        alert("Error loading page Req status:" + req.status + " and url: " + this.url);  
	 }

     if(reqLocal.status == 0){
	 var xmldocLocal = reqLocal.responseXML;
	 versionLocal = xmldocLocal.getElementsByTagName("version");
	 versionLocalValue = versionLocal[0].textContent;
	 
	// alert(linkDownloadValue);
	// alert(versionLocalValue);
     }
     else {
	 alert("Error loading page Req status:" + reqLocal.status + " and url: " + this.urlLocal);  
	 
     }
     
     if(eval(versionLocalValue)<eval(versionValue)){
	 this.message = "E' disponibile una nuova versione dell'estensione!";
	 updateUtility.check();
	 //alert("E' disponibile una nuova versione dell'estensione");
	 window.opener.open(linkDownloadValue, 'IngUnisannio Extension', 'width=200, height=200, toolbar=no, location=no, resizable=no, fullscreen=no, menubar=no');
     }else{  
	 this.message = "Non ci sono aggiornamenti";
	 updateUtility.check();
	 //alert("La tua versione e' l'ultima disponibile");
     }
 }
}
// ON LOAD
window.addEventListener("load", function(e) {
    // Load main object
    ingunisannio.onLoad(e);
    
}, false);
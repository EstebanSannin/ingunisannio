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

var ingunisannio = {

    filterWord: '',
    titles: '',
    avvisi: '',
    links: '',
    initList: '',
    arrayLink: new Array(),
    arrayDate: new Array(),
    allDescription: '',
    descriptionArray: new Array(),
    avvisiArray: new Array(),
    url: "http://www.ing.unisannio.it/avvisi/rss20.xml",

    onLoad: function() {
	// Do some initialization
	ingunisannio.addToolbarButton('ingunisannio-toolbar-button');
    },

    addToolbarButton: function (buttonId) {
	this.modifyToolbarButtons(function(set) {
				      if(set.indexOf(buttonId) == -1) {
					  return set.replace(/(urlbar-container|separator)/,
							     buttonId + ',$1');
				      }
				      else {
					  return null;
				      }
				  });
    },
    modifyToolbarButtons: function (modifier) {
	var toolbar =
	    document.getElementById('nav-bar') ||
	    document.getElementById('mail-bar') ||
	    document.getElementById('mail-bar2');
	
	if(!toolbar)
	    return;
	
	if(toolbar.getAttribute('customizable') == 'true') {
	    var newSet = modifier(toolbar.currentSet);
	    if(!newSet)
		return;
	    
	    toolbar.currentSet = newSet;
	    toolbar.setAttribute('currentset', toolbar.currentSet);
	    toolbar.ownerDocument.persist(toolbar.id, 'currentset');
	    try { BrowserToolboxCustomizeDone(true); } catch (e) {}
	}
    },
    
   
    about: function() {
	window.openDialog("chrome://ingunisannio/content/about.xul");
    },
    
    showAvvisi: function() {     
	window.openDialog("chrome://ingunisannio/content/showAvvisi.xul", "",   "modal");

	//window.openDialog("chrome://ingunisannio/content/showAvvisi.xul", "pippo",  "resizable=no");
    },

    appendToList: function(element, index, array) {
	ingunisannio.initList.appendItem(element, element);
    },

    getAvvisi_All: function(){
	var tempAvvisi = "";
	var description;
	var tempDate = "";
	var titles;
	var tempDesc = "";
	var date;
	var link;
	var req = new XMLHttpRequest();  
	req.open('GET', this.url, false);   
	req.send(null);
	//alert(req.status); // for debug
	if(req.status == 200){
	    
	    var xmldoc = req.responseXML;

	    titles = xmldoc.getElementsByTagName("title");
	    date = xmldoc.getElementsByTagName("pubDate");
	    description = xmldoc.getElementsByTagName("description");
	    link = xmldoc.getElementsByTagName("source");
	}  
	else{  
	    alert("Error loading page Req status:" + req.status + " and url: " + url);  
	}
	var j = 0; //for control title filter
	for( var i=1; i<15; i++){ 
	   //tempAvvisi+= titles[i].textContent +"\n"; //per debugging
	    this.avvisiArray[j] = titles[i].textContent;
	    this.descriptionArray[j] = description[i].textContent;
	    this.arrayLink[j] = link[i-1].getAttribute("url");
	    this.arrayDate[j] = date[i-1].textContent;
	    j++;		
	}
	    	
	/*
	 var myRegex = /giannone/;
	 var indirizzi = pippo.match(myRegex);
	 */
		
	this.initList = document.getElementById('multiline');   
	var countItem = this.initList.getRowCount();
	
	if(countItem == 0){
	    this.avvisiArray.forEach(this.appendToList);
	}
	else{
	    for(var j=0; j<countItem; j++){
		this.initList.removeItemAt(0);
	    }
	    this.avvisiArray.forEach(this.appendToList);
	}
	
    },

    getAvvisi_Filter: function(){
	//alert(this.filterWord);
	var tempAvvisi = "";
	var description;
	var tempDate = "";
	var titles;
	var tempDesc = "";
	var date;
	var link;
	var reg = this.filterWord;
	var req = new XMLHttpRequest();  
	req.open('GET', this.url, false);   
	req.send(null);
	//alert(req.status); // for debug
	if(req.status == 200){
	    
	    var xmldoc = req.responseXML;
	    
	    titles = xmldoc.getElementsByTagName("title");
	    date = xmldoc.getElementsByTagName("pubDate");
	    description = xmldoc.getElementsByTagName("description");
	    link = xmldoc.getElementsByTagName("source");  
	}  
	else
	    alert("Error loading page Req status:" + req.status + " and url: " + this.url);  
	
	var j = 0; //for control title filter
	
	/* Reset di tutti gli array. Questo  perche' se si scaricano 
	 * prima tutti gli avvisi e in un secondo memento applichiamo un filtro, 
	 * gli array restano ancora riempiti con i vecchi dati restituendo un 
	 * risultato incorretto */
	for( var x=0; x<20; x++){
	    this.arrayDate[x] = null;
	    this.arrayLink[x] = null;
	    this.avvisiArray[x] = null;
	}
	
	for( var i=1; i<15; i++){
	    
	    //tempAvvisi+= titles[i].textContent +"\n"; //debug
	    //alert(tempAvvisi); //debug 
	    
	    var getDescription=description[i].textContent;
	    var getTitle=titles[i].textContent;
	    var descriptionLowerCase=getDescription.toLowerCase();
	    var titleLowerCase=getTitle.toLowerCase();
	    //var reg = "chimica";
	    //alert(reg);
	    //alert(titles[i].textContent); //debug
	    if(titleLowerCase.indexOf(reg) != -1 || descriptionLowerCase.indexOf(reg) != -1 ){
		
		this.avvisiArray[j] = titles[i].textContent;
		this.descriptionArray[j] = description[i].textContent;
		this.arrayLink[j] = link[i-1].getAttribute("url");
		this.arrayDate[j] = date[i-1].textContent;
		//alert(this.avvisiArray[j]); // debug
		//alert(this.arrayLink[j]); // debug
		j++;
		
		//alert(description[i].textContent);
	    }
	    
	    /*
	     var myRegex = /giannone/;
	     var indirizzi = pippo.match(myRegex);
	     */
	    
	}
	this.initList = document.getElementById('multiline');   
	var countItem = this.initList.getRowCount();
	
	if(countItem == 0){
	    this.avvisiArray.forEach(this.appendToList);
	}
	else{
	    for(var j=0; j<countItem; j++){
		this.initList.removeItemAt(0);
	    }
	    this.avvisiArray.forEach(this.appendToList);
	    //alert(this.avvisiArray[0]);
	}
    },
    
    filter: function(textBoxID){
	var result = document.getElementById(textBoxID).value;
	document.getElementById("result").value = result;
	this.filterWord = result.toLowerCase();
    },
    
    setText: function(listID,textID) {
	var listBox = document.getElementById(listID);
	var selectedItem = listBox.getSelectedItem(0);
	var count = listBox.currentIndex;
	var newText = selectedItem.getAttribute("label");
	var str = this.descriptionArray[count];
	var tempDescription = str.replace("<br />", "", "gi");
	var dataAvvisi = this.arrayDate[count];
	var linkAvvisi = this.arrayLink[count];
	
	document.getElementById("description-box").value = tempDescription;
	document.getElementById("date-box").value = dataAvvisi.replace("+0100", "", "gi");
	if(document.getElementById("link-box").value != null){
	    document.getElementById("link-box").value = linkAvvisi;
	}
    },

    goToSelectPage: function(){
	var listBox = document.getElementById("multiline");
	var count = listBox.currentIndex;
	if(count ==-1){
	    alert("Non hai selezionato nessun avviso!");
	}else{
	    
	    var linkAvvisi = this.arrayLink[count];
	    window.open(linkAvvisi, 'IngUnisannio Extension', 'width=810, height=500, toolbar=no, location=yes, resizable=no, fullscreen=no, menubar=no');
	}
    },
    
    goToStudentportal: function() {
	gBrowser.addTab("https://servizistudenti.unisannio.it:4446/pls/self/gissweb.auth?p_cod_lingua=004&p_tipoutente=&p_opzione=");
	
    },
    
    goToForum: function() {
	gBrowser.addTab("http://unibn.altervista.org");
    },
    
    goToStudentportal_avvisi: function() {
	window.opener.open("https://servizistudenti.unisannio.it:4446/pls/self/gissweb.auth?p_cod_lingua=004&p_tipoutente=&p_opzione=");
    },
    
    goToHomeIng: function(){
	window.opener.open("http://www.ing.unisannio.it");
    }
    
    // Add tab:  
    //gBrowser.addTab("http://www.google.com/");
    
    // Add tab, then make active:
    //gBrowser.selectedTab = gBrowser.addTab("http://www.google.com/");
}

// ON LOAD
window.addEventListener("load", function(e) {
    // Load main object
    ingunisannio.onLoad(e);
    
}, false);

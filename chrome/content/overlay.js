/*
This file is part of 'IngUnisannio'.

'IngUnisannio' is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License,
or any later version.

'IngUnisannio' is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with 'IngUnisannio'.  If not, see <http://www.gnu.org/licenses/>.

Author: Stefano Viola < stefanoviola [at] sanniolug [dot] org >
Collaborator: Ivan Morgillo < imorgillo [at] sanniolug [dot] org >
*/

var ingunisannio = {

    titles: '',
    avvisi: '',
    links: '',
    initList: '',
    arrayDate: new Array(),
    allDescription: '',
    descriptionArray: new Array(),
    avvisiarray: new Array(),
    url: "http://www.ing.unisannio.it/avvisi/rss20.xml",

    onLoad: function() {
	// Do some initialization
    },
    
    about: function() {
	window.openDialog("chrome://ingunisannio/content/about.xul");
    },
    
    showAvvisi: function() {
	window.openDialog("chrome://ingunisannio/content/showAvvisi.xul");
    },

    appendToList: function(element, index, array) {
    ingunisannio.initList.appendItem(element, element);
    },

    getAvvisi: function() {
	var tempAvvisi = "";
	var description;
	var tempDate = "";
	var titles;
	var tempDesc = "";
	var date;
	var req = new XMLHttpRequest();  
	req.open('GET', this.url, false);   
	req.send(null);
	//alert(req.status); for debug
	if(req.status == 200){
	    
	    var xmldoc = req.responseXML;
	    titles = xmldoc.getElementsByTagName("title");
	    date = xmldoc.getElementsByTagName("pubDate");
	    description = xmldoc.getElementsByTagName("description");
	    
	}  
	else
	    alert("Error loading page Req status:" + req.status + " and url: " + url);  

	for(var i=1; i<20; i++){
	    //tempDesc+= description[i].textContent +"\n"; 
	    //tempAvvisi+= titles[i].textContent +"\n";
	    //tempDate+= date[i].textContent +"\n";
	    this.arrayDate[i] = date[i-1].textContent;
	    this.avvisiarray[i] = titles[i].textContent;
	    this.descriptionArray[i] = description[i].textContent;
	}
	      
	this.initList = document.getElementById('multiline');   
	var countItem = this.initList.getRowCount();
	
	if(countItem == 0){
	    this.avvisiarray.forEach(this.appendToList);
	}
	else{
	    for(var j=0; j<countItem; j++){
		this.initList.removeItemAt(0);
	    }
	    this.avvisiarray.forEach(this.appendToList);
	}
	
    },

    setText: function(listID,textID) {
	var listBox = document.getElementById(listID);
	var selectedItem = listBox.getSelectedItem(0);
	var count = listBox.currentIndex;
	var newText = selectedItem.getAttribute("label");
	var str = this.descriptionArray[count+1];
	var temp = str.replace("<br />", "", "gi");
	var dataAvvisi = this.arrayDate[count+1];
	document.getElementById("description-box").value = temp;
	document.getElementById("date-box").value = dataAvvisi.replace("+0100", "", "gi");
    },

    goToStudentportal: function() {
	gBrowser.addTab("https://servizistudenti.unisannio.it:4446/pls/self/gissweb.auth?p_cod_lingua=004&p_tipoutente=&p_opzione=");
    },

    goToForum: function() {
	gBrowser.addTab("http://unibn.altervista.org");
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

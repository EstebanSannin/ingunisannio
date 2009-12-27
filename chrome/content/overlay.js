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

//Global variables
var titles;
var avvisi;
var links;
var initList;
var arrayDate = new Array();
var allDescription;
var descriptionArray = new Array();
var avvisiarray = new Array();
const url = "http://www.ing.unisannio.it/avvisi/rss20.xml";

//Funzione per la finestra About:
function aboutEsteban() {
  window.openDialog("chrome://ingunisannio/content/about.xul");
}
function savvisi(){
  window.openDialog("chrome://ingunisannio/content/showAvvisi.xul");
}

function appendToList(element, index, array) {
  
  initList.appendItem(element, element);
}

function getAvvisi(){
  var tempAvvisi = "";
  var description;
  var tempDate = "";
  var titles;
  var tempDesc = "";
  var date;
  var req = new XMLHttpRequest();  
  req.open('GET', url, false);   
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
    arrayDate[i] = date[i-1].textContent;
    avvisiarray[i] = titles[i].textContent;
    descriptionArray[i] = description[i].textContent;
  }
  // allDescription = tempDesc;
  avvisi = tempAvvisi;      
  initList = document.getElementById('multiline');   
  var countItem = initList.getRowCount();
  
  if(countItem == 0){
    avvisiarray.forEach(appendToList);
 }
 else{
   for(var j=0; j<countItem; j++){
     initList.removeItemAt(0);
   }
   avvisiarray.forEach(appendToList);
   }
  
}

function setText(listID,textID)
{
  var listBox = document.getElementById(listID);
  var selectedItem = listBox.getSelectedItem(0);
  var count = listBox.currentIndex;
  var newText = selectedItem.getAttribute("label");
  var str = descriptionArray[count+1];
  var temp = str.replace("<br />", "", "gi");
  var dataAvvisi = arrayDate[count+1];
  document.getElementById("description-box").value = temp;
  document.getElementById("date-box").value = dataAvvisi.replace("+0100", "", "gi");
}

function studentPortal(){
  gBrowser.addTab("https://servizistudenti.unisannio.it:4446/pls/self/gissweb.auth?p_cod_lingua=004&p_tipoutente=&p_opzione=");
}

function forum(){
  gBrowser.addTab("http://unibn.altervista.org");
}


// Add tab:  
//gBrowser.addTab("http://www.google.com/");

// Add tab, then make active:
//gBrowser.selectedTab = gBrowser.addTab("http://www.google.com/");






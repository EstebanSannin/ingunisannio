/*
#
#
# You should have received a copy of the GNU General Public License
# along with 'IngUnisannio'.  If not, see <http://www.gnu.org/licenses/>.
#
# Author: Stefano Viola < stefanoviola [at] sanniolug [dot] org >
#
# 
#
#
*/

//Global variables
var titles;
var avvisi;
var links;
const url = "http://www.ing.unisannio.it/avvisi/rss20.xml";

//Funzione per la finestra About:
function aboutEsteban() {
  window.openDialog("chrome://ingunisannio/content/about.xul");
}

//Funzione per ottenere gli avvisi:
/*function avvisi() {
  window.openDialog("chrome://ingunisannio/content/showAvvisi.xul");
}
*/
function alertSample() {
  var tempAvvisi="";
  var tempLinks;
  var req = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
    .createInstance(Components.interfaces.nsIXMLHttpRequest);
  req.open("GET", url, true);
  
  req.onreadystatechange = function (aEvt) {  
    if (req.readyState == 4) { 
      // alert(req.status); //for debug
      if(req.status == 200) {
	// Gets XML RSS Feed and creates an array of Avvisi Titles 
	var xmldoc = req.responseXML;
	titles = xmldoc.getElementsByTagName("title");
	links = xmldoc.getElementsByTagName("link");
		
      }
      else  
	alert("Error loading page Req status:" + req.status + " and url: " + url);  
    }
    for(var i=1; i<20; i++){
	  tempAvvisi += titles[i].textContent + "\n";
	}
	avvisi = tempAvvisi;
  };  
  req.send(null);
  document.getElementById('multiline').value = avvisi;   
  //alert(avvisi);
}

function test(){
  var tempAvvisi = "";
  var titles;
  var date;
  var req = new XMLHttpRequest();  
  req.open('GET', url, false);   
  req.send(null);
  alert(req.status);
  if(req.status == 200){
    
    var xmldoc = req.responseXML;
   titles = xmldoc.getElementsByTagName("title");
   date = xmldoc.getElementsByTagName("pubDate");
  }  
  else
    alert("Error loading page Req status:" + req.status + " and url: " + url);  
  
  for(var i=1; i<20; i++){
     tempAvvisi += titles[i].textContent +"\n"+ date[i].textContent + "\n";
  }
  avvisi = tempAvvisi;      
  alert(avvisi);
}

// Add tab:  
//gBrowser.addTab("http://www.google.com/");

// Add tab, then make active:
//gBrowser.selectedTab = gBrowser.addTab("http://www.google.com/");






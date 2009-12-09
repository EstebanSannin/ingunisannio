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
var initList;
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

function test(){
  var tempAvvisi = "";
  var description;
  var titles;
  var tempDesc = "";
  var date;
  var req = new XMLHttpRequest();  
  req.open('GET', url, false);   
  req.send(null);
  alert(req.status);
  if(req.status == 200){
    
    var xmldoc = req.responseXML;
    titles = xmldoc.getElementsByTagName("title");
    date = xmldoc.getElementsByTagName("pubDate");
    description = xmldoc.getElementsByTagName("description");
  }  
  else
    alert("Error loading page Req status:" + req.status + " and url: " + url);  
  
  for(var i=1; i<20; i++){
    tempDesc+= description[i].textContent +"\n"; 
    tempAvvisi+= titles[i].textContent +"\n";
    avvisiarray[i] = titles[i].textContent;
    descriptionArray[i] = description[i].textContent;
  }
  
  allDescription = tempDesc;
  avvisi = tempAvvisi;      
  document.getElementById("description-box").value = descriptionArray[1];
  initList = document.getElementById('multiline');   
  avvisiarray.forEach(appendToList);
}



function setText(listID,textID)
{
  var listBox = document.getElementById(listID);
  var selectedItem = listBox.getSelectedItem(0);
  var pippo = listBox.currentIndex;
  var newText = selectedItem.getAttribute("label");
  document.getElementById("description-box").value = pippo;
}




// Add tab:  
//gBrowser.addTab("http://www.google.com/");

// Add tab, then make active:
//gBrowser.selectedTab = gBrowser.addTab("http://www.google.com/");






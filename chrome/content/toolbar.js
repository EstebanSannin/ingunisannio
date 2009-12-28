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

// restituisce il testo scritto nella Label "searchtext"

var toolbar = {

 getLabel: function(){
    return document.getElementById("searchtext").value;
  },

//ricerca pagine web
 websearch: function() { 
    var itasearch;
    document.getElementById("italiano").selected ? itasearch="lr%3Dlang_it" : itasearch="";
    var strsearch = "http://www.google.it/search?hl=it&q="+this.getLabel()+"&btnG=Cerca+con+Google&meta="+itasearch;
    window.content.document.location.href = strsearch;
  },
 
//ricerca libri biblioteca D.I.N.G.
 biblioteca: function() {
    var site = "http://polosbn.bnnonline.it/SebinaOpac/Opac?AutEnteDesc=&LIBERA=&PoloBiblio=NAP02&TitoloBase2="+this.getLabel()+"&action=search&filter=&kindOfSearch=simple&list=&listaTitoli.x=24&listaTitoli.y=10&startat=0&thAutEnteDesc=&thCategoria=Libro%20Moderno&thCategoria=Libro%20Antico&thTitoloBase2=";
    window.content.document.location.href = site;
  },

//ricerca pdf con google dorks
 pdfsearch: function(){
    var itasearch;
    document.getElementById("italiano").selected ? itasearch="lr%3Dlang_it" : itasearch="";
    var strsearch = "http://www.google.it/search?hl=it&q=filetype%3Apdf+"+this.getLabel()+"&btnG=Cerca+con+Google&meta="+itasearch;
    window.content.document.location.href = strsearch;
  },

//ricerca immagini
 imagesearch: function() {         
    var strsearch = "http://images.google.it/images?q="+this.getLabel()+"&hl=it&btnG=Cerca+con+Google";
    window.content.document.location.href = strsearch;
  },

//ricerca nei newsgroup
 groupsearch: function() {            
    var itasearch;
    document.getElementById("italiano").selected ? itasearch="&meta=group%3Dit.*" : itasearch="";
    var strsearch = "http://groups.google.it/groups?q="+this.getLabel()+"&hl=it&btnG=Cerca+con+Google"+itasearch;
    window.content.document.location.href = strsearch;
  },
 
//ricerca nelle directory
 directorysearch: function() {     
    var itasearch;
    document.getElementById("italiano").selected ? itasearch="%2FWorld%2FItaliano&hl=it" : itasearch="";
    var strsearch = "http://www.google.com/search?q="+this.getLabel()+"&btnG=Cerca+con+Google&hl=it&cat=gwd%2FTop"+itasearch;
    window.content.document.location.href = strsearch;
  },

//ricerca nelle news
 newssearch: function() {          
    var itasearch;
    document.getElementById("italiano").selected ? itasearch="hl=it&ned=it" : itasearch="hl=en&ned=us";
    var strsearch = "http://news.google.com/news?"+itasearch+"&q="+this.getLabel()+"&btnG=Cerca+nelle+News";
    window.content.document.location.href = strsearch;
  },

}
 
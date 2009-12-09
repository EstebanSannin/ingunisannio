var statusbar;

var samplejs = {
  onLoad: function() {
   
    // initialization code
    this.initialized = true;
    
    document.getElementById("contentAreaContextMenu")
            .addEventListener("popupshowing", function(e) { this.showContextMenu(e); }, false);
    
    statusbar = document.getElementById('sample-status-bar');
   
    },

  
  
  aboutItasaNotifier: function(e){
    window.openDialog("chrome://sample/content/about.xul");
  },
  
};
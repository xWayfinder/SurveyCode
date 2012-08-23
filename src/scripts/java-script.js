/* 
* Area Grpah Library from
* https://github.com/jmstriegel/jquery.spidergraph
*/
function loadScript(url, callback){
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}
function getScore(ids){
    var res = 0;
    for(x in ids){
       var id = "#res"+ ids[x];
       var answer = $(id).text()
       switch (answer){
          case "Always": res += 4;
             break;
         case "Usually": res += 3;
             break;
         case "Sometimes": res += 2;
             break;
         case "Rarely": res += 1;
             break;
         case "Never": res += 0;
             break;
         default: res += 0;
             break;
       }   
   }
   return res;
}
var createRadarGraph = function() {
    var cat = [["BldDply","Build & Deploy", getScore([3,9,51])],
               ["ConfMgmt", "Configuration Management",getScore([10,11,53])],
               ["Test", "Testing", getScore([55,12,56])],
               ["Deploy","Deployment", getScore([13,14,58])],
               ["RelMgmt", "Release Management",getScore([60,61,62])],
               ["EnvMgmt","Environment Management", getScore([63,65,66])],
               ["EnvProv", "Environment Provisioning", getScore([17,15,16])]];

    var fields = new Array();
    var percent = new Array();
    for(i in cat){
       	  percent[cat[i][0]] = Math.ceil(cat[i][2] / 0.12) + "%"		
    }
    if($(window).width() < 350){
       $('#spidergraphcontainer').addClass("mobile");
       for(i in cat){
          fields[i] = cat[i][0];
       }
    }else{
       $('#spidergraphcontainer').addClass("web");
       for(i in cat){       	  
          fields[i] = cat[i][1] + " " + percent[cat[i][0]];
       }
    }
    
    $('#spidergraphcontainer').spidergraph({
        'fields': fields,
        'gridcolor': 'rgba(20,20,20,1)'   
    });
    
   $('#spidergraphcontainer').spidergraph('addlayer', { 
        'strokecolor': 'rgba(80,212,72,0.1)',
        'fillcolor': 'rgba(80,212,72,0.6)',
        'data': [10, 10, 10, 10, 10, 10, 10]
    });
    $('#spidergraphcontainer').spidergraph('addlayer', { 
        'strokecolor': 'rgba(255,121,38,0.1)',
        'fillcolor': 'rgba(255,121,38,0.6)',
        'data': [7, 7, 7, 7, 7, 7, 7]
    });
    $('#spidergraphcontainer').spidergraph('addlayer', { 
        'strokecolor': 'rgba(213,21,21,0.1)',
        'fillcolor': 'rgba(213,21,21,0.6)',
        'data': [4, 4, 4, 4, 4, 4, 4]
    });

    var scores = new Array();
    for(i in cat){
          scores[i] = cat[i][2] / 1.2;
    }
    $('#spidergraphcontainer').spidergraph('addlayer', { 
        'strokecolor': 'rgba(16,25,104,0.1)',
        'fillcolor': 'rgba(16,25,104,0.6)',
        'data': scores
    });
    
    $('#bldDplyScore').text(percent['BldDply']);
    $('#confMgmtScore').text(percent['ConfMgmt']);
    $('#testScore').text(percent['Test']);
    $('#deployScore').text(percent['Deploy']);
    $('#relMgmtScore').text(percent['RelMgmt']);
    $('#envMgmtScore').text(percent['EnvMgmt']);
    $('#envProvScore').text(percent['EnvProv']);
    var total = 0;
    for(i in cat){
       total += cat[i][2];
    }    
    $('#totalScore').text(Math.ceil(total / 0.84) + "%");
};

window.onload=function(){
loadScript("https://raw.github.com/jmstriegel/jquery.spidergraph/master/assets/js/jquery.spidergraph.js", createRadarGraph);
$('#overlay').remove();
}
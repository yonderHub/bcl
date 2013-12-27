BCL = {};
var BCL  = {
	createloop:function(aNode,aDistance){
		urlStr = "http://192.168.1.103:3000/bcl/loop/"+aNode+"/"+aDistance;
		$('#bLoop').html('Create Another Loop <span class="glyphicon glyphicon-exclamation-sign"></span>');
	    $.ajax({
	    	type : "GET",
	        url: urlStr,
	        dataType: "jsonp",
	        crossDomain: true,
	        success:function(data){BCL.addtomap(data);},
	        error:function(x,t,m){console.log('fail ' + x + '-' + t + '-' +  m);},
	     });

	},
	addtomap:function(gjson){
		BCL.clearMap()
		geojsonLayer = L.geoJson(gjson).addTo(map);
		map.fitBounds(geojsonLayer.getBounds());
	},
	clearMap:function() {
	    for(i in map._layers) {
	        if(map._layers[i]._path != undefined) {
	            try {
	                map.removeLayer(map._layers[i]);
	            }
	            catch(e) {
	                //do nothing....
	            }
	        }
	    }
}
}
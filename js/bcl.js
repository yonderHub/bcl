BCL = {};
var BCL  = {
	createloop:function(aNode,aDistance){
		url = "http://192.168.1.103:3000/bcl/loop/"+aNode+"/"+aDistance;

	    $.ajax({
	        url: urlStr,
	        dataType: "json",
	        data: data,
	         crossDomain: true,
	         success:function(response){this.addtomap(response);},
	         error:function(x,t,m){console.log('fail');}
	     });

	},
	addtomap:function(gjson){
		geojsonLayer = L.geoJson(gjson).addTo(map);
	}
}
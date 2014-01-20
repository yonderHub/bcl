BCL = {};
var BCL  = {
	createloop:function(aNode,aDistance){
		urlStr = "http://54.197.234.215:3000/bcl/loop/"+aNode+"/"+aDistance; //54.197.234.215
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
		BCL.addtext(gjson);
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
	},
	addtext:function(gjson){		
		var i=gjson.features.length;
		var feat=gjson.features[i-1];
		var name = BCL.randomstring(15)
		var trails = BCL.getSegments(gjson);

		$('#theDistance').html('Distance: '+ feat.properties.totalcost);
		$('#theLoopName').html('Loop - ' + feat.properties.loopid);
		$('#theTrails').html('Trail Directions:<br>' + trails);
			
	},
	randomstring:function (n)
	{
	    if(!n)
	    {
	        n = 5;
	    }

	    var text = '';
	    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	    for(var i=0; i < n; i++)
	    {
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }

	    return text;
	},
	getSegments:function(gjson){
		var cnt=gjson.features.length;
		var trailHTML = '';
		var seg;
		var tarr = [];
		var lastTrail = '';

		for(var i=0;i<cnt;i++){
			seg =  gjson.features[i];

			if(seg.properties.segment_name == lastTrail){
				theturn = ' - continue on '
			}else{
				theturn = ', then turn on to '
			}

			if (i == cnt-1){
				endstr=' miles'	
			}else{
				endstr= ' miles' + theturn
			}
			if (i==0){
				startstr='Start on '
			}else{
				startstr=''
			}
			if(i>0 && i<cnt){
				midstr=' '
			}else{
				midstr=' for '
			}

			if(i>0 && i<cnt){
				var end = 'Travel'
				if(i==(cnt-1)){end='End on '}
				midstr2= '.<br>' +end+ ' on ' + seg.properties.segment_name + ' for '
			}else{
				midstr2=' '
			}
			segh = startstr + '(' + seg.properties.pass  + ')' + seg.properties.segment_name + midstr2  + midstr + seg.properties.cost + endstr;
			tarr.push(segh);
			lastTrail = seg.properties.segment_name;

		}
		tarr = BCL.uniqueArray(tarr)
		cnt=tarr.length;
		for(var i=0;i<cnt;i++){
			trailHTML = trailHTML + tarr[i]
		}
		
		return trailHTML;
	},
	uniqueArray:function(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}
}
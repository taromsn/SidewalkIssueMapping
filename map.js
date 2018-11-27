var latlon;
var latitude;
var longitude;
var intersection;
var intersectionLat;
var intersectionLng;
var marker = new mapboxgl.Marker();
var pkAccessToken = 'sk.eyJ1IjoidGFyb21zbiIsImEiOiJjanAwMnhnb2EzMGh3M3dtb2p1bm1xaWZ2In0.XoyuRGdiTq3edRpLsC_NAA';
var dataset = 'cjp014zjx3cpg2qo0afi1nu2s';
var client = new MapboxClient(pkAccessToken);

// Variable for active blank JSON
var feature = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "",
    "intersection" : "",
    "NW" : "",
    "SW" : "",
    "NE" : "",
    "SE" : "",
  }
}

mapboxgl.accessToken = 'pk.eyJ1IjoidGFyb21zbiIsImEiOiJjam40d3lxZW8wYjNyM2tudjlibDQzc2JyIn0.4ZIp_u2sbZ1vJXmXEQRtGg'
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/taromsn/cjn4wz86u1g302tlaghqyrwsk',
});



$('#about').on('click', function() {
	$('#screen').fadeToggle()
	$('.modal').fadeToggle()
});

$('.modal>.close-button').on('click', function() {
	$('#screen').fadeToggle()
	$('.modal').fadeToggle()
});

// Add Geolocation Control
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

// Clicking the 'EDIT' button will activate the data recording functions
$('.button-edit').on('click', function(){
	$('.button-southwest').toggle()
	$('.button-southwest').html("SW:")
	$('.button-northwest').toggle()
	$('.button-northwest').html("NW:")
	$('.button-southeast').toggle()
	$('.button-southeast').html("SE:")
	$('.button-northeast').toggle()
	$('.button-northeast').html("NE:")
	$('.button-done').toggle()
	feature["geometry"]["coordinates"] = [longitude,latitude]
	feature["properties"]["intersection"] = [intersection]
})

// This part is for recording data

var issueEntries = ["no issues","broken curb ramp", "needs curb ramp", "1st gen curb ramp", "2nd gen curb ramp", "3rd gen curb ramp"]

//button issue entry counters
swi = 0
nwi = 0
nei = 0
sei = 0

//cycling function for buttons
$('.button-southwest').on('click', function(){
	if (swi < 6){
		$('.button-southwest').html("SW: " +  issueEntries[swi])
		feature["properties"]["SW"] = issueEntries[swi]
		swi ++
		}
		else{
			swi = 0;
			feature["properties"]["SW"] = issueEntries[swi]
			$('.button-southwest').html("SW: " +  issueEntries[swi])
		}
	})

$('.button-northwest').on('click', function(){
	if (nwi < 6){
		$('.button-northwest').html("NW: " +  issueEntries[nwi])
		feature["properties"]["NW"] = issueEntries[nwi]
		nwi ++
		}
		else{
			nwi = 0;
			feature["properties"]["NW"] = issueEntries[nwi]
			$('.button-northwest').html("NW: " +  issueEntries[nwi])
		}
	})

$('.button-northeast').on('click', function(){
	if (nei < 6){
		$('.button-northeast').html("NE: " +  issueEntries[nei])
		feature["properties"]["NE"] = issueEntries[nei]
		nei ++
		}
		else{
			nei = 0;
			feature["properties"]["NE"] = issueEntries[nei]
			$('.button-northeast').html("NE: " +  issueEntries[nei])
		}
	})

$('.button-southeast').on('click', function(){
	if (sei < 6){
		$('.button-southeast').html("SE: " +  issueEntries[sei])
		feature["properties"]["SE"] = issueEntries[sei]
		sei ++
		}
		else{
			sei = 0;
			$('.button-southeast').html("SE: " +  issueEntries[sei])
		}
	})

// Clicking the 'DONE' button will write geoJSON to features list
$('.button-done').on('click', function(){
	client.insertFeature(feature, dataset, function(err, feature) {
  console.log(JSON.stringify(feature));})
	swi = 0
	nwi = 0
	nei = 0
	sei = 0
	$('.button-southwest').toggle()
	$('.button-northwest').toggle()
	$('.button-southeast').toggle()
	$('.button-northeast').toggle()
	$('.button-done').toggle()
	$('.button-edit').toggle()
	$('#info-window-body').html("<p>Data recorded!</p>");
})


// This part is for getting the nearest intersection, and for selecting a given intersection
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $('#info-window-body').html("<p> 'Geolocation error.' </p>");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
    // latlon = 'lat=' + position.coords.latitude + '&lng=' + position.coords.longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude
    getIntersection(latitude,longitude)
}

function getIntersection(latitude,longitude) {
	console.log(location)
	var url = 'https://secure.geonames.org/findNearestIntersectionJSON?' + 'lat=' + latitude + '&lng=' + longitude + '&username=tlm2yr'
	console.log(url)
	var data = {}
	swi = 0
	nwi = 0
	nei = 0
	sei = 0
	$('.button-southwest').hide()
	$('.button-northwest').hide()
	$('.button-southeast').hide()
	$('.button-northeast').hide()
	$('.button-done').hide()
	json = $.getJSON(url, function(data){
		console.log(data['intersection']['street1'] + ' & ' + data['intersection']['street2'])
		intersection = data['intersection']['street1'] + ' & ' + data['intersection']['street2']
		intersectionLat = data['intersection']['lat'];
		intersectionLng = data['intersection']['lng'];
		$('#info-window-body').html("<p>" + intersection + "</p>");
		$('.button-edit').show()
		map.flyTo({center: [longitude, latitude], zoom: 18});
		marker.setLngLat([intersectionLng,intersectionLat]);
		marker.addTo(map);
		console.log(marker)
		console.log(intersectionLat + intersectionLng)
	})}

//On click, change active intersection

map.on('click', function (e){
	latitude = e['lngLat']['lat'];
	longitude = e['lngLat']['lng'];
	getIntersection(latitude,longitude);
})

// Legend
var layers = [];

var colors = [];
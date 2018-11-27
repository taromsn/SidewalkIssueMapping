// var latlon;
// var latitude;
// var longitude;

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// function showPosition(position) {
//     console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
//     latlon = 'lat=' + position.coords.latitude + '&lng=' + position.coords.longitude;
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude
//     getIntersection(latlon)
// }

// function getIntersection(location) {
// 	console.log(location)
// 	var url = 'http://api.geonames.org/findNearestIntersectionJSON?' + latlon + '&username=tlm2yr'
// 	console.log(url)
// 	var data = {}
// 	json = $.getJSON(url, function(data){
// 		console.log(data['intersection']['street1'] + ' & ' + data['intersection']['street2'])
// 		var intersection = data['intersection']['street1'] + ' & ' + data['intersection']['street2']
// 		$('#info-window-body').html("<p>" + intersection + "</p>");
// 		map.flyTo({center: [longitude, latitude], zoom: 15});
// 	})}

// map.on('mousemove', function (e){
// 	console.log(JSON.stringify(e.lngLat));
// })
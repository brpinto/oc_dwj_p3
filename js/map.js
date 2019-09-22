var GoogleMap = (function() {

    let markers = [];
    let stationsInfos = [];

    function init()
    {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 45.750000, lng: 4.850000},
            zoom: 13,
        });
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=a9ff5f78d9f65322ff82ad755e383373b8903f3e", function(reponse){
            // on transforme les données au format JSON envoyé par le serveur en objet
            stationsInfos = JSON.parse(reponse);
            addMarkers(reponse);    
        });
    }
            
    function addMarkers(station)
    {
        stationsInfos.forEach(function (station){
            let latLng = new google.maps.LatLng(station.position.lat, station.position.lng);

            let marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
            markers.push(marker);

            marker.addListener("click", function(){
                Station.init(station.name, station.address, station.available_bike_stands, station.available_bikes, station.status, station.number);
                Modal.init();
            });
        });
        makeCluster();
    }

    function makeCluster()
    {
        let markerClusterer = new MarkerClusterer(map, markers,
        {imagePath: 'img/m/m'});
    }

    return { init };
})();
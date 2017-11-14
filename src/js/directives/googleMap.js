/* global google:ignore */

angular
  .module('wdi-project-3')
  .directive('googleMap', googleMap);

let events = null;
let markers = [];
let map = null;
let infowindow = null;
let APIOffset = 0;

googleMap.$inject = ['$window', '$http', 'API'];
function googleMap($window, $http, API) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link($scope, element) {
      map = new $window.google.maps.Map(element[0], {
        zoom: 12,
        center: $scope.center,
        scrollwheel: false,
        draggable: true
      });

      new $window.google.maps.Marker({
        position: $scope.center,
        map: map,
        animation: $window.google.maps.Animation.DROP
      });

      getEvents();

      function getEvents() {
        $http
          .get(`${API}/getEvents/${APIOffset}`)
          .then(response => {
            APIOffset = APIOffset + 50;

            events = response.data.events.event;

            events.forEach((event) => {
              console.log(event);
              addMarker(event);
            });
          });
      }

      function addMarker(event){

        const latLng = { lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) };

        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: 'images/dot.svg'
        });

        // var marker = new google.maps.Circle({
        //   strokeColor: '#FF0000',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: '#FF0000',
        //   fillOpacity: 0.35,
        //   position: latLng,
        //   map: map,
        //   center: latLng,
        //   radius: Math.sqrt(event.popularity) * 10
        // });

        marker.addListener('click', ()=> {
          createInfoWindow(marker, event);
        });

        markers.push(marker);
      }
      function createInfoWindow(marker, event){
        if(infowindow) infowindow.close();

        infowindow = new google.maps.InfoWindow({
          content: `
          <div class="infowindow">
            <h3>Venue Name:${event.venue_name}</h3>
            <h3>Event Name:${event.title}</h3>
            <h3>Event Start Time:${event.start_time}</h3>
            <h3>Event Finish Time:${event.stop_time}</h3>
            <h3>Popularity Score:${event.popularity}</h3>
            <a>Show More</a>
          </div>
          `
        });

        infowindow.open(map, marker);
      }
    }
  };

  return directive;
}

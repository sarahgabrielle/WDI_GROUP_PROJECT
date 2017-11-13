/* global google:ignore */

angular
  .module('wdi-project-3')
  .directive('googleMap', googleMap);

let events = null;
let markers = [];
let map = null;
let infowindow = null;

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
      console.log(element[0]);
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

      $http
        .get(`${API}/getEvents`)
        .then(response => {
          console.log(response);
          events = response.data.results;
          events.forEach((event) => {
            addMarker(event);
          });
        });

      function addMarker(event){
        const latLng = { lat: event.venue.latitude, lng: event.venue.longitude };
        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: 'images/dot.svg'
        });

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
            <h3>Venue Name:${event.venue.name}</h3>
            <h3>Event Name:${event.eventname}</h3>
            <h3>Event Finish Time:${event.openingtimes.doorsclose}</h3>
            <h3>No Atendees:${event.goingtocount}</h3>
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

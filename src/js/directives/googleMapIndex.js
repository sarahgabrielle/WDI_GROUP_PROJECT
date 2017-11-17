/* global google:ignore */

angular.module('wdi-project-3').directive('googleMapIndex', googleMapIndex);

let events = null;
let newEvents = null;
let markers = [];
let map = null;
let infowindow = null;
const APIOffset = 0;
let eventIcon = null;
let searchedCategories = null;
let searchedRadius = null;
let searchedLat = null;
let searchedLng = null;

googleMapIndex.$inject = ['$window', '$http', 'API', '$rootScope', '$compile'];

function googleMapIndex($window, $http, API, $rootScope, $compile) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link($scope, element) {
      $rootScope.$on('changeMapCenter', (e, latLng) => {
        map.setCenter(latLng);
        map.setZoom(14);
        const centerMarker = new $window.google.maps.Marker({
          position: latLng,
          map: map,
          animation: $window.google.maps.Animation.DROP,
          icon: 'images/blue_pointer.png'
        });
        clearMarkers();
        markers.push(centerMarker);
      });

      map = new $window.google.maps.Map(element[0], {
        zoom: 13,
        center: $scope.center,
        scrollwheel: false,
        draggable: true
      });

      const initialMarker = new $window.google.maps.Marker({
        position: $scope.center,
        map: map,
        animation: $window.google.maps.Animation.DROP,
        icon: 'images/blue_pointer.png'
      });
      markers.push(initialMarker);

      getEvents();

      function getEvents() {
        $http.get(`${API}/getEvents/${APIOffset}`).then(response => {
          events = response.data.events.event;

          events.forEach(event => {
            setIcon(event);
            addMarker(event);
          });
        });
      }

      $rootScope.$on('changeCategories', (e, selectedCategories) => {
        searchedCategories = selectedCategories;
      });

      $rootScope.$on('changeRadius', (e, selectedRadius) => {
        searchedRadius = selectedRadius;
      });

      $rootScope.$on('changeSearchLat', (e, lat) => {
        searchedLat = lat;
      });
      $rootScope.$on('changeSearchLng', (e, lng) => {
        searchedLng = lng;
        getEventsAfterSearch();
      });

      function getEventsAfterSearch() {
        $http
          .get(
            `${API}/getNewEvents/${searchedLat}/${searchedLng}/${
              searchedRadius
            }/${APIOffset}/${searchedCategories}`
          )
          .then(response => {
            newEvents = response.data.events.event;

            newEvents.forEach(event => {
              setIcon(event);
              addMarker(event);
            });
          });
      }

      function setIcon(event) {
        const popularityScore = event.popularity;

        var icons = {
          red: {
            icon: 'images/red_pointer.png'
          },
          orange: {
            icon: 'images/orange_pointer.png'
          },
          yellow: {
            icon: 'images/yellow_pointer.png'
          }
        };

        if (popularityScore >= 140) {
          eventIcon = icons.red;
        } else if (popularityScore >= 100) {
          eventIcon = icons.orange;
        } else {
          eventIcon = icons.yellow;
        }
      }

      function clearMarkers() {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
      }

      function addMarker(event) {
        const latLng = {
          lat: parseFloat(event.latitude),
          lng: parseFloat(event.longitude)
        };

        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: eventIcon.icon
        });

        marker.addListener('click', () => {
          createInfoWindow(marker, event);
        });

        markers.push(marker);
      }

      function createInfoWindow(marker, event) {
        if (infowindow) infowindow.close();

        const contentString = `
        <div class="infowindow">
          <h3>Venue Name:${event.venue_name}</h3>
          <h3>Event Name:${event.title}</h3>
          <h3>Event Start Time:${event.start_time}</h3>
          <h3>Event Finish Time:${event.stop_time}</h3>
          <h3>Popularity Score:${event.popularity}</h3>
          <h3>Event Type:${event.categories.category[0].id}</h3>
          <a ui-sref="venuesShow({ id: '${event.venue_id}' })">Show More</a>
        </div>
        `;

        const compiledContent = $compile(contentString)($scope);

        infowindow = new google.maps.InfoWindow({
          content: compiledContent[0]
        });

        infowindow.open(map, marker);
      }
    }
  };

  return directive;
}

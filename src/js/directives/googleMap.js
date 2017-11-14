/* global google:ignore */

angular
  .module('wdi-project-3')
  .directive('googleMap', googleMap);

let events = null;
let newEvents = null;
let markers = [];
let map = null;
let infowindow = null;
let APIOffset = 0;
let eventIcon = null;
let searchedCategories = null;
let searchedRadius = null;
let searchedLat = null;
let searchedLng = null;

googleMap.$inject = ['$window', '$http', 'API', '$rootScope'];
function googleMap($window, $http, API, $rootScope) {
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
      });


      map = new $window.google.maps.Map(element[0], {
        zoom: 13,
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
              // console.log(event);
              setIcon(event);
              addMarker(event);
            });
          });
      }

      $rootScope.$on('changeCategories', (e, selectedCategories) => {
        searchedCategories=selectedCategories;
        console.log('search categories =',searchedCategories);
      });
      $rootScope.$on('changeRadius', (e, selectedRadius) => {
        searchedRadius=selectedRadius;
        console.log('search radius =',searchedRadius);
      });
      $rootScope.$on('changeSearchLat', (e, Lat) => {
        searchedLat=Lat;
        console.log('search Lat =',searchedLat);
      });
      $rootScope.$on('changeSearchLng', (e, Lng) => {
        searchedLng=Lng;
        console.log('search Lng =',searchedLng);
        getEventsAfterSearch();
      });

      function getEventsAfterSearch() {
        clearMarkers();
        $http
          .get(`${API}/getEvents/${APIOffset}/${searchedCategories}/${searchedRadius}/${searchedLat}/${searchedLng}`)
          .then(response => {
            APIOffset = APIOffset + 50;

            newEvents = response.data.events.event;

            newEvents.forEach((event) => {
              // console.log(event);
              setIcon(event);
              addMarker(event);
            });
          });
      }


      function setIcon(event) {
        //get the type of event from API
        const type = event.categories.category[0].id;

        var icons = {
          sport: {
            icon: 'images/sport_pointer.png'
          },
          music: {
            icon: 'images/concert_pointer.png'
          },
          performing_arts: {
            icon: 'images/theatre_pointer.png'
          },
          comedy: {
            icon: 'images/comedy_pointer.png'
          },
          general: {
            icon: 'images/blank_pointer.png'
          }
        };
        //if event is music assign music logo
        if (type === 'sport') {
          eventIcon = icons.sport;
        } else if (type === 'music') {
          eventIcon = icons.music;
        } else if  (type === 'performing_arts') {
          eventIcon = icons.performing_arts;
        } else if  (type === 'comedy') {
          eventIcon = icons.comedy;
        } else if  (type === 'family_fun_kids') {
          eventIcon = icons.performing_arts;
        }  else if  (type === 'festivals_parades') {
          eventIcon = icons.music;
        } else {
          eventIcon = icons.general;
        }

      }

      function clearMarkers() {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
      }

      function addMarker(event){

        const latLng = { lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) };


        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: eventIcon.icon
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
            <h3>Venue Name:${event.venue_name}</h3>
            <h3>Event Name:${event.title}</h3>
            <h3>Event Start Time:${event.start_time}</h3>
            <h3>Event Finish Time:${event.stop_time}</h3>
            <h3>Popularity Score:${event.popularity}</h3>
            <h3>Event Type:${event.categories.category[0].id}</h3>
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

angular.module('wdi-project-3').directive('googleMapShow', googleMapShow);

googleMapShow.$inject = ['$window', '$timeout'];
function googleMapShow($window, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="mini-map"></div>',
    scope: {
      center: '='
    },
    link(scope, element) {
      $timeout(initMap, 1000);

      function initMap() {
        console.log(scope.center);
        const map = new $window.google.maps.Map(element[0], {
          zoom: 13,
          center: scope.center,
          scrollwheel: false,
          draggable: true
        });

        new $window.google.maps.Marker({
          position: scope.center,
          map: map,
          animation: $window.google.maps.Animation.DROP,
          icon: 'images/blue_pointer.png'
        });

        var panorama = new $window.google.maps.StreetViewPanorama(
          document.getElementById('pano'),
          {
            position: scope.center,
            pov: {
              heading: 34,
              pitch: 10
            }
          }
        );
        map.setStreetView(panorama);
      }
    }
  };
}

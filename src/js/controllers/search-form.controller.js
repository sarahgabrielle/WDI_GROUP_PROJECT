angular
  .module('wdi-project-3')
  .controller('searchCtrl', searchCtrl);

searchCtrl.$inject = ['$http', '$rootScope'];
function searchCtrl($http, $rootScope) {

  const vm = this;

  vm.submit = search;
  vm.pushToArray = pushToArray;
  vm.selectedCategories = ['music','sports', 'performing_arts', 'festivals_parades', 'comedy'];
  vm.radiusOptions = [{value: 5},{value: 10},{value: 15},{value: 20}];
  vm.selectedRadius = {};
  vm.categories=[{
    name: 'Live Music Events',
    id: 'music'
  },{
    name: 'Sports Events',
    id: 'sports'
  }, {
    name: 'Theatres',
    id: 'performing_arts'
  }, {
    name: 'Festivals/Parades',
    id: 'festivals_parades'
  }, {
    name: 'Live Comedy',
    id: 'comedy'
  }];
  vm.address = '';
  vm.latLng = {lat: 51.507602, lng: -0.127816};
  vm.categoriesForUrl = null;

  function search() {
    vm.categoriesForUrl = vm.selectedCategories.toString();
    getLatLng();
    broadcastSearchCriteria();
  }

  function broadcastSearchCriteria() {
    $rootScope.$broadcast('changeCategories', vm.categoriesForUrl);
    $rootScope.$broadcast('changeRadius', vm.selectedRadius);
    $rootScope.$broadcast('changeSearchLat', vm.latLng.lat);
    $rootScope.$broadcast('changeSearchLng', vm.latLng.lng);
  }

  function getLatLng() {
    const addressForUrl = vm.address.replace(/ /g,'+');
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressForUrl}&region=uk&key=AIzaSyCyVCnwBcFJfJ2e37W7t4y9rjDO7qRjQYM`;

    $http({
      url: `${searchUrl}`,
      method: 'GET',
      skipAuthorization: true
    })
      .then((response) => {
        vm.latLng = response.data.results[0].geometry.location;
        $rootScope.$broadcast('changeMapCenter', vm.latLng);
      });
  }

  function pushToArray(category) {
    if (vm.selectedCategories.includes(category)) {
      vm.selectedCategories.splice(vm.selectedCategories.indexOf(category), 1);
    } else {
      vm.selectedCategories.push(category);
    }
  }
}

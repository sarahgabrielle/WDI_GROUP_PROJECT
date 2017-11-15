angular
  .module('wdi-project-3')
  .controller('searchCtrl', searchCtrl);

searchCtrl.$inject = ['$http', '$rootScope', '$scope', '$state'];

function searchCtrl($http, $rootScope, $scope, $state) {

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
  vm.closeNav = closeNav;
  vm.openNav = openNav;


  function search() {
    vm.categoriesForUrl = vm.selectedCategories.toString();
    getLatLng();
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
        vm.lat = parseFloat(vm.latLng.lat);
        vm.lng = parseFloat(vm.latLng.lng);
        $rootScope.$broadcast('changeCategories', vm.categoriesForUrl);
        $rootScope.$broadcast('changeRadius', vm.selectedRadius.radius.value);
        $rootScope.$broadcast('changeSearchLat', vm.lat);
        $rootScope.$broadcast('changeSearchLng', vm.lng);

      });
  }

  function pushToArray(category) {
    if (vm.selectedCategories.includes(category)) {
      vm.selectedCategories.splice(vm.selectedCategories.indexOf(category), 1);
    } else {
      vm.selectedCategories.push(category);
    }
  }

  // $rootScope.$on('refreshForm', () => {
  //   refreshForm();
  // });

  function openNav() {
    //why doesn't this work seems it should be the angular way of doing this from googling?
    // angular.element(document.querySelector('#mySidenav')).style.width = '250px';
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('map').style.opacity = '0.4';
  }

  function closeNav() {
    // angular.element(document.querySelector('#mySidenav')).style.width = '0';
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('map').style.opacity = '1';
    
    // $state.reload();

    // vm.$setPristine();
    // vm.$setUntouched();

    // $scope.$apply(function() {
    //   vm.selectedRadius = {};
    //   vm.selectedCategories = ['music','sports', 'performing_arts', 'festivals_parades', 'comedy'];
    //   vm.address = '';
    //   vm.latLng = {lat: 51.507602, lng: -0.127816};
    // });

  }

}

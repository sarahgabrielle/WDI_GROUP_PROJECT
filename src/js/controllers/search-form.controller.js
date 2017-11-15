angular
  .module('wdi-project-3')
  .controller('searchCtrl', searchCtrl);

searchCtrl.$inject = ['$http', '$rootScope', '$scope', '$state'];

function searchCtrl($http, $rootScope, $scope, $state) {

  const vm = this;

  vm.submit = search;
  vm.pushToArray = pushToArray;
  vm.radiusOptions = [{value: 5},{value: 10},{value: 15},{value: 20}];
  vm.selectedRadius = {};
  vm.categories=[{
    name: 'Live Music Events',
    id: 'music',
    value: true
  },{
    name: 'Sports Events',
    id: 'sports',
    value: true
  }, {
    name: 'Theatres',
    id: 'performing_arts',
    value: true
  }, {
    name: 'Festivals/Parades',
    id: 'festivals_parades',
    value: true
  }, {
    name: 'Live Comedy',
    id: 'comedy',
    value: true
  }];
  vm.selectedCategories = [];
  vm.address = '';
  vm.latLng = {lat: 51.507602, lng: -0.127816};
  vm.categoriesForUrl = null;
  vm.closeNav = closeNav;
  vm.openNav = openNav;


  function search() {
    getLatLng();

  }

  function getLatLng() {
    const addressForUrl = vm.address.replace(/ /g,'+');
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressForUrl}&region=gb&key=AIzaSyCyVCnwBcFJfJ2e37W7t4y9rjDO7qRjQYM`;

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
        console.log(vm.categories);
        vm.categoriesForUrl = vm.selectedCategories.toString();
        $rootScope.$broadcast('changeCategories', vm.categoriesForUrl);
        $rootScope.$broadcast('changeRadius', vm.selectedRadius.radius.value);
        $rootScope.$broadcast('changeSearchLat', vm.lat);
        $rootScope.$broadcast('changeSearchLng', vm.lng);
        vm.selectedCategories = [];
        vm.selectedRadius = {};
        vm.address = '';

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

  function closeNav(form) {
    // angular.element(document.querySelector('#mySidenav')).style.width = '0';
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('map').style.opacity = '1';

    // $state.reload();


    // form.$setPristine();
    // form.$setUntouched();

    // $scope.$apply(function() {
    //   vm.selectedRadius = {};
    //   vm.selectedCategories = ['music','sports', 'performing_arts', 'festivals_parades', 'comedy'];
    //   vm.address = '';
    //   vm.latLng = {lat: 51.507602, lng: -0.127816};
    // });

  }

}

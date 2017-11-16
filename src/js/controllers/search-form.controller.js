angular.module('wdi-project-3').controller('searchCtrl', searchCtrl);

searchCtrl.$inject = ['$http', '$rootScope'];
function searchCtrl($http, $rootScope) {
  const vm = this;

  vm.openNav = openNav;
  vm.closeNav = closeNav;
  vm.closeCancelNav = closeCancelNav;
  vm.submit = search;
  vm.pushToArray = pushToArray;
  vm.selectedCategories = [
    'music',
    'sports',
    'performing_arts',
    'festivals_parades',
    'comedy'
  ];
  vm.radiusOptions = [
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 20 }
  ];
  // vm.radiusOptions = [5,10,15,20];
  vm.selectedRadius = { value: 5 };
  vm.categories = [
    {
      name: 'Live Music Events',
      id: 'music'
    },
    {
      name: 'Sports Events',
      id: 'sports'
    },
    {
      name: 'Theatres',
      id: 'performing_arts'
    },
    {
      name: 'Festivals/Parades',
      id: 'festivals_parades'
    },
    {
      name: 'Live Comedy',
      id: 'comedy'
    }
  ];
  vm.address = '';
  vm.latLng = { lat: 51.507602, lng: -0.127816 };
  vm.categoriesForUrl = null;

  function search() {
    vm.categoriesForUrl = vm.selectedCategories.toString();

    getLatLng();
  }

  function getLatLng() {
    const addressForUrl = vm.address.replace(/ /g, '+');
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${
      addressForUrl
    }&region=uk&key=AIzaSyCyVCnwBcFJfJ2e37W7t4y9rjDO7qRjQYM`;

    $http({
      url: `${searchUrl}`,
      method: 'GET',
      skipAuthorization: true
    }).then(response => {
      vm.latLng = response.data.results[0].geometry.location;
      $rootScope.$broadcast('changeMapCenter', vm.latLng);
      vm.lat = parseFloat(vm.latLng.lat);
      vm.lng = parseFloat(vm.latLng.lng);
      console.log(vm.selectedRadius.value.value);

      if (!vm.selectedRadius.value.value) {
        vm.selectedRadius.value = { value: 5 };

        $rootScope.$broadcast('changeRadius', vm.selectedRadius.value.value);
      } else {
        $rootScope.$broadcast('changeRadius', vm.selectedRadius.value.value);
      }
      $rootScope.$broadcast('changeCategories', vm.categoriesForUrl);
      $rootScope.$broadcast('changeSearchLat', vm.lat);
      $rootScope.$broadcast('changeSearchLng', vm.lng);
      vm.selectedCategories = [
        'music',
        'sports',
        'performing_arts',
        'festivals_parades',
        'comedy'
      ];
      vm.address = '';
      vm.selectedRadius = { value: 5 };
    });
  }

  function pushToArray(category) {
    console.log(category);
    if (vm.selectedCategories.includes(category)) {
      vm.selectedCategories.splice(vm.selectedCategories.indexOf(category), 1);
    } else {
      vm.selectedCategories.push(category);
    }
    console.log(vm.selectedCategories);
  }

  function openNav() {
    //why doesn't this work seems it should be the angular way of doing this from googling?
    // angular.element(document.querySelector('#mySidenav')).style.width = '250px';
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('map').style.opacity = '0.4';
  }

  function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('map').style.opacity = '1';
  }

  function closeCancelNav() {
    vm.selectedCategories = [
      'music',
      'sports',
      'performing_arts',
      'festivals_parades',
      'comedy'
    ];
    vm.address = '';
    vm.selectedRadius = { value: 5 };
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('map').style.opacity = '1';
  }
}

angular
  .module('wdi-project-3', [
    'ui.router',
    'ngResource',
    'satellizer',
    'angular-filepicker',
    'angular-loading-bar'
  ])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
  ])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
  cfpLoadingBarProvider.includeSpinner = false;
}]);



// function openNav() {
//   //why doesn't this work seems it should be the angular way of doing this from googling?
//   // angular.element(document.querySelector('#mySidenav')).style.width = '250px';
//   document.getElementById('mySidenav').style.width = '250px';
//   document.getElementById('map').style.opacity = '0.4';
// }
//
// function closeNav() {
//   // angular.element(document.querySelector('#mySidenav')).style.width = '0';
//   document.getElementById('mySidenav').style.width = '0';
//   document.getElementById('map').style.opacity = '1';
//   // $rootScope.$broadcast('refreshForm');
// }

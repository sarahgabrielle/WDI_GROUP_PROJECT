angular
  .module('wdi-project-3', [
    'ui.router',
    'ngResource',
    'satellizer',
    'angular-filepicker',
    'angular-loading-bar',
    'ngRateIt'
  ])
  .config([
    '$httpProvider',
    function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);

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
  ])
  .config([
    'cfpLoadingBarProvider',
    function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
      cfpLoadingBarProvider.barTemplate =
        '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
    }
  ]);

angular
  .module('wdi-project-3')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/statics/home.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/authentications/register.html',
      controller: 'registerCtrl as vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/authentications/login.html',
      controller: 'loginCtrl as vm'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'usersShowCtrl as vm'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'js/views/map.html'
    })
    .state('edit', {
      url: '/users/:id/edit',
      templateUrl: 'js/views/users/edit.html',
      controller: 'usersEditCtrl as vm'
    })
    .state('venuesShow', {
      url: '/venues/:id',
      templateUrl: 'js/views/venues.html',
      controller: 'venuesShow as vm'
    });

  $urlRouterProvider.otherwise('/');
}

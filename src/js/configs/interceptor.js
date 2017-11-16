angular.module('wdi-project-3').config(Interceptor);

Interceptor.$inject = ['$httpProvider'];
function Interceptor($httpProvider) {
  $httpProvider.interceptors.push('errorHandler');
}

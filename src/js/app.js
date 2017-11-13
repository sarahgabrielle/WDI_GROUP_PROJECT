angular
  .module('wdi-project-3', [
    'ui.router',
    'ngResource',
    'satellizer'
  ]);


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
}

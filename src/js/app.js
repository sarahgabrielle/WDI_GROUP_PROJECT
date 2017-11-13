angular
  .module('wdi-project-3', [
    'ui.router',
    'ngResource',
    'satellizer'
  ]);


function openNav() {
  document.getElementById('mySidenav').style.width = '250px';
  document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
  document.body.style.backgroundColor = 'white';
}

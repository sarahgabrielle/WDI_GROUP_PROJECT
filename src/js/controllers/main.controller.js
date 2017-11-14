angular
  .module('wdi-project-3')
  .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$state', '$rootScope', 'currentUserService'];
function mainCtrl($state, $rootScope, currentUserService) {
  const vm = this;

  vm.logout = logout;
  vm.showLoginModal = false;
  vm.showRegisterModal = false;
  vm.showMenu = false;

  $rootScope.$on('loggedIn', () => {
    vm.user = currentUserService.currentUser;
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('home');
  });

  function logout() {
    currentUserService.removeUser();
  }

}

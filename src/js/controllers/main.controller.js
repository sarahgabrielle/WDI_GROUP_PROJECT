angular.module('wdi-project-3').controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$state', '$rootScope', 'currentUserService', '$timeout'];
function mainCtrl($state, $rootScope, currentUserService, $timeout) {
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

  $rootScope.$on('error', (e, err) => {
    if (err.status === 401) {
      $state.go('login');
      $rootScope.$broadcast('displayMessage', {
        type: 'danger',
        content: err.data.message
      });
    }
  });

  $rootScope.$on('displayMessage', (e, message) => {
    vm.message = message.content;
    vm.messageType = message.type;

    $timeout(closeMessage, 1500);
  });

  function logout() {
    currentUserService.removeUser();
    $rootScope.$broadcast('displayMessage', {
      type: 'info',
      content: 'You have successfully logged out.'
    });
  }

  function closeMessage() {
    vm.message = null;
    vm.messageType = null;
  }
}

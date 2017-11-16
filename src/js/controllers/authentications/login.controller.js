angular.module('wdi-project-3').controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$auth', '$state', 'currentUserService', '$scope'];
function loginCtrl($auth, $state, currentUserService, $scope) {
  const vm = this;
  vm.showModal = false;
  vm.submitForm = login;

  if (!$scope.$parent.main.showLoginModal) {
    $scope.$parent.main.showLoginModal = true;
  }

  function login() {
    $auth.login(vm.user).then(() => {
      currentUserService.getUser();
      $state.go('map');
    });
  }
}

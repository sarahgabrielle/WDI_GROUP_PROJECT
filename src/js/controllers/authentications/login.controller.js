angular.module('wdi-project-3').controller('loginCtrl', loginCtrl);

loginCtrl.$inject = [
  '$auth',
  '$state',
  'currentUserService',
  '$scope',
  '$rootScope'
];
function loginCtrl($auth, $state, currentUserService, $scope, $rootScope) {
  const vm = this;
  vm.showModal = false;
  vm.submitForm = login;

  if (!$scope.$parent.main.showLoginModal) {
    $scope.$parent.main.showLoginModal = true;
  }

  function login() {
    $auth
      .login(vm.user)
      .then(res => {
        if (res.status === 200) {
          currentUserService.getUser();
          $state.go('map');
          $rootScope.$broadcast('displayMessage', {
            type: 'success',
            content: `You have successfully logged in ${
              res.data.user.username
            }!`
          });
        }
      })
      .catch(() => {
        $rootScope.$broadcast('displayMessage', {
          type: 'warning',
          content: 'Incorrect Credentials.'
        });
      });
  }
}

angular.module('wdi-project-3').controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = ['$stateParams', '$state', 'User', '$scope'];
function usersShowCtrl($stateParams, $state, User, $scope) {
  const vm = this;
  vm.showProfileModal = false;
  vm.editProfileModal = false;

  if (!$scope.$parent.main.showProfileModal) {
    $scope.$parent.main.showProfileModal = true;
  }

  vm.user = User.get($stateParams);
  vm.delete = userDelete;

  function userDelete() {
    User.delete({ id: vm.user.id }).$promise.then(() => {
      $state.go('home');
    });
  }
}

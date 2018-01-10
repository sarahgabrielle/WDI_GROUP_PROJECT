angular.module('wdi-project-3').controller('usersEditCtrl', usersEditCtrl);

usersEditCtrl.$inject = ['$stateParams', '$state', 'User', '$window', '$scope'];
function usersEditCtrl($stateParams, $state, User, $window, $scope) {
  const vm = this;

  vm.user = User.get($stateParams);
  vm.submit = userEdit;

  if (!$scope.$parent.main.showEditModal) {
    $scope.$parent.main.showEditModal = true;
  }

  vm.pickFile = e => {
    e.preventDefault();
    $window.filepicker.pick({ mimetype: 'image/*' }, Blob => {
      if (Blob && Blob.url) {
        vm.user.image = Blob.url;
        $scope.$apply();
      }
    });
  };

  function userEdit() {
    User.update({ id: $stateParams.id }, vm.user).$promise.then(() => {
      $state.go('usersShow', { id: $stateParams.id });
    });
  }
}

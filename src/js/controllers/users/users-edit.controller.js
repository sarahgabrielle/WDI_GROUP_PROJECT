angular
  .module('wdi-project-3')
  .controller('usersEditCtrl', usersEditCtrl);

usersEditCtrl.$inject = ['$stateParams', '$state', 'User', 'filepickerService', '$scope'];
function usersEditCtrl($stateParams, $state, User, filepickerService, $scope){
  const vm = this;

  vm.user = User.get($stateParams);
  vm.submit = userEdit;

  vm.pickFile = (e) => {
  e.preventDefault();
  filepickerService.pick(
    {mimetype: 'image/*'},
    (Blob) => {
      if (Blob && Blob.url) {
        vm.user.image = Blob.url;
        $scope.$apply();
      }
    }
  );
};

  function userEdit(){
    User
      .update({ id: $stateParams.id }, vm.user)
      .$promise
      .then(() => {
        $state.go('usersShow', { id: $stateParams.id });
      });
  }
}

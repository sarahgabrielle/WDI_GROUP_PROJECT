angular
  .module('wdi-project-3')
  .controller('usersEditCtrl', usersEditCtrl);

usersEditCtrl.$inject = ['$stateParams', '$state', 'User'];
function usersEditCtrl($stateParams, $state, User){
  const vm = this;

  vm.user = User.get($stateParams);
  vm.submit = userEdit;

  function userEdit(){
    User
      .update({ id: $stateParams.id }, vm.user)
      .$promise
      .then(() => {
        $state.go('usersShow', { id: $stateParams.id });
      });
  }
}

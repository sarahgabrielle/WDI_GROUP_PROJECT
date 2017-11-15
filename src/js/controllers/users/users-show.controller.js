angular
  .module('wdi-project-3')
  .controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = ['$stateParams', '$state', 'User'];
function usersShowCtrl($stateParams, $state, User) {

  const vm = this;
  vm.showProfileModal = false;
  vm.editProfileModal = false;
  vm.user = User.get($stateParams);
  vm.delete = userDelete;

  function userDelete() {
    User
      .delete({ id: vm.user.id})
      .$promise
      .then(() => {
        $state.go('home');
      });
  }
}

angular
  .module('wdi-project-3')
  .controller('registerCtrl', registerCtrl);

registerCtrl.$inject = ['$auth', '$state', 'currentUserService'];
function registerCtrl($auth, $state, currentUserService) {
  const vm = this;

  vm.showModal = false;
  vm.submitForm = register;

  function register() {
    $auth
      .signup(vm.user)
      .then(() => $auth.login(vm.user))
      .then(() => {
        currentUserService.getUser();
        $state.go('usersIndex');
      });
  }
}

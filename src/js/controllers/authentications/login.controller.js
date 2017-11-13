angular
  .module('wdi-project-3')
  .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$auth', '$state', 'currentUserService'];
function loginCtrl($auth, $state, currentUserService) {
  const vm = this;

  vm.showModal = false;
  vm.submitForm = login;

  function login() {
    $auth
      .login(vm.user)
      .then(() => {
        currentUserService.getUser();
        $state.go('home');
      });
  }
}

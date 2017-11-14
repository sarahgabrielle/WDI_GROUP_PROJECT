angular
  .module('wdi-project-3')
  .controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = ['$stateParams', '$state', 'User'];
function usersShowCtrl($stateParams, $state, User) {
  const vm = this;
  console.log(vm);

  vm.user = User.get($stateParams);

  vm.submit = user => {
    User
      .update({ id: user.userId}, user)
      .$promise
      .then(user => {
        $state.go('usersShow', {id: user.userId });
      });
  };

  vm.delete = user => {
    User
      .remove({ id: user.userId})
      .$promise
      .then(() => {
        $state.go('home');
      });
  };
}

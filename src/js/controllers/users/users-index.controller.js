angular
  .module('wdi-project-3')
  .controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = [
  'User'
];
function usersShowCtrl(
  User) {
  const vm = this;

  vm.users = User.query();

  //change this code so that it only shows the individuals profile details.
}

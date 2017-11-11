angular
  .module('wdi-project-3')
  .controller('usersIndexCtrl', usersIndexCtrl);

usersIndexCtrl.$inject = [
  'User'
];
function usersIndexCtrl(
  User) {
  const vm = this;

  vm.users = User.query();
}

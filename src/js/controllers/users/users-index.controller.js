angular
  .module('wdi-project-3')
  .controller('usersShowCtrl', usersShowCtrl);

usersShowCtrl.$inject = ['$stateParams', '$state', 'User', '$scope'];
function usersShowCtrl($stateParams, $state, User, $scope) {
  const vm = this;

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

  $scope.navigate = function(user){
    if(!user) {
      // .then(() => {
      $state.go('home');
      // });
    } else {
      $state.go('map');
    }


  };

}

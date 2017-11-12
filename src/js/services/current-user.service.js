angular
  .module('wdi-project-3')
  .service('currentUserService', currentUserService);

currentUserService.$inject = ['$auth', '$rootScope', 'User'];
function currentUserService($auth, $rootScope, User) {
  const self = this;

  self.getUser = () => {
    const decoded = $auth.getPayload();
    if (decoded) {
      console.log('this is decoded', decoded);
      User
        .get({ id: decoded._id })
        .$promise
        .then(data => {
          self.currentUser = data;
          $rootScope.$broadcast('loggedIn');
        });
    }
  };

  self.removeUser = () => {
    self.currentUser = null;
    $auth.logout();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}

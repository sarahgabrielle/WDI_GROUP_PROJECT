angular.module('wdi-project-3').controller('venuesShowCtrl', venuesShowCtrl);

venuesShowCtrl.$inject = ['Venue', '$stateParams'];
function venuesShowCtrl(Venue, $stateParams) {
  const vm = this;

  vm.commentCreate = commentCreate;
  vm.commentDelete = commentDelete;
  getTheVenue();

  function getTheVenue() {
    Venue.get({ id: $stateParams.id }).$promise.then(venue => {
      vm.venue = venue;
    });
  }

  function commentCreate() {
    Venue.createComment({ id: $stateParams.id }, vm.venue).$promise.then(() => {
      getTheVenue();
      vm.comment = null;
    });
  }

  function commentDelete(comment) {
    Venue.deleteComment({
      id: $stateParams.id,
      commentId: comment.id
    }).$promise.then(() => {
      getTheVenue();
    });
  }
}

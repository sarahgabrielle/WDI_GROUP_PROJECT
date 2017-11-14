angular
  .module('wdi-project-3')
  .controller('reviewsShowCtrl', reviewsShowCtrl);

reviewsShowCtrl.$inject = ['Review', '$stateParams', '$rootScope', '$state'];
function reviewsShowCtrl(Review, $stateParams, $rootScope, $state) {
  const vm = this;

  vm.commentCreate = commentCreate;
  vm.commentDelete = commentDelete;
  getTheGroup();

  function getTheGroup() {
    Review
      .get({ id: $stateParams.id })
      .$promise
      .then(review => {
        vm.review = review;
      });
  }

  function commentCreate() {
    Review
      .createComment({ id: $stateParams.id }, vm.review)
      .$promise
      .then(() => {
        getTheGroup();
        vm.comment = null;
      });
  }

  function commentDelete(comment) {
    Review
      .deleteComment({ id: $stateParams.id, commentId: comment.id })
      .$promise
      .then(() => {
        getTheGroup();
        // console.log('clicked');
      });
  }
}

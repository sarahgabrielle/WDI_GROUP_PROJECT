angular.module('wdi-project-3').controller('venuesShow', venuesShow);

venuesShow.$inject = ['$stateParams', '$http', 'API', '$rootScope', 'Comment'];
function venuesShow($stateParams, $http, API, $rootScope, Comment) {
  const vm = this;
  console.log($stateParams.id);
  const venueId = $stateParams.id;
  vm.venueName = null;
  vm.venueAddress = null;
  vm.venueRegion = null;
  vm.venuePostCode = null;
  vm.venueLat = null;
  vm.venueLng = null;
  vm.venueImg = null;
  vm.latLng = null;
  vm.commentCreate = commentCreate;
  vm.commentDelete = commentDelete;

  getVenueInfo();
  getComments();

  function getVenueInfo() {
    $http.get(`${API}/getVenue/${venueId}`).then(response => {
      console.log(response);
      vm.venueName = response.data.name;
      vm.venueAddress = response.data.address;
      vm.venueCity = response.data.city;
      vm.venueRegion = response.data.region;
      vm.venuePostCode = response.data.postal_code;
      vm.venueCountry = response.data.country;
      vm.venueLat = response.data.latitude;
      vm.venueLng = response.data.longitude;
      vm.latLng = {
        lat: parseFloat(response.data.latitude),
        lng: parseFloat(response.data.longitude)
      };
      $rootScope.$broadcast('viewVenueMap', vm.latLng);
    });
  }

  function getComments() {
    Comment.fetchComments({ id: $stateParams.id }).$promise.then(comments => {
      vm.comments = comments;
      console.log(comments);
    });
  }

  function commentCreate() {
    vm.comment.venueId = venueId;

    Comment.save(vm.comment).$promise.then(() => {
      getComments();
      vm.comment = null;
    });
  }

  function commentDelete(comment) {
    console.log('hit');
    Comment.remove({ id: comment._id }).$promise.then(() => {
      console.log('done');
      vm.comments = Comment.fetchComments({ id: $stateParams.id });
    });
  }
}

// comments
// Comment.query({ venueId: $stateParams.id })

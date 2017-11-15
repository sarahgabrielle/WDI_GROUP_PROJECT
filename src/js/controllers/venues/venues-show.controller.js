angular
  .module('wdi-project-3')
  .controller('venuesShow', venuesShow);


venuesShow.$inject = [ '$stateParams', '$http', 'API', '$rootScope', 'Comment'];
function venuesShow($stateParams, $http, API, $rootScope, Comment) {
  const vm = this;
  console.log($stateParams.id);
  const venueId= $stateParams.id;
  vm.venueName = null;
  vm.venueAddress = null;
  vm.venueRegion= null;
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
    $http
      .get(`${API}/getVenue/${venueId}`)
      .then(response => {
        console.log(response);
        vm.venueName = response.data.name;
        vm.venueAddress = response.data.address;
        vm.venueRegion= response.data.region_abbr;
        vm.venuePostCode = response.data.postal_code;
        vm.venueLat = response.data.latitude;
        vm.venueLng = response.data.longitude;
        vm.latLng = {lat: parseFloat(response.data.latitude), lng: parseFloat(response.data.longitude)};
        $rootScope.$broadcast('viewVenueMap', vm.latLng);
        if (response.data.images === null) {
          vm.venueImg = '/images/building-placeholder.png';
        } else if (response.data.images.image.medium !== undefined) {
          vm.venueImg = `http:${response.data.images.image.medium.url}`;
        } else if (response.data.images.image[0].medium !== undefined) {
          vm.venueImg = `http:${response.data.images.image[0].medium.url}`;
        } else {
          vm.venueImg = '/images/building-placeholder.png';
        }


      });
  }

  function getComments() {
    Comment
      .fetchComments({id: $stateParams.id})
      .$promise
      .then((comments) => {
        vm.comments=comments;
        console.log(comments);
      });
  }

  function commentCreate() {
    vm.comment.venueId = venueId;

    Comment
      .save(vm.comment)
      .$promise
      .then(() => {
        getComments();
        vm.comment = null;
      });
  }

  function commentDelete(comment) {
    console.log('hit');
    Comment
      .remove({ id: comment._id})
      .$promise
      .then(() => {
        console.log('done');
        vm.comments= Comment.fetchComments({id: $stateParams.id});
      });
  }

}





// comments
// Comment.query({ venueId: $stateParams.id })

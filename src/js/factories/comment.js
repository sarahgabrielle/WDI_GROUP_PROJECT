angular
  .module('wdi-project-3')
  .factory('Comment', Comment);

Comment.$inject = ['API','$resource'];
function Comment(API,$resource){
  return $resource(`${API}/comments/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' },
    'fetchComments': {method: 'GET', url: `${API}/getVenue/:id/comments`, isArray: true}
  });
}

angular
  .module('wdi-project-3')
  .factory('Venue', Venue);

Venue.$inject = [
  'API',
  '$resource'
];

function Venue(
  API,
  $resource
){
  return $resource(`${API}/venues/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' },
    'addComment': { url: `${API}/venues/:id/comments`, id: '@_id', method: 'POST' },
    'deleteComment': { url: `${API}/venues/:id/comments/:commentId`, id: '@_id', commentId: '@_id', method: 'DELETE' }
  });
}

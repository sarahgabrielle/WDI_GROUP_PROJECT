angular
.module('wdi-project-3')
.config(Filestack);

Filestack.$inject = ['filepickerProvider'];
function Filestack(filepickerProvider) {
  filepickerProvider.setKey('AY8qYP0ygQIylD2RqBqlVz');
}

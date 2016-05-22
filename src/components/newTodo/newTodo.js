var angular = require('angular');
var newTodo = angular.module('app.components.newTodo', []);

newTodo.directive('newTodo', function(todosService) {
  return {
    restrict: 'AE',
    transclude: true,
    replace: true,
    template: require('./newTodo.tpl.html'),
    link: function($scope) {
      $scope.addTodo = function($event) {
        if ($event.which === 13) {
          todosService.addItem({
            name: $event.target.value,
            completed: false
          });
          $event.target.value = "";
          $event.target.blur();
        }
      }
    }
  };
})

module.exports = newTodo;
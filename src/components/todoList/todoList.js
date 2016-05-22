var angular = require('angular');
var todoList = angular.module('app.components.todoList', []);

todoList.directive('focusOn', function($timeout) {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      focusOn: '@'
    },
    link: function($scope, $element) {
      $scope.$watch('focusOn', function(focus) {
        if (focus === 'true') {
          $timeout(function() {
            $element[0].focus();
          });
        }
      });
    }
  }
});

todoList.directive('todoList', function($rootScope, todosService) {
  return {
    restrict: 'AE',
    transclude: true,
    replace: true,
    scope: {
      list: '=?'
    },
    template: require('./todoList.tpl.html'),
    link: function($scope) {
      $scope.removeItem = todosService.removeItem;
      $scope.completeItem = function() {
        $rootScope.$emit('todos:reload');
      };
      $scope.editItem = function(item) {
        $scope.editting = (!item) ? null : item;
      }
      $scope.keyUp = function($event) {
        if ($event.which === 13 || $event.which === 27) {
          $scope.editting = null;
        } 
      };
    }
  };
})

module.exports = todoList;
var angular = require('angular');
var utils = angular.module('app.utils', []);

utils.factory('_', function() {
  return require('lodash');
});

utils.factory('todosService', function($rootScope, $state, _) {
  // integrar con un respaldo de datos
  var todos = require('./todos.json');

  var getAll = function() {
    return todos;
  }

  var getActive = function() {
    return _.filter(getAll(), { completed: false });
  };

  var getCompleted = function() {
    return _.filter(getAll(), { completed: true });
  };

  var addItem = function(item) {
    todos.push(item);
    $rootScope.$emit('todos:reload');
  };

  var removeItem = function(item) {
    _.remove(todos, item);
    $rootScope.$emit('todos:reload');
  };

  var clearCompleted = function() {
    _.pullAll(todos, getCompleted());
    $rootScope.$emit('todos:reload');
  }

  var completeAll = function(completed) {
    _.each(todos, function(todo) {
      todo.completed = completed;
    });
    $rootScope.$emit('todos:reload');
  };

  return {
    getAll: getAll,
    getActive: getActive,
    getCompleted: getCompleted,
    addItem: addItem,
    removeItem: removeItem,
    clearCompleted: clearCompleted,
    completeAll: completeAll
  };
});

module.exports = utils;

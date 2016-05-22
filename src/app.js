require('file?name=[name].[ext]!./index.html');
require('file?name=css/[name].[ext]!../node_modules/todomvc-common/base.css');
require('file?name=css/[name].[ext]!../node_modules/todomvc-app-css/index.css');

var _ = require('lodash');
var angular = require('angular');
var utils = require('./utils.js');
var uiRouter = require('angular-ui-router');
var components = require('./components/components.js');

var app = angular.module('app', [uiRouter, utils.name, components.name]);


app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider
    .state('all', {
      url: '/'
    })
    .state('active', {
      url: '/active'
    })
    .state('completed', {
      url: '/completed'
    });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
});


app.run(function($rootScope, todosService, $state) {

  var fetchItems = function($event, toState) {

    if (!toState) {
      toState = $state.current;
    }

    switch (toState.name) {
      case 'all':
        $rootScope.todos = todosService.getAll();
        break;
      case 'active':
        $rootScope.todos = todosService.getActive();
        break;
      case 'completed':
        $rootScope.todos = todosService.getCompleted();
        break;
    }

    $rootScope.allCompleted = ($rootScope.todos.length === todosService.getCompleted().length);
    $rootScope.statename = toState.name;
  };

  $rootScope.$on('$stateChangeSuccess', fetchItems);
  $rootScope.$on('todos:reload', fetchItems);

  $rootScope.clearCompleted = todosService.clearCompleted;
  $rootScope.toggleAll = function() {
    todosService.completeAll($rootScope.allCompleted);
  };
});

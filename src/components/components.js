var angular = require('angular');
var newTodo = require('./newTodo/newTodo.js');
var todoList = require('./todoList/todoList.js');
var components = angular.module('app.components', [newTodo.name, todoList.name]);

module.exports = components;

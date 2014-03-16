// var Yoemberkarma = window.Yoemberkarma = Ember.Application.create();

// [> Order and include as you please. <]
// require('scripts/controllers/*');
// require('scripts/store');
// require('scripts/models/*');
// require('scripts/routes/*');
// require('scripts/views/*');
// require('scripts/router');
window.Todos = Ember.Application.create({
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true
});

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();

// Todos.Store = DS.Store.extend({
  // revision: 13,
  // adapter: DS.FixtureAdapter
// });

Todos.Todo = DS.Model.extend({
  name: DS.attr("string"),
  priority: DS.attr("string")
});

Todos.Todo.FIXTURES = [
  {id: 1, name: "Task 1", priority: "high"},
  {id: 2, name: "Task 2", priority: "medium"},
  {id: 3, name: "Task 3", priority: "low"}
];


Todos.Router.map(function() {
  this.resource('todos', { path: '/' }, function() {
    this.route("high");
    this.route("medium");
    this.route("low");
    this.route("search", {path: '/search'});
  });
  this.route("home");
  this.route("about");
});


Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  controllerName: 'TodosSearch',
  model: function() {
    return this.store.find('todo');
  },
  ccc: 13,
  aaa: function() {
    return 12;
  }.property('abc')
});

Todos.TodosHighRoute = Ember.Route.extend({
  controllerName: 'TodosSearch',
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('priority') == 'high';
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});

Todos.TodosMediumRoute = Ember.Route.extend({
  controllerName: 'TodosSearch',
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('priority') == 'medium';
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});

Todos.TodosLowRoute = Ember.Route.extend({
  controllerName: 'TodosSearch',
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('priority') == 'low';
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});

Todos.TodosSearchRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.filter('todo');
  }
  // renderTemplate: function(controller) {
    // this.render('todos/index', {controller: controller});
  // }
  // needs: ['application', 'todos'],
  // queryParams: ['keywords'],
  // post: Ember.computed.alias("controllers.todos.keywords"),
  // keywords: null,
  // key: function() {
    // return "hi";
  // }.property('post'),
  // filteredTodos: function() {
    // var keywords = this.get('keywords');
    // var todos = this.get('model');

    // if (keywords) {
      // // return articles.filterProperty('category', category);
      // return todos.filter('todo', function(todo) {
        // return todo.get('name').indexOf(keywords) > 0;
      // });
    // } else {
      // return todos;
    // }
  // }.property('keywords'),

  // filteredArticles: function() {
    // console.log(">>>");
    // var keywords = this.get('keywords');
    // var todos = this.get('model');

    // if (category) {
      // // return articles.filterProperty('category', category);
      // return todos.filter('todo', function(todo) {
        // return todo.get('name').indexOf(keywords) > 0;
      // });
    // } else {
      // return todos;
    // }
  // }.property('keywords', 'model', 'controllers.todos.keywords')
});

Todos.TodosSearchController = Ember.ArrayController.extend({
  needs: 'todos',
  parentKeywords: Ember.computed.alias('controllers.todos.keywords'),
  // todos: function() {
    // console.log("search model");
    // // return this.get('model');
  // }
  todoCount: function() {
    console.log("todoCount");
    return this.get('filteredTodos').get('length');
  }.property('filteredTodos'),
  inflection: function() {
    var count = this.get('todoCount');
    if (count == 1) {
      return "task";
    };
    return "tasks";
  }.property('todoCount'),
  filteredTodos: function() {
    console.log("filteredTodos");
    var keywords = this.get('parentKeywords');
    var todos = this.get('model');

    if (keywords) {
      return todos.filter(function(todo) {
        return todo.get('name').indexOf(keywords) > -1;
      });
    } else {
      return todos;
    }
  }.property('parentKeywords', '@each.name'),
  priorities: ["high", "medium", "low"],
  keywords: '',
  needs: ['application', 'todos'],
  actions: {
    createTodo: function() {
      var name = this.get('newName');
      var priority = this.get('priority');
      if (!name.trim() || name.length < 3) {
        $('#validation').removeClass('hide');
        return;
      } else {
        $('#validation').addClass('hide');
      };

      var todo = this.store.createRecord('todo', {
        name: name,
        priority: priority
      });
      this.set('newName', '');


      todo.save();
    },
    search: function() {
      this.transitionToRoute('todos.search');
    },
    clearKeywords: function() {
      this.set('keywords', '');
    }
  }
});


Todos.TodoController = Ember.ObjectController.extend({
  actions: {
    removeTodo: function() {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    }
  }
});




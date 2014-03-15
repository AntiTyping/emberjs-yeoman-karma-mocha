window.Todos = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();


Todos.Todo = DS.Model.extend({
  name: DS.attr("string"),
  priority: DS.attr("string")
});

Todos.Todo.FIXTURES = [
  {id: 1, name: "Task 1", priority: "low"},
  {id: 2, name: "Task 2", priority: "low"},
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
console.log("model");
    return this.store.find('todo');
  },
  ccc: 13,
  aaa: function() {
    console.log("aaa");
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
  filteredTodos: function() {
    console.log("search model");
    console.log("init", this.get('parentKeywords'));
    var keywords = this.get('parentKeywords');
    var todos = this.get('model');

    if (keywords) {
      return todos.filter(function(todo) {
        return todo.get('name').indexOf(keywords) > -1;
      });
    } else {
      return todos;
    }
  }.property('parentKeywords', 'model')
});


Todos.TodosController = Ember.ArrayController.extend({
  priorities: ["high", "medium", "low"],
  keywords: '1',
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




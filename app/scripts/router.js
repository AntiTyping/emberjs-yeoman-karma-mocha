Todos.Router.map(function() {
  this.resource('todos', { path: '/' }, function() {
    this.route("high");
    this.route("medium");
    this.route("low");
  });
  this.route("home");
  this.route("about");
});

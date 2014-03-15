describe("Index page", function () {
    it("displays a welcome message", function () {
        Todos.reset();
        visit('/').then(function () {
            find('a.brand').text().should.contain('AngularDo');
        });
    });
    it("displays a welcome messagew", function () {
        Todos.reset();
        visit('/');
        click("a.priority:contains('High')").then(function () {
            debugger;
            find('a.brand').text().should.contain('AngularDo');
        });
    });
});

// describe("ApplicationRoute", function () {
    // describe("model property", function () {
        // it("should have the right number of items", function () {
        // Todos.reset();
        // visit('/').then(function () {
          // debugger;
        // var applicationRoute = Todos.__container__.lookup("route:todos")
            // var model = applicationRoute.model();
            // model.get('length').should.equal(3);
          // });
          // });
    // });
// });


describe('Scenarios:', function() {
  beforeEach(function() {
        Todos.Todo.FIXTURES = [
          {id: 1, name: "Task 1", priority: "high"},
          {id: 2, name: "Medium priority task", priority: "medium"},
          {id: 3, name: "Task 3", priority: "low"}
        ];
      Todos.reset();
      visit('/');
  });

  describe("Navigation", function() {
    it("should have Home link", function() {
      expect($("ul.nav:first li:first").text()).to.equal("Home");
    });

    it("should have About link", function() {
      expect($("ul.nav:first li:last").text()).to.equal("About");
    });
  });

  describe("Task List", function() {
    it('should display list of tasks', function() {
      expect($('tr.task')).to.have.length(3);
    });
  });

  describe("Add a new task", function() {
    describe("when the new task is valid", function() {
      beforeEach(function() {
        Todos.reset();
        visit('/');
        fillIn('.task-name', "New task");
        fillIn('.task-priority', "medium");
        click('button.js-add');
      });

      it("should add it to the list", function() {
        andThen(function() {
          expect($('tr.task:last').text()).to.match(/New task/);
          expect($('tr.task')).to.have.length(4);
        });
      });

      it("should set priority", function() {
        expect($("span.priority:last").text()).to.match(/medium/);
      });

      it('should clear the new task box', function() {
        expect($('.task-name').val()).to.equal('');
      });

      it("should not display an error message", function() {
        expect($('div.alert').hasClass('hide')).to.be.true;
        // expect(element('div.alert').count()).toBe(1);
      });
    });

    describe("when the new task is invalid", function() {
      beforeEach(function() {
        Todos.Todo.FIXTURES = [
          {id: 1, name: "Task 1", priority: "low"},
          {id: 2, name: "Task 2", priority: "low"},
          {id: 3, name: "Task 3", priority: "low"}
        ];
        Todos.reset();
        visit('/');
        fillIn('.task-name', "");
        click('button.js-add');
      });

      it("should leave the task list unchanged", function() {
        expect($('tr.task')).to.have.length(3);
      });

      it("should display an error message", function() {
        expect($('div.alert').hasClass('hide')).to.be.false;
      });
    });
  });

  describe("Mark task as done", function() {
    it("should remove the task from the task list", function() {
      $('button.js-done:last').click();
      expect($('tr.task')).to.have.length(2);
    });
  });

  describe("Filter by priority", function() {
    describe("when high priority is selected", function() {
      beforeEach(function() {
        Todos.Todo.FIXTURES = [
          {id: 1, name: "Task 1", priority: "high"},
          {id: 2, name: "Task 2", priority: "medium"},
          {id: 3, name: "Task 3", priority: "low"}
        ];
        Todos.reset();
        visit('/');
      });

      it("should display only high priority tasks", function() {
        $("a.priority:contains('High')").click();
        expect($('tr.task')).to.have.length(1);
      });

      it("should display number of visible tasks", function() {
        $("a.priority:contains('High')").click();
        expect($(".js-task-counter").text()).to.equal("1 task");
      });
    });

    describe("when medium priority is selected", function() {
      beforeEach(function() {
        Todos.Todo.FIXTURES = [
          {id: 1, name: "Task 1", priority: "high"},
          {id: 2, name: "Task 2", priority: "medium"},
          {id: 3, name: "Task 3", priority: "low"}
        ];
        Todos.reset();
        visit('/');
      });

      it("should display only medium priority tasks", function() {
        $("a.priority:contains('Medium')").click();
        expect($('tr.task')).to.have.length(1);
      });

      it("should display number of visible tasks", function() {
        $("a.priority:contains('Medium')").click();
        expect($(".js-task-counter").text()).to.equal("1 task");
      });
    });

    describe("when low priority is selected", function() {
      beforeEach(function() {
        Todos.Todo.FIXTURES = [
          {id: 1, name: "Task 1", priority: "high"},
          {id: 2, name: "Task 2", priority: "medium"},
          {id: 3, name: "Task 3", priority: "low"}
        ];
        Todos.reset();
        visit('/');
      });

      it("should display only medium priority tasks", function() {
        $("a.priority:contains('Low')").click();
        expect($('tr.task')).to.have.length(1);
      });

      it("should display number of visible tasks", function() {
        $("a.priority:contains('Low')").click();
        expect($(".js-task-counter").text()).to.equal("1 task");
      });
    });

    describe("when no priority is selected", function() {
      beforeEach(function() {
        Todos.Todo.FIXTURES = [
          {id: 1, name: "Task 1", priority: "high"},
          {id: 2, name: "Task 2", priority: "medium"},
          {id: 3, name: "Task 3", priority: "low"}
        ];
        Todos.reset();
        visit('/');
      });

      it("should display all tasks", function() {
        $("a.priority:contains('All')").click();
        expect($('tr.task')).to.have.length(3);
      });

      it("should display number of visible tasks", function() {
        expect($(".js-task-counter").text()).to.equal("3 tasks");
      });
    });
  });

  describe("Task search", function() {
      beforeEach(function() {
        Todos.reset();
        visit('/');
      });

    it("should only display task that match the keyword", function() {
      fillIn(".query-name", "Medium");
      expect($('tr.task')).to.have.length(1);
      expect($('tr.task').text()).to.match(/Medium priority task/);
    });
  });

  describe("Task counter", function() {
    it("should display number of visible tasks", function() {
      expect($(".js-task-counter").text()).to.equal("3 tasks");
    });
  });
});

// describe("Index page", function () {
    // it("displays a welcome message", function () {
        // Todos.reset();
        // visit('/').then(function () {
            // find('a.brand').text().should.contain('AngularDo');
        // });
    // });
    // it("displays a welcome messagew", function () {
        // Todos.reset();
        // visit('/');
        // click("a.priority:contains('High')").then(function () {
            // find('a.brand').text().should.contain('AngularDo');
        // });
    // });

// });

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

// 'use strict';

// describe('Scenarios:', function() {
  // beforeEach(function() {
    // browser().navigateTo('/proxy/');
    // element('table').query(function(table, done) {
      // var children = table.children();
      // if(children.length > 1) {
        // var elements = table.find('button.js-done');
        // elements.click();
      // };
      // done();
    // });
    // input('task.name').enter("Medium priority task");
    // select('task.priority').option("medium");
    // element('button.js-add').click();

    // input('task.name').enter("Low priority task");
    // select('task.priority').option("low");
    // element('button.js-add').click();

    // input('task.name').enter("High priority task");
    // select('task.priority').option("high");
    // element('button.js-add').click();
  // });

  // describe("Navigation", function() {
    // it("should have Home link", function() {
      // expect(element("ul.nav:first li:first").text()).toEqual("Home");
    // });

    // it("should have About link", function() {
      // expect(element("ul.nav:first li:last").text()).toEqual("About");
    // });
  // });

  // describe("Task List", function() {
    // it('should display list of tasks', function() {
      // expect(repeater('tr.task').count()).toBe(3);
    // });

  // });

  // describe("Add a new task", function() {
    // describe("when the new task is valid", function() {
      // beforeEach(function() {
        // input('task.name').enter("New task");
        // select('task.priority').option("medium");
        // element('button.js-add').click();
      // });

      // it("should add it to the list", function() {
        // expect(element('tr.task:last').text()).toMatch(/New task/);
        // expect(repeater('tr.task').count()).toBe(4);
      // });

      // it("should set priority", function() {
        // expect(element("span.priority:last").text()).toMatch(/medium/);
      // });

      // it('should clear the new task box', function() {
        // expect(input('task.name').val()).toEqual('');
      // });
    // });

    // describe("when the new task is invalid", function() {
      // beforeEach(function() {
        // input('task.name').enter("");
        // element('button.js-add').click();
      // });

      // it("should leave the task list unchanged", function() {
        // expect(repeater('tr.task').count()).toBe(3);
      // });

      // it("should display an error message", function() {
        // expect(element('div.alert').count()).toBe(1);
      // });
    // });
  // });

  // describe("Mark task as done", function() {
    // it("should remove the task from the task list", function() {
      // element('button.js-done:last').click();
      // expect(repeater('tr.task').count()).toBe(2);
    // });
  // });

  // describe("Filter by priority", function() {
    // describe("when high priority is selected", function() {
      // it("should display only high priority tasks", function() {
        // element("a.priority:contains('high')").click();
        // expect(repeater('tr.task').count()).toBe(1);
      // });
    // });

    // describe("when high priority is selected", function() {
      // it("should display only medium priority tasks", function() {
        // element("a.priority:contains('medium')").click();
        // expect(repeater('tr.task').count()).toBe(1);
      // });
    // });

    // describe("when high priority is selected", function() {
      // it("should display only medium priority tasks", function() {
        // element("a.priority:contains('low')").click();
        // expect(repeater('tr.task').count()).toBe(1);
      // });
    // });

    // describe("when no priority is selected", function() {
      // it("should display all tasks", function() {
        // element("a.priority:contains('All')").click();
        // expect(repeater('tr.task').count()).toBe(3);
      // });
    // });
  // });

  // describe("Task search", function() {
    // it("should only display task that match the keyword", function() {
      // input("query.name").enter("Medium");
      // expect(repeater('tr.task').count()).toBe(1);
      // expect(element('tr.task').text()).toMatch(/Medium priority task/);
    // });
  // });

  // describe("Task counter", function() {
    // it("should display number of visible tasks", function() {
      // expect(element(".js-task-counter").text()).toEqual("3 tasks");
    // });
  // });
// });


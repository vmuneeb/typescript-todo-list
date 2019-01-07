var TODO = /** @class */ (function () {
    function TODO(name, completed) {
        this.name = name;
        this.completed = completed;
        this.id = Math.random().toString(36).substr(2, 9);
    }
    return TODO;
}());
var TodoList = /** @class */ (function () {
    function TodoList() {
    }
    TodoList.createTodoItem = function (name) {
        var newTodo = new TODO(name, false);
        TodoList.list.push(newTodo);
        return TodoList.list;
    };
    TodoList.allTodoList = function () {
        return TodoList.list;
    };
    TodoList.list = new Array;
    return TodoList;
}());
window.onload = function () {
    var name = document.getElementById("todoName");
    document.getElementById("add").addEventListener("click", function () { return addNewTodo(name.value); });
    var todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos == null ? [] : todos;
    TodoList.list = todos;
    populateTodos(todos);
};
function addNewTodo(name) {
    if (name.length <= 0) {
        return;
    }
    var todos = TodoList.createTodoItem(name);
    localStorage.setItem("todos", JSON.stringify(todos));
    populateTodos(todos);
}
function populateTodos(todos) {
    var div = document.getElementById("todoList");
    var listDiv = "<div class='form form-group'>";
    todos.forEach(function (element) {
        var completedClass = element.completed ? "strike-through" : "";
        var checkedClass = element.completed ? "checked" : "";
        console.log(completedClass + " " + element.completed);
        listDiv = listDiv + "<div class='row'><div class='col-md-3'></div>" +
            "<div class='form-check text-left col-md-6 pr-1'> " +
            "<input class='form-check-input' type='checkbox' data-id='" + element.id + "' " + checkedClass + ">" +
            "<label class='form-check-label " + completedClass + "' ml-2><h4>" + element.name + "</h4></label>" +
            "</div>" +
            "</div>";
    });
    listDiv = listDiv + "</div>";
    div.innerHTML = listDiv;
    var allCheckBox = document.getElementsByClassName("form-check-input");
    [].forEach.call(allCheckBox, function (element) {
        element.addEventListener("click", todoAction, false);
    });
    function todoAction(ev) {
        var id = ev.target.getAttribute("data-id");
        var todos = TodoList.allTodoList();
        todos.forEach(function (todo) {
            if (todo.id == id) {
                if (!todo.completed) {
                    ev.target.nextElementSibling.classList.add("strike-through");
                }
                else {
                    ev.target.nextElementSibling.classList.remove("strike-through");
                }
                todo.completed = !todo.completed;
            }
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    document.getElementById("todoName").value = "";
}

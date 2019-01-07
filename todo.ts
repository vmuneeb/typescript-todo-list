interface ITodo {
    id : string;
    name : string;
    completed : boolean;
}

class TODO implements ITodo{
    public name : string;
    public completed : boolean;
    public id : string;
    constructor(name:string,completed:boolean) {
        this.name = name;
        this.completed = completed;
        this.id = Math.random().toString(36).substr(2,9)
    }
}

class TodoList {
    public static list : TODO[] = new Array;
    static createTodoItem(name:string): TODO[] {
        let newTodo = new TODO(name,false);
        TodoList.list.push(newTodo);
        return TodoList.list;
    }

    static allTodoList() : TODO[] {
        return TodoList.list;
    }
}

window.onload = function() {
    let name = <HTMLInputElement>document.getElementById("todoName");
    document.getElementById("add").addEventListener("click",()=>addNewTodo(name.value));
    var todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos == null ? [] : todos;
    TodoList.list = todos;
    populateTodos(todos);
}

function addNewTodo(name:string) {
    if(name.length <= 0 ) {
        return;
    }
    let todos = TodoList.createTodoItem(name);
    localStorage.setItem("todos",JSON.stringify(todos))
    populateTodos(todos);
}
function populateTodos(todos : TODO[]) {
    let div = <HTMLDivElement>document.getElementById("todoList")  
    let listDiv = "<div class='form form-group'>"    
    todos.forEach(element => {
        let completedClass = element.completed ? "strike-through" : "";
        let checkedClass = element.completed ? "checked" : "";
        console.log(completedClass+" "+element.completed);
        listDiv = listDiv+"<div class='row'><div class='col-md-3'></div>"+
                            "<div class='form-check text-left col-md-6 pr-1'> "+
                                "<input class='form-check-input' type='checkbox' data-id='"+element.id+"' "+checkedClass+">"+
                                    "<label class='form-check-label "+completedClass+"' ml-2><h4>"+element.name+"</h4></label>"+
                                "</div>"+
                            "</div>"
    });
    listDiv = listDiv+"</div>";
    div.innerHTML = listDiv;
    const allCheckBox = document.getElementsByClassName("form-check-input");

    [].forEach.call(allCheckBox,function(element) {
        element.addEventListener("click", todoAction, false);
    })


    function todoAction(ev) {    
        let id = ev.target.getAttribute("data-id");    
        let todos = TodoList.allTodoList();
        todos.forEach(todo => {
            if(todo.id == id) {
                if(!todo.completed) {
                    ev.target.nextElementSibling.classList.add("strike-through");           
                } else {
                    ev.target.nextElementSibling.classList.remove("strike-through");
                }
                todo.completed = !todo.completed;
            }
        })
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    (<HTMLInputElement>document.getElementById("todoName")).value = "";
}


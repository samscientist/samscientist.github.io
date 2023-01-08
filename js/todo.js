const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"; // just a name for local storage key

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}
1673180509527

function deleteToDo(event) {
    const todo_li = event.target.parentElement;
    console.log(toDos);
    todo_li.remove(); //얘는 메모리는 유지한 채 HTML에서만 제거하는 기능인 것 같네?
    toDos = toDos.filter((ToDo) => ToDo.id !== parseInt(todo_li.id)); // ㄴ 그래야 작동가능한 줄이잖아? (todo_li.id가 접근 가능해야 하므로)
    saveToDos();
}

function paintToDo(newTodo) {
    const listItem = document.createElement("li");
    listItem.id = newTodo.id;
    const span = document.createElement("span");
    const delButton = document.createElement("button");
    span.innerText = newTodo.text;
    delButton.innerText = "❌";
    delButton.addEventListener("click",deleteToDo);
    listItem.appendChild(span);
    listItem.appendChild(delButton);
    toDoList.appendChild(listItem);
}

function handleToDOSubmit(event) {
    event.preventDefault();
    const newTodoObj = {
        text: toDoInput.value,
        id: Date.now(),
    }
    toDoInput.value = "";
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDOSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) { // !== null
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); //(item) => paintToDo(item)
}
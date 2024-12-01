let idCheckbox = document.getElementById('todoItemsContainer'); //Id chechbox
let addButton = document.getElementById("addButton");
let saveTodoId = document.getElementById('saveTodoId');


function getTodoListIntoLocal() {
    let stringifiedTodo = localStorage.getItem("todoList");
    let parsedTodolist = JSON.parse(stringifiedTodo);

    if (parsedTodolist === null) {
        return [];
    } else {
        return parsedTodolist;
    }
}
let todoList = getTodoListIntoLocal();


function onTodoStatusChange(checkboxElement, labelContainer, todoId) {
    let checkBoxId = document.getElementById(checkboxElement);
    let labelId = document.getElementById(labelContainer);
    labelId.classList.toggle('checked');
    let todoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoElement = "todo" + eachTodo.uniqueNo;
        if (eachTodoElement === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }


}



saveTodoId.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));

};

function removeTodo(todoId) {
    let todoList = document.getElementById(todoId);
    idCheckbox.removeChild(todoList);
}

function createCheckboxAppend(todo) {

    let checkboxElement = "checkbox" + todo.uniqueNo;
    let labelContainer = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li"); //list creation
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    idCheckbox.appendChild(todoElement);

    let checkboxInput = document.createElement("input"); //checkbox
    checkboxInput.type = "checkbox";
    checkboxInput.id = checkboxElement;
    checkboxInput.checked = todo.isChecked; //Last stage
    checkboxInput.classList.add("checkbox-input");
    todoElement.appendChild(checkboxInput);

    checkboxInput.onclick = function() {
        onTodoStatusChange(checkboxElement, labelContainer, todoId);
    }



    let labelElement = document.createElement("div"); //div for label
    labelElement.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelElement);

    let labelText = document.createElement("label"); //label content
    labelText.classList.add("checkbox-label");
    labelText.id = labelContainer;
    labelText.setAttribute("for", checkboxElement);
    labelText.textContent = todo.text;
    labelElement.appendChild(labelText);

    if (todo.isChecked === true) { //Last stage
        labelText.classList.add("checked");
    }


    let deleteiconContainer = document.createElement('div'); //deleteIconContainer div
    deleteiconContainer.classList.add("delete-icon-container");
    labelElement.appendChild(deleteiconContainer);

    let deleteIcon = document.createElement('i'); //del icon
    deleteIcon.classList.add("fa-regular", "fa-trash-can", "delete-icon");

    deleteIcon.onclick = function() {
        removeTodo(todoId);
        let deleteTodoIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        todoList.splice(deleteTodoIndex, 1);


    };


    deleteiconContainer.appendChild(deleteIcon);
}

function addFunctionButton() {

    let UserInput = document.getElementById('todoUserInput');
    let todoCount = todoList.length;
    let userValue = UserInput.value;

    if (UserInput.value === "") {
        alert("Enter a Valid input");
        return;
    }

    let newTodo = {
        text: userValue,
        uniqueNo: todoCount + 1,
        isChecked: false
    };

    todoList.push(newTodo);
    createCheckboxAppend(newTodo);
    UserInput.value = "";

}

addButton.onclick = function() {
    addFunctionButton();
}

for (let todo of todoList) {
    createCheckboxAppend(todo);
}
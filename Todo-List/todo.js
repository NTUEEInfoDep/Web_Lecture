window.onload = () => {
    class TodoList {
        static add() {
            if (TodoList.input.value.trim()) {
                let newEntry = document.createElement('li');
                let check = document.createElement('input');
                check.type = "checkbox";
                newEntry.appendChild(check);
                console.log(newEntry)
                newEntry.textContent += TodoList.input.value;
                newEntry.addEventListener('click', TodoList.remove);
                
                TodoList.list.appendChild(newEntry);
                TodoList.input.value = '';
            }
        }

        static remove(event) {
            TodoList.list.removeChild(event.target);
        }
    }

    TodoList.input = document.getElementById('input');
    TodoList.button = document.getElementById('add_button');
    TodoList.list = document.getElementById('todo_list');
    TodoList.button.addEventListener('click', TodoList.add);
}
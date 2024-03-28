interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todoContainer = document.getElementsByClassName(
  "todoContainer"
)[0] as HTMLDivElement;
const todoInput = document.getElementsByName(
  "todoInput"
)[0] as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

// Already exists toDos
window.onload = () => {
  const myTodo = localStorage.getItem("myTodo");
  const storedTodo: Todo[] = myTodo ? JSON.parse(myTodo) : [];
  renderToDoList(storedTodo);
};

// Render Function of ToDos
const renderToDoList = (todos: Todo[]): void => {
  todoContainer.innerHTML = "";
  todos.forEach((todo) => {
    // Head Todo div
    const todoDiv: HTMLDivElement = document.createElement("div");
    todoDiv.className = "todo";

     // title Todo
     const paragraph: HTMLParagraphElement = document.createElement("p");
     paragraph.innerText = todo.title;

    // Checkbox todo isCompleted
    const checkBox: HTMLInputElement = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", todo.id);
    checkBox.className = "isCompleted";
    checkBox.checked = todo.isCompleted;
    paragraph.className = checkBox.checked ? "textCut" : "";
    checkBox.onchange = (e:any) => {
      paragraph.className = checkBox.checked ? "textCut" : "";
      const myTodo = localStorage.getItem("myTodo");
      const storedTodo: Todo[] = myTodo ? JSON.parse(myTodo) : [];
      const updateTodo: Todo[] = storedTodo.map((todo) => {
        if (todo.id === e.target.id) {
          return {
            ...todo,
            isCompleted: e.target.checked,
          };
        }
        return todo;
      });
      localStorage.setItem("myTodo", JSON.stringify(updateTodo));
    };

   

    // delete Todo
    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.setAttribute("id", todo.id);
    deleteButton.className = "deleteBtn";
    deleteButton.onclick = (e:any) => {
      const myTodo = localStorage.getItem("myTodo");
      const storedTodo: Todo[] = myTodo ? JSON.parse(myTodo) : [];
      const updateTodo: Todo[] = storedTodo.filter((todo) => {
        console.log(todo.id, e.target.id)
        if (todo.id !== e.target.id) {
          return todo
        }
      });
      console.log(updateTodo)
      localStorage.setItem("myTodo", JSON.stringify(updateTodo));
      renderToDoList(updateTodo);
    }

    // Append toDo
    todoDiv.append(checkBox, paragraph, deleteButton);
    todoContainer.append(todoDiv);
  });
};

// create new Todo
myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: Math.random().toString(36).substring(2),
  };

  const myTodo = localStorage.getItem("myTodo");
  const storedTodo: Todo[] = myTodo ? JSON.parse(myTodo) : [];
  const updateTodo: Todo[] = [todo, ...storedTodo];
  localStorage.setItem("myTodo", JSON.stringify(updateTodo));
  todoInput.value = "";
  renderToDoList(updateTodo);
};



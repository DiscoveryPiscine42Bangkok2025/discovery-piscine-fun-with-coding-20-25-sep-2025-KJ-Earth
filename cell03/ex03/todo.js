function getTodos() {
  const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
  if (!cookie) return [];
  return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
}

function saveTodos(todos) {
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function renderTodos() {
  const ft_list = document.getElementById("ft_list");
  ft_list.innerHTML = "";
  const todos = getTodos();
  todos.forEach((todo, index) => {
    const div = document.createElement("div");
    div.innerText = todo;
    div.onclick = () => {
      if (confirm("Remove this task?")) {
        todos.splice(index, 1);
        saveTodos(todos);
        renderTodos();
      }
    };
    ft_list.prepend(div);
  });
}

function newTodo() {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    const todos = getTodos();
    todos.unshift(text.trim());
    saveTodos(todos);
    renderTodos();
  }
}

window.onload = renderTodos;

// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];


todoList.forEach(function (todo, index) {
  var checkboxId = 'todo-' + (index + 1);

  var isChecked = todo.completed ? 'checked' : '';

  var todoHTML = `
      <li>
          <input type="checkbox" id="${checkboxId}" ${isChecked}>
          <label for="${checkboxId}">${todo.task}</label>
      </li>
  `;

  document.querySelector('ul').insertAdjacentHTML('beforeend', todoHTML);
});

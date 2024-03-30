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

// add your code here
const ul = document.querySelector('ul');
todoList.forEach((task, index) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = task.id;
  input.checked = task.completed;
  input.addEventListener('change', () => {
    task.completed = input.checked;
    console.log(todoList);
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    todoList.splice(index, 1);
    ul.removeChild(li);
    console.log(todoList);
  });
  li.appendChild(deleteButton);

  const label = document.createElement('label');
  label.htmlFor = task.id;
  label.textContent = task.task;
  li.appendChild(input);
  li.appendChild(label);
  ul.appendChild(li);

});



const saveButton = document.querySelector('.save-task');
saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  const inputField = document.getElementById('todo');
  const newTask = inputField.value;
  const newId = todoList.length + 1;
  const newTaskObject = {
    id: newId,
    task: newTask,
    completed: false,
  };
  todoList.push(newTaskObject);
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = newId;
  input.addEventListener('change', () => {
    newTaskObject.completed = input.checked;
    console.log(todoList);
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    todoList.splice(newId - 1, 1);
    ul.removeChild(li);
    console.log(todoList);
  });

  li.appendChild(deleteButton);

  const label = document.createElement('label');
  label.htmlFor = newId;
  label.textContent = newTask;
  li.appendChild(input);
  li.appendChild(label);
  ul.appendChild(li);
});

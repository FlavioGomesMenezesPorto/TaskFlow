// Selecionando os elementos necessários
const addTaskButton = document.querySelector('.btn-add-task');
const taskForm = document.querySelector('.form-add-task');
const taskTextarea = document.querySelector('.app__form-textarea');
const taskListContainer = document.querySelector('.app__section-task-list');
const taskDescriptionDisplay = document.querySelector('#taskDescriptionDisplay');

// Alternando o formulário de adicionar tarefas
addTaskButton.addEventListener('click', () => {
    taskForm.classList.toggle('hidden');
});

// Carregar tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', loadTasks);

// Evento de envio do formulário
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskDescription = taskTextarea.value.trim();

    if (taskDescription) {
        addTask(taskDescription);
        saveTaskToStorage(taskDescription);
        taskTextarea.value = '';
    } else {
        alert('Por favor, insira uma descrição para a tarefa.');
    }
});

// Função para adicionar uma tarefa na interface
function addTask(taskDescription) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('app__section-task-list-item');

    const taskParagraph = document.createElement('p');
    taskParagraph.textContent = taskDescription;
    taskParagraph.classList.add('app__section-task-list-item-description');

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('app_button-edit');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.classList.add('app_button-remove');

    // Evento para remover tarefa
    removeButton.addEventListener('click', () => {
        taskItem.remove();
        removeTaskFromStorage(taskDescription);
    });

    // Evento para editar tarefa
    editButton.addEventListener('click', () => {
        const newDescription = prompt('Edite sua tarefa:', taskDescription);
        if (newDescription) {
            taskParagraph.textContent = newDescription;
            updateTaskInStorage(taskDescription, newDescription);
        }
    });

    // Evento para selecionar tarefa
    taskItem.addEventListener('click', () => {
        document.querySelectorAll('.app__section-task-list-item').forEach((task) => {
            task.classList.remove('active');
        });
        taskItem.classList.add('active');
        taskDescriptionDisplay.textContent = `Detalhes da Tarefa: ${taskDescription}`;
    });

    taskItem.appendChild(taskParagraph);
    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);
    taskListContainer.appendChild(taskItem);
}

// Funções para manipular o localStorage
function saveTaskToStorage(taskDescription) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskDescription);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskDescription) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskDescription);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInStorage(oldDescription, newDescription) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(oldDescription);
    if (taskIndex > -1) {
        tasks[taskIndex] = newDescription;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar tarefas salvas
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskDescription => addTask(taskDescription));
}

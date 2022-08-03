const addTask = document.querySelector('.input-gorev');
const addTaskBtn = document.querySelector('.btn-gorev-ekle');
const taskList = document.querySelector('.gorev-listesi');


addTaskBtn.addEventListener('click',tasksAddFunc);
taskList.addEventListener('click',taskDelComp);
document.addEventListener('DOMContentLoaded', localStorageRead); 



function localStorageToArray() {
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}
function tasksAddFunc(event) {
    if (addTask.value.trim().length != 0){ 
    event.preventDefault();
    taskItemCreate(addTask.value);
    localStorageAdd(addTask.value);
    addTask.value = '';
    addTask.focus();

    }

    else{
        alert('Boş değer giremezsiniz!');
    }
    
}


function taskDelComp(event) {
    const clickElement = event.target;
    if (clickElement.classList.contains('gorev-btn-tamamlandi')){ 
        clickElement.parentElement.classList.toggle('gorev-tamamlandi');
    }
    else if(clickElement.classList.contains('gorev-btn-sil')){
        if(confirm('Silinsin mi?')){ 
        clickElement.parentElement.classList.toggle('kaybol');
        const deletedTask = clickElement.parentElement.children[0].innerText;
        localStorageDelete(deletedTask);

        clickElement.parentElement.addEventListener('transitionend', function () {
            clickElement.parentElement.remove();
        });
        }
    }
}

function localStorageAdd(newTask) {
    let tasks = localStorageToArray();

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function localStorageRead() {
    let tasks = localStorageToArray();

    tasks.forEach(function (task) {
        taskItemCreate(task);
    })
}

function taskItemCreate(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('gorev-item');

    const taskLi = document.createElement('li');
    taskLi.classList.add('gorev-tanim');
    taskLi.innerText = task;

    taskDiv.appendChild(taskLi);

    taskList.appendChild(taskDiv);

    const taskCompBtn = document.createElement('button');
    taskCompBtn.classList.add('gorev-btn');
    taskCompBtn.classList.add('gorev-btn-tamamlandi');
    taskCompBtn.innerHTML = '<i class="fas fa-check-square"></i>';

    taskDiv.appendChild(taskCompBtn);

    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.classList.add('gorev-btn');
    taskDeleteBtn.classList.add('gorev-btn-sil');
    taskDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

    taskDiv.appendChild(taskDeleteBtn);
}

function localStorageDelete(task) {
    let tasks = localStorageToArray();

    const silinecekElemanIndex = tasks.indexOf(task);
    tasks.splice(silinecekElemanIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

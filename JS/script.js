//define all attribute:

let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clr_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task')


//event listner :
form.addEventListener('submit',addTask);
taskList.addEventListener('click',RemovTask);
clearBtn.addEventListener('click',clearAll);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);


//Functions: 
//add task: 
function addTask(e) {
    if (taskInput.value === ''){
        alert("Add a task");
    }
    else{
        // create li tag/ element:
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        // create x Element 
        let link = document.createElement('a');
        link.setAttribute("href","#");
        link.innerHTML = 'x';

        li.appendChild(link);
        taskList.appendChild(li);

        //function of add tasks in local storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}


//Remove task by clicking x: 
function RemovTask(e){
    if (e.target.hasAttribute("href")){
        if(confirm("are you sure?")){
            let ele = e.target.parentElement;
            ele.remove();
            remoceFromLS(ele);
        }
    }
}


//clear btn: 
function clearAll(e){
    taskList.innerHTML = "";
    localStorage.clear();
}


//filter task:
function filterTask(e){
    let text = e.target.value.toLowerCase();
    
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block'
        }
        else{
            task.style.display = 'none'
        }
    })
}


//task store in local storage:
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTask(e){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));

        // create x Element 
        let link = document.createElement('a');
        link.setAttribute("href","#");
        link.innerHTML = 'x';

        li.appendChild(link);
        taskList.appendChild(li);
    })
}

//Remove task from Local storage:
function remoceFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    let li = taskItem;
    li.removeChild(li.lastchild);

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}
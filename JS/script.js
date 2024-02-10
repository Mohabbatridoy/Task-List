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
        }
    }
}


//clear btn: 
function clearAll(e){
    taskList.innerHTML = "";
}
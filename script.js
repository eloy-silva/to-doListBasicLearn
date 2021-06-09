
function ToDo(id, task, is_done=false, is_trask=false){
    this.id       = id;
    this.task     = task;
    this.is_done  = is_done;
    this.is_trask = is_trask;
}
ToDo.prototype={
    id      : 0,
    task    : "",
    is_done : false,
    is_trask: false
}


var tasks_list_ui  = document.getElementById("myList");
var toDoList       = [];
function addTask(){
    let task;
    let task_id;
    if(document.getElementById("task").value == "")
        return null;
    
    localStorage.last_index = (localStorage.last_index == undefined ? 1 : 
                                                 (parseInt(localStorage.last_index)+1));
    
    task_el = document.getElementById("task");
    task_id = localStorage.last_index;
    toDoList.push(new ToDo(task_id, task_el.value));
    addToLocalStorage(toDoList);
    addElToList_UI(task_id, task_el.value);
    task_el.value = "";
    //render();
}

function removeTask(id){
    for( i = 0 ; i < tasks_list_ui.children.length ; i++){

        if(tasks_list_ui.children[i].getAttribute("index") == id ){

            tasks_list_ui.children[i].remove();
            toDoList.splice(i,1);
            addToLocalStorage(toDoList);
            return 0;
        }
    }
}


function getDataFromLocalStorage(){
    if(localStorage.last_index == undefined || 
        localStorage.last_index==0)
        return null;
    toDoList = JSON.parse(localStorage.toDoList);
}

function addToLocalStorage(toDoList){
    localStorage.toDoList = JSON.stringify(toDoList);
}


function render(){
    if(localStorage.last_index == undefined || 
        localStorage.last_index==0)
        return null;
    for(let toDo of JSON.parse(localStorage.toDoList)){
        addElToList_UI(toDo.id, toDo.task);
    }
}
function addElToList_UI(id, task){
    li 	   = createItemEl(id,task);
    li.appendChild(createRemoveTaskBtn(id));
    tasks_list_ui.appendChild(li);
}

function createItemEl(key, value){

    let li = document.createElement("li");

    li.setAttribute("index", key);

    li.appendChild(document.createTextNode(value));

    return li;
}
function createRemoveTaskBtn (itemId){
    let btn =  document.createElement("button");
    btn.setAttribute("onclick", "removeTask("+itemId+")"); 
    btn.innerHTML ="-";
    return btn;
}



getDataFromLocalStorage();
render();
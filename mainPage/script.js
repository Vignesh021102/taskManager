
var addB = document.querySelector("#adder").querySelector("button");
var inputBar = document.querySelector("#adder").querySelector("input");
const viewer = document.querySelector("#viewer");
const editViewer = document.querySelector("#editViewer")
var Tasks = [];
if(!document.cookie){
    if(!/\d+/.test(document.cookie)){
        window.open("../public","_self")
    }
}else{
    const ID = document.cookie.match(/\d+/)[0];
}

function addTask(){
    if(inputBar.value == "") return;
    let data = {}
    data.task = inputBar.value;
    inputBar.value = "";
    data.completed = false;
    data.time = new Date()
    sendData("/addT",data)
}

addB.addEventListener("click",addTask)
document.body.addEventListener("keypress",(e)=>{
    if(e.key == "Enter") return addTask();
})

getData("/getTs");

function sendData(url,data){
    fetch(url,{method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-type":"application/json"
        }
    })
    .then(()=> {
        getData("/getTs")
    })
}
function getData(url){
    fetch(url)
    .then((response)=>{
        return response.json()})
    .then((data)=>{
        Tasks = data.tasks;
        setUpViewer(data.tasks);
    })
    .catch(()=>{
        logOut();
    })
}
function setUpViewer(arr){
    viewer.innerHTML="";
    for(let i =0;i<arr.length;i++){
        let ele = document.createElement("div")
        ele.className = arr[i].completed;
        let task = ``;
        if(arr[i].completed){
            task = `<p><s>${arr[i].task}</s></p>`
        }else{
            task = `<p>${arr[i].task}</p>`
        }
        ele.innerHTML = `${task}<button id="${arr[i].id}" onclick="toggleEditViewer(event)"><i class="fas fa-edit"></i> edit </button>`;
        viewer.appendChild(ele);
    }
}
function toggleEditViewer(event){
    if(event == true) return editViewer.style.display = "none";
    //while viewer is displaying and clicked edit button again
    if(editViewer.style.display == "flex") return;
    editViewer.style.display = "flex";
    toggleProfileM(true);
    let ele = event.target
    if(!ele.querySelector("i")){
        ele = ele.parentElement;
    }
    for(let i =0;i<Tasks.length;i++){
        if(Tasks[i].id == ele.id){
            ele = Tasks[i]
            break;
        }
    }
    editViewer.querySelector("#idP").innerText = ele.id
    editViewer.querySelector("#textIB").value = ele.task;
    editViewer.querySelector("#check").checked= ele.completed;
}
function updateT(){
    let Obj = {};
    Obj.id = editViewer.querySelector("#idP").innerText;
    Obj.task = editViewer.querySelector("#textIB").value;
    Obj.completed = editViewer.querySelector("#check").checked;
    for(let i =0;i<Tasks.length;i++){
        if(Obj.id == Tasks[i].id){
            let arr = Object.keys(Obj)
            for(let j in arr){
                if (arr[j] == "id")continue;
                if(Obj[arr[j]] == Tasks[i][arr[j]]){
                    delete Obj[arr[j]]
                }
            }
        }
    }
    
    fetch("/updateT",{method:"POST",body:JSON.stringify(Obj),headers:{"content-type":"application/json"}})
    .then((response)=>{return response.json()})
    .then((data)=>{
        setUpViewer(data.tasks);
        Tasks = data.tasks;
        toggleEditViewer(true);
    })
}

function deleteT(){
    let Obj = {};
    Obj.id = editViewer.querySelector("#idP").innerText;
    fetch("/deleteT",{method:"POST",body:JSON.stringify(Obj),headers:{"content-type":"application/json"}})
    .then((response)=>{return response.json()})
    .then((data)=>{
        setUpViewer(data.tasks);
        Tasks = data.tasks;
        toggleEditViewer(true);
    })
}

function toggleProfileM(bool){

    let profileM = document.querySelector("#profileM");
    if(bool){
       return profileM.style.display = "none"
    }
    if(profileM.style.display == "flex"){
        profileM.style.display = "none"
    }else{
        profileM.style.display = "flex"
    }
}
function logOut() {
    document.cookie = `id=undefined;expries=${new Date("1980")};path=/`
    window.open("../public","_self")
}
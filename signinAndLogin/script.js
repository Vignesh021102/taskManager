if(document.cookie){
    if(/\d+/.test(document.cookie)){
        window.open("../user","_self")
    }
}

function toggleForms(){
    let form1 = document.querySelector("#signinForm");
    let form2 = document.querySelector("#loginForm");
    let toggleB = document.querySelector("#toggle");
    
    if(form2.style.display == "none"){
        form1.style.display = "none";
        form2.style.display = "flex";
        toggleB.innerHTML = `register<i class="fas fa-chevron-right" ></i>`;
    }else{
        form1.style.display = "flex";
        form2.style.display = "none";
        toggleB.innerHTML= `<i class="fas fa-chevron-left" ></i>login`;
    }
}
function signin(){
    let obj = {};
    let Form = document.querySelector("#signinForm");
    obj.name = Form.querySelector("#nameIn").value;
    if(!obj.name){
        writeMessage(`Enter your name`,3);
        document.querySelector("#nameIn").focus();
        return
    }
    obj.mailID = Form.querySelector("#mailIn").value;
    if(!obj.mailID){
        writeMessage(`Enter your mail ID`,5);
        document.querySelector("#mailIn").focus();
        return
    }
    if(obj.mailID.split("@").length<=1){
        writeMessage(`Incorrect mail ID`,5);
        
        document.querySelector("#mailIn").focus();
        return
    }else if(obj.mailID.split("@")[1].split(".").length <=1){
        writeMessage(`Incorrect domain name`,5);
        
        document.querySelector("#mailIn").focus();
        return
    }
    console.log(obj);
    obj.password = Form.querySelector("#passIn").value;
    if(!obj.password){
        writeMessage(`Enter a password`,3);
        document.querySelector("#passIn").focus();
        return
    }
    if(obj.password != Form.querySelector("#cPassIn").value) {
        writeMessage(`Incorrect password\nConform password again`,10)
        document.querySelector("#cPassIn").value = "";
        document.querySelector("#cPassIn").focus();
        return;
    }
    
    fetch("/signIn",{method:"POST",body:JSON.stringify(obj),headers:{"content-type":"application/json"}})
    .then((response)=>{return response.json()})
    .then((data)=>{
        openMainPg(data);
    })
}
function login(){
    let obj = {};
    obj.name = document.querySelector("#userInL").value;
    if(!obj.name){
        writeMessage(`Enter the user name`,5);
        document.querySelector("#userInL").focus();
        return
    }
    obj.password = document.querySelector("#passInL").value;
    if(!obj.password){
        writeMessage(`please enter your password`,5);
        document.querySelector("#passInL").focus()
        return
    }

    fetch("/findId",{method:"POST",body:JSON.stringify(obj),headers:{"content-type":"application/json"}})
    .then((responce)=>{return responce.json()})
    .then((data)=>{
        console.log(data);
        if(!data.id){
            writeMessage(`Username and Password not matching\nIf you are new kindly REGISTER`,10)
            toggleForms();
            return
        }
        openMainPg(data)
        })
}

function openMainPg(data){
    console.log(data);
    localStorage.setItem("id",data.id);
    let date = new Date(`${new Date().getFullYear()+1}`);
    document.cookie = `id=${data.id};expires=${date};path=/`;

    window.open("../user","_self")
}
function clearIn(){
    document.querySelector("#nameIn").value= "";
    document.querySelector("#mailIn").value = "";
    document.querySelector("#passIn").value = "";
    document.querySelector("#cPassIn").value = ""
    document.querySelector("#userInL").value = ""
    document.querySelector("#passInL").value = "";
}


function writeMessage(text,time){
    let messageBox = document.querySelector("#messageBox");
    messageBox.style.display = "block"
    messageBox.innerText = text;
    setTimeout(()=>{
        messageBox.style.display = "none"
    },time*1000)
}
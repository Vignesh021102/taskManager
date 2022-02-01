function findAndReplace(Obj,data){
    for(let i=0;i<Obj.tasks.length;i++){
        if(Obj.tasks[i].id == data.id){
            let keys = Object.keys(data);
            for(let j in keys){
                if(keys[j] == "id") continue;
                Obj.tasks[i][keys[j]] = data[keys[j]]
            }
        }
    }
}
module.exports = findAndReplace;
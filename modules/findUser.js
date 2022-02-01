function findUser(obj,ID){
    for(let i =0;i<obj.users.length;i++){
        if(obj.users[i].id == ID) {
            return obj.users[i]
        }
    }
}
module.exports = findUser
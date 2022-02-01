function randomString(length,isFullNum){
    let str = '';
    if(isFullNum){
        for(let i =0;i<length;i++){
            let num = Math.floor(Math.random()*10)
            str+=`${num}`
        }
        return str
    }
    for(let i =0;i<length;i++){
        let num = Math.floor(Math.random()*78)+48
        str+=`${String.fromCharCode(num)}`
    }
    return str
}
module.exports = randomString;
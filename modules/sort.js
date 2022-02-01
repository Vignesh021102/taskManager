function sort(data){
    //input full user data
    let tasks = [[],[]];
    //first seperating tasks into completed & other
    data.tasks.forEach((x)=>{
        
        if(!x.completed){
            tasks[0].push(x);
        }else{
            tasks[1].push(x)
        }
    })
    //sorting in time order;
    for(let k = 0;k<tasks.length;k++){
        for(let i = 0;i<tasks[k].length;i++){
            let min = i;
            for(let j = i;j<tasks[k].length;j++){
                if(new Date(tasks[k][j].time).getTime() < new Date(tasks[k][min].time).getTime()){
                    min = j;
                }
            }
            let temp = tasks[k][i];
            tasks[k][i] = tasks[k][min];
            tasks[k][min] = temp;
        }
    }
    data.tasks = tasks[0];
    data.tasks.push(...tasks[1])
    
}

module.exports = sort;  

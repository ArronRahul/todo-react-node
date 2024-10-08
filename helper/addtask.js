const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const uuidNumber = () => {
    const uuid = uuidv4();
    let uuidNum = (parseInt(uuid.replace(/-/g, ""), 16) % 80000) + 1;
    return crypto.randomInt(uuidNum);
  };

const getaddtask=(req,res)=>{
    res.status(200).json(taskdata);
}


const postaddtask=(req,res)=>{
    const taskid = uuidNumber();
    const {title,description,date,complete}=req.body;
    if(title && description ){
        const newtask={
            id: taskid,
            title:title,
            description:description,
            date:date,
            complete:complete
        }
        taskdata.push(newtask);
        console.log(newtask)
        res.status(200).json({message:"Task added successfully"});
    }
    else{
        res.status(400).json({message:"Please enter all fields"});
    }
}

const puttaskadd = (req, res) => {
    console.log('Received request body:', req.body);
    const data = taskdata.findIndex((task) => task.id === req.body.id);
    if(taskdata[data].complete){
        taskdata[data].complete=false
        res.status(200).json({message:"Task updated false"});
    }
    else{
        taskdata[data].complete=true
        res.status(200).json({message:"Task updated true"});
    }
    console.log(taskdata[data])
};

const deltaskadd=(req,res)=>{
    const data = taskdata.findIndex((task) => task.id === req.body.id);
    taskdata.splice(data, 1);
    res.status(200).json({message:"Task deleted successfully"});
    console.log(taskdata[data])
}
    

module.exports={
    postaddtask,
    getaddtask,
    puttaskadd,
    deltaskadd
}
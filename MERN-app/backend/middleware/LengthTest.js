//Middleware function that checks the length of the to do list item
const checkLength = (req,res,next) => {
    const toDo = req.body.toDoItem;

    if(toDo.length <= 140){
        next()        
    }else{
        res.send("Your to do item exceeds 140 characters")
    }
}

module.exports = {checkLength}
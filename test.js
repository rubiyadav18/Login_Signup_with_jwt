const app = async (req, res) =>{
    let a= 8;
    try{
        if (a){
            res.json(a)
        }
        else{
            res.json("uio")

        }
    }
    catch(error){
            res.send({message:"you r wrong"})
    }
}

module.exports ={ app}
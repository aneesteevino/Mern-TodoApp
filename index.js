const express=require('express')
const dotenv=require('dotenv')
dotenv.config({})
const mongoose=require('mongoose')


let app=express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


const todoschema=mongoose.Schema({
      titlemd:String,
      descmd:String,
      checkmd:String

})

const TodoModel=mongoose.model('todo',todoschema)

const mongodb_connect=async()=>{
    try{
        await mongoose.connect(process.env.MDB_connect)
        console.log("mongo is connected")
    }
    catch(error){
        console.log("this is error ",error)

    }

}
mongodb_connect()




app.get('/',(req,res)=>{
    const viewtodo=async()=>{
        try{
          const viewAll=  await TodoModel.find()
          
          return res.status(200).json(viewAll)

        }
        catch(error){
            res.status(400).json({
                message:"server problem"
            })
        }

    }
    viewtodo()

})


app.post("/createtodo",(req,res)=>{
    const mongoDB=req.body
    const {title,desc,check}=req.body
    const createtodo=async()=>{
     
        if(!title||!desc||!check){
            res.send("please fill all the fields")
        }


        try{
           await TodoModel.create({
            titlemd:title,
            descmd:desc,
            checkmd:check
           }
           

           )
        return res.status(200).json({
            message:"todo created successfully"
        })

        }
        catch(error){
            res.json({
                message:"server failed"
            })

        }
       


    }
    createtodo()
    




})

app.delete("/deletetodo",(req,res)=>{
    const {id}=req.body

    const deletetodo=async()=>{
       if(!id){
        return     res.json({
            message:"provide a valid id  "
        })
       }


            try{
             
               await  TodoModel.findByIdAndDelete(id)
               return  res.status(200).json({
                message:"todo deleted successfully"
            })


            }
            catch(error){
           return     res.status(400).json({
                    message:"todo is not deleted "
                })

            }


    }
    deletetodo()
   

})

app.put("/updatetodo", (req, res) => {
    const { id, title, desc, check } = req.body

    const updatetetodo = async () => {
        if (!id || !title || !desc || !check) {
            return res.status(400).json({
                message: "provide a valid id  "
            })
        }
        try {

            await TodoModel.findByIdAndUpdate(id, { titlemd: title, descmd: desc, checkmd: check })
            return res.status(200).json({
                message: "todo updated successfully"
            })
        }
        catch (error) {
            return res.status(400).json({
                message: "todo is not updated "
            })
        }
    }
    updatetetodo()



})




app.listen(process.env.Port,()=>{
    console.log("server is running")
})
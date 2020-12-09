const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get("/mario", async (req,res) =>{
    res.send(await marioModel.find({}));
})

app.get("/mario/:id", async (req, res) => {
  try {
    res.send(await marioModel.findById(req.params.id));
    }
  catch (er) {
    res.status(400).send({ message: er.message });
  }
}
);
const isNoU = (i) => i===null || i===undefined
app.post("/mario",async (req,res)=>{
    let {name, weight} = req.body;
    
    if (!(isNoU(name) || isNoU(weight))) {
      let newMario = new marioModel({ name, weight });
      await newMario.save();

      res.status(201).send(newMario);
    } else {
      res.status(400).send({ message: "either name or weight is missing" });
    }
})
app.patch("/mario/:id", async (req, res) => {
    try {
      let {name,weight} = req.body;
      let result = await marioModel.findOne({ _id: req.params.id });
      console.log(result);
      if ((isNoU(name) && isNoU(weight))) {
        res.status(400).send({message:"both name and weight are missing"});
      } else {
        result.weight = weight ?? result.weight;
        result.name = name ?? result.name;
        await result.save();
        res.send(result);
      }
    } catch (er) {
      res.status(400).send({ message: er.message });
    }
  });
app.delete("/mario/:id", async (req,res) => {
    try{
        let d = await marioModel.findOne({_id:req.params.id});
        if(isNoU(d)){
            res.status(400).send({
                message:"id not found",
            })
        }else{
            await marioModel.deleteOne({_id:req.params.id});
        res.send({
            message:"character deleted",
        })
        }
        
    } catch(er){
        res.status(400).send({
            message:er.message,
        })
    }
})
module.exports = app;
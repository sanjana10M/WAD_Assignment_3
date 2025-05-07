const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Server } = require('http');

const app = express();
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://kbtug22108:AMSH512XS9ubsqMc@cluster0.2utgjhw.mongodb.net/')

const KBTSchema = new mongoose.Schema({
    name:String,
    marks:Number
});



const KBT = mongoose.model('KBT',KBTSchema);

app.get('/',(req,res)=>{
res.send('Welcome To The Student API');
});

app.get('/students',async(req,res)=>{
    const students = await KBT.find();
    res.send(students);
  
});

app.get('/students/:name',async(req,res)=>{
    const{name} = req.params;
    const students = await KBT.find({name});
    res.send(students);
});

app.post('/add-students/',async(req,res)=>{
    const{name,marks}=req.body;
    const newStudent=new KBT({name,marks});
    await newStudent.save();
    console.log(req.body)
});
app.delete('/delete-student/:name',async(req,res)=>{
    const {name} =req.params;
    const student = await KBT.findOneAndDelete({name})
}
)
app.put('/update-student/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const { name, marks } = req.body; 
        const student = await KBT.findByIdAndUpdate(id, { name, marks }, { new: true });
        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000')
});




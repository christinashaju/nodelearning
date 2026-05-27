const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const PORT = 3002;
const app = express();
app.use(express.json());
// Import DB Connection
// const pool= require("./dbConnection");
const { connectDB } = require("./sequelize");

const User = require("./models/user");

const Students = require("./models/students");
const { where } = require("sequelize");

app.listen(PORT,()=>{
    connectDB();
   console.log("port is up");
});


app.get("/users/sequelize", async (req,res)=>{
    try{
    const users = await User.findAlls
    qww();
    res.json(users);
} catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});
app.delete("/users/sequelize", async (req,res)=>{
    try{
    const users = await User.destroy({where:{id:2}});
    res.json(users);
} catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});
app.patch("/users/sequelize", async (req,res)=>{
    try{
    const users = await User.update({age:29},{where:{id:2}});
    res.json(users);
} catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

app.delete("/users", async(req,res)=>{
    try{
        const users = await User.destroy({where:{name:req.body.name}});
        res.json(users);
    }
    catch(err){
         console.log(err);
         res.status(500).json({ error: err.message});
    }
});
app.post("/users/seq", async (req,res)=>{
    try{
        const user = await User.create(req.body);
        res.json("User created successfully");
    }
    catch{
        console.log(err)
    res.status(500).json({ error: err.message });
    }

});

app.patch("/users/seq", async (req,res)=>{
    try{
        const user = await User.update({name:req.body.newName},{where:{name:req.body.name}});
        res.json("User updated successfully");
    }
    catch(err){
        console.log(err)
    res.status(500).json({ error: err.message });
    }

});

app.post("/users/sequelize", async (req,res)=>{
    try{
    //console.log(req.body)
        const users = await User.create(req.body);
    res.json(users);
} catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});
app.post("/students/async1", async (req,res)=>{
    console.log("1");
    const christina=await pool.query("select * from users;");
    console.log("*******************DB RESULT***********************************")
    console.log(christina);
    console.log("*******************DB RESULT ROWS***********************************")
    console.log(christina.rows);
    console.log("3");
    res.send("done")
});

app.post("/students/async2", (req,res)=>{
    console.log("1");
    const dbResult=pool.query("select * from users;");
    console.log(dbResult);
    console.log("3");
    res.send("done")
});


app.get("/user", async(req,res)=>{
    const details = await pool.query("select * from users;");
    console.log(details.rows);
    res.send("done");
});

app.post("/students", async (req,res)=>{
    try{
        const students = await Students.create(req.body);
        res.json("student created successfully");
    }
    catch(err){
        console.log(err)
    res.status(500).json({ error: err.message });
    }

});

app.post("/student/login", async(req,res)=>{
    try{
        const student = await Students.findOne({
            where:{
                email:req.body.email
            }});
        if (!student) {
            return res.status(404).json("Login failed:student not found");
            
        }
        if(student.password==req.body.password){
            return res.status(200).json("Student logined successfully");

        }
            return res.status(401).json("Login failed...incorrect passwqord");
        
        
    }
    catch(err){
        console.log(err)
    res.status(500).json({ error: err.message });
    }

});



app.post("/student/vijin", async (req,res)=>{
try{
    const student = await Students.findOne({
    where:{
        email:req.body.email
    }});
    if(!student){
        return res.status(404).json("login failed:User not found")
    }
    const isMatch = await bcrypt.compare(req.body.password, student.password);
    if(!isMatch){
        return res.status(401).json("login failed:incorrect password");
    }
    const token = jwt.sign(
        { id: student.studentid, email: student.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const result = {
        "name":student.name
      }
      res.setHeader("token",token)
    return res.status(200).json({
        "name":student.name,

      });
}
catch(err){
    console.log(err)
res.status(500).json({ error: err.message });
}
});


app.get("/student/profile",async (req,res)=>{
    const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Students.findOne({where:{studentid:decoded.id}});
    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});




app.get("/profile", async (req,res)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(403).json("No headers found");
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Students.findOne({where:{studentid:decoded.id}});

        await student.update({last_fetchedat:new Date()});
        return res.status(200).json(student);
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:"Invalid token"})
    }

});

app.post("/hashing", async(req,res)=>{
    try{
    const saltRounds = 10;
//Hashing (salt is automatically generated internally)
   const hash = await bcrypt.hash(req.body.password, saltRounds);
   req.body.password = hash;
   const student= await Students.create(req.body);
   return res.status(201).json("New student added");  
    }
   catch(err){
    res.status(500).json("failed to create student");
   }
});



































app.get("/users",async (req,res)=>{
    const result = await pool.query("SELECT * FROM users");
      // Send data
       res.send(result.rows);
});
app.get("/users/count",async (req,res)=>{

    const result = await pool.query("SELECT count(id) FROM users");
       // Send data
       res.send(result.rows);
});


app.post("/users",async (req,res)=>{
    
    const result = await pool.query("INSERT INTO users (name, email, age) VALUES ('Christina', 'a@b.com', 25)");

    res.send("inserted");
});

























app.post("/itscorrectonly", async (req,res)=>{
 // try{
    const student = await Students.findOne({
        where:{
            email:req.body.email
        }
});

if(!student){
    return res.status(404).json("login failed:student not found")
}
if(stuffdent.password==req.body.password){
    return res.status(200).json("login successfull")
}
return res.status(401).json("login failed:incorrect input")
  //}
//   catch(err){
//     console.log(err)
//     res.status(500).json({ error: err.message });
//   }
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./User");
const Item = require("./Item");
const auth = require("./authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://satyamtyagi80064_db_user:SATYAM01@ac-kra4hkt-shard-00-00.oonsvuo.mongodb.net:27017,ac-kra4hkt-shard-00-01.oonsvuo.mongodb.net:27017,ac-kra4hkt-shard-00-02.oonsvuo.mongodb.net:27017/?ssl=true&replicaSet=atlas-13k1cl-shard-0&authSource=admin&appName=Cluster0/fsdmse")
.then(()=>console.log("DB Connected"));


// 🔐 AUTH =======================

// REGISTER
app.post("/api/register", async (req,res)=>{
  const {name,email,password} = req.body;

  const exist = await User.findOne({email});
  if(exist) return res.status(400).send("Email exists");

  const hash = await bcrypt.hash(password,10);

  await new User({name,email,password:hash}).save();

  res.send("Registered");
});

// LOGIN
app.post("/api/login", async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(req.body.password,user.password);
  if(!valid) return res.status(400).send("Wrong password");

  const token = jwt.sign({id:user._id},"secret123");

  res.json({token});
});


// 📦 ITEMS =======================

// ADD ITEM
app.post("/api/items", auth, async (req,res)=>{
  const item = new Item({
    userId: req.user.id,
    ...req.body
  });

  await item.save();
  res.send("Item added");
});

// GET ALL
app.get("/api/items", auth, async (req,res)=>{
  const data = await Item.find();
  res.json(data);
});

// GET BY ID
app.get("/api/items/:id", auth, async (req,res)=>{
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// UPDATE
app.put("/api/items/:id", auth, async (req,res)=>{
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// DELETE
app.delete("/api/items/:id", auth, async (req,res)=>{
  await Item.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// SEARCH
app.get("/api/items/search", auth, async (req,res)=>{
  const name = req.query.name;

  const data = await Item.find({
    itemName: { $regex: name, $options: "i" }
  });

  res.json(data);
});


// SERVER
app.listen(5000, ()=>console.log("Server running"));

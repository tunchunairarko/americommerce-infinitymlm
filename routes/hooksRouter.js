const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const HookEvents = require("../models/hooksModel");
const axios = require('axios');
const socketIOClient= require("socket.io-client")
const socket = socketIOClient();


const getLatestEvents = async(username) =>{
  const filter = { username: req.query.username }
  const hookevents = await HookEvents.find(filter).limit(10)
  return hookevents
}

router.post("/customer/new", async (req, res) => {
  try {
    const { customer } = req.body;
    // console.log(req)
    // console.log(customer)
    var sdata = {
      eventType: "customer",
      eventEnum: "success",
      eventFrom: "Americommerce",
      eventData: customer,
      eventTo: "MLM"
    }
    const newHookEvent = new HookEvents(sdata)
    const savedEvent = await newHookEvent.save();
    const curEvents=getLatestEvents(username)
    socket.emit("backenddata", curEvents)
    console.log(curEvents)    
    res.json(savedEvent)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/customer/update", async (req, res) => {
  try {
    const { customer } = req.body;
    // console.log(req)
    // console.log(customer)
    var sdata = {
      eventType: "customer",
      eventEnum: "update",
      eventFrom: "Americommerce",
      eventData: customer,
      eventTo: "MLM"
    }
    const newHookEvent = new HookEvents(sdata)
    const savedEvent = await newHookEvent.save();
    console.log(savedEvent)
    res.json(savedEvent)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/customer/fail", async (req, res) => {
  try {
    const { customer } = req.body;
    // console.log(req)
    // console.log(customer)
    var sdata = {
      eventType: "customer",
      eventEnum: "fail",
      eventFrom: "Americommerce",
      eventData: customer,
      eventTo: "MLM"
    }
    const newHookEvent = new HookEvents(sdata)
    const savedEvent = await newHookEvent.save();
    console.log(savedEvent)
    res.json(savedEvent)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/payment/new", async (req, res) => {
  try {
    const { order_payment } = req.body;
    const mlmresp = await axios.post("https://demo3.infinitemlmdemo.com/webhook/",req.body)
    // console.log(req)
    // console.log(customer)
    var sdata = {
      eventType: "payment",
      eventEnum: "success",
      eventFrom: "Americommerce",
      eventData: order_payment,
      eventTo: "MLM"
    }
    const newHookEvent = new HookEvents(sdata)
    const savedEvent = await newHookEvent.save();
    console.log(savedEvent)
    res.json(savedEvent)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/events", auth, async (req, res) => {
  const filter = { username: req.query.username }
  const curEvents = await HookEvents.find(filter).limit(10)
  // console.log(curEvents)
  res.json({
    curEvents
  });
});
module.exports = router;
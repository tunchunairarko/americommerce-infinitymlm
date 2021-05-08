const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const HookEvents = require("../models/hooksModel");
const axios = require('axios');

const axiosRetry = require('axios-retry');



axiosRetry(axios, {
  retries: 10, // number of retries
  retryDelay: (retryCount) => {
    // console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) => {
    // if retry condition is not specified, by default idempotent requests are retried
    return error.response.status === 503;
  },
});

const getLatestEvents = async() =>{
  
  const hookevents = await HookEvents.find().sort({ _id: -1 }).limit(10)
  return hookevents
}

router.post("/customer/new", async (req, res) => {
  const io = req.app.get("socketio")
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
    const curEvents= await getLatestEvents()
    io.on("connection", (socket) => {
      console.log(curEvents)
      socket.broadcast.emit("frombackend", curEvents)
    })
    // io.emit("frombackend", curEvents)
    // console.log(curEvents)    
    res.json(savedEvent)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// router.post("/customer/update", async (req, res) => {
//   try {
//     const { customer } = req.body;
//     // console.log(req)
//     // console.log(customer)
//     var sdata = {
//       eventType: "customer",
//       eventEnum: "update",
//       eventFrom: "Americommerce",
//       eventData: customer,
//       eventTo: "MLM"
//     }
//     const newHookEvent = new HookEvents(sdata)
//     const savedEvent = await newHookEvent.save();
//     console.log(savedEvent)
//     res.json(savedEvent)
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/customer/upsert", async (req, res) => {
  try {
    const io = req.app.get("socketio")
    const { customer } = req.body;
    // console.log(req)
    console.log(req.body)
    const headers = { headers: {"X-AC-Auth-Token":process.env.AMCOM_API, "Content-type":"application/json"} }
    console.log(headers)
    const posturl = "https://fashionsociety.americommerce.com/api/v1/customers"
    const data ={
      
        email: req.body.email,
        store_id: req.body.store_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
      
    } 
    const resp = await axios.post(
      posturl,
      data,
      headers
    )
    console.log(resp)
    var sdata = {
      eventType: "customer",
      eventEnum: "new/uodate",
      eventFrom: "MLM",
      eventData: req.body,
      eventTo: "Americommerce"
    }
    const newHookEvent = new HookEvents(sdata)
    const savedEvent = await newHookEvent.save();
    const curEvents=await getLatestEvents()
    io.on("connection", (socket) => {
      console.log(curEvents)
      socket.broadcast.emit("frombackend", curEvents)
    })
    res.json(resp.data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

// router.post("/customer/fail", async (req, res) => {
//   try {
//     const { customer } = req.body;
//     // console.log(req)
//     // console.log(customer)
//     var sdata = {
//       eventType: "customer",
//       eventEnum: "fail",
//       eventFrom: "Americommerce",
//       eventData: customer,
//       eventTo: "MLM"
//     }
//     const newHookEvent = new HookEvents(sdata)
//     const savedEvent = await newHookEvent.save();
//     console.log(savedEvent)
//     res.json(savedEvent)

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/orders/approved", async (req, res) => {
  try {
    const io = req.app.get("socketio")
    const { order } = req.body;
    const mlmresp = await axios.post("https://myfashiondealersociety.com/backoffice/register/store_call_back",req.body)
    // console.log(req)
    // console.log(customer)
    var sdata = {
      eventType: "order",
      eventEnum: "success",
      eventFrom: "Americommerce",
      eventData: order,
      eventTo: "MLM"
    }
    const newHookEvent = new HookEvents(sdata)
    const savedEvent = await newHookEvent.save();
    const curEvents= await getLatestEvents()
    io.on("connection", (socket) => {
      console.log(curEvents)
      socket.broadcast.emit("frombackend", curEvents)
    })
    res.json(savedEvent)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/payment/new", async (req, res) => {
  try {
    const io = req.app.get("socketio")
    const { order_payment } = req.body;
    const mlmresp = await axios.post("https://myfashiondealersociety.com/backoffice/register/store_call_back",req.body)
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
    const curEvents=await getLatestEvents()
    io.on("connection", (socket) => {
      console.log(curEvents)
      socket.broadcast.emit("frombackend", curEvents)
    })
    res.json(savedEvent)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/events", auth, async (req, res) => {
  const curEvents = await HookEvents.find().sort({ _id: -1 }).limit(10)
  // console.log(curEvents)
  res.json({
    curEvents
  });
});

module.exports=router

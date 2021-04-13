const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const HookEvents = require("../models/hooksModel");
const axios = require('axios');

router.post("/customer/new", async (req, res) => {
    try {
        const { data } = req.body;
        var sdata={
            eventType:"customer",
            eventEnum: "success",
            eventFrom: "Americommerce",
            eventData: data,
            eventTo: "MLM"
        }
        const newHookEvent = new HookEvents(sdata)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/customer/new/fail", async (req, res) => {
    try {
        const { data } = req.body;
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;
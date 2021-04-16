const router = require("express").Router();
const auth = require("../middleware/auth");
const Settings = require("../models/SettingsModel");

function dumpError(err) {
    if (typeof err === 'object') {
        if (err.message) {
            console.log('\nMessage: ' + err.message)
        }
        if (err.stack) {
            console.log('\nStacktrace:')
            console.log('====================')
            console.log(err.stack);
        }
    } else {
        console.log('dumpError :: argument is not an object');
    }
}
router.get("/", auth, async (req, res) => {
    const filter = { username: req.query.username }
    const settings = await Settings.findOne(filter);
    res.json({
        settings
    });
});
router.post("/update", auth, async (req, res) => {
    try {
        let { username, amcomApi, mlmWebHook, activeState } = req.body;
        if (!username) {
            username = "admin"
        }

        const filter = { username: username }
        const checkIfExists = await Settings.findOne()
        if (checkIfExists == null) {
            const data = {
                username: username,
                amcomApi: amcomApi,
                mlmWebHook: mlmWebHook,
                activeState: activeState
            }
            const newSettings = new Settings(data)
            let savedSettings = await newSettings.save()
            res.json(savedSettings)
        }
        else {
            const update = { amcomApi: amcomApi, mlmWebHook: mlmWebHook, activeState: activeState }
            let doc = await Settings.findOneAndUpdate(filter, update)
            res.json(doc);
        }

    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})

router.post("/changestate", auth, async (req, res) => {
    try {
        let { username, activeState } = req.body;
        if (!username) {
            username = "admin"
        }

        const filter = { username: username }

        const update = { activeState: activeState }
        let doc = await Settings.findOneAndUpdate(filter, update)
        res.json(doc);


    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;
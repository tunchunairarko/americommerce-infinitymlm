const router = require("express").Router();
const auth = require("../middleware/auth");
const { PythonShell } = require('python-shell');
const path = require('path');
const Products = require("../models/productModel");
const UserProducts = require("../models/userPostedProducts");
var Barcoder = require('barcoder');


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

function isAsin(strText) {
    
    var asinPattern = new RegExp(/^(B[\dA-Z]{9}|\d{9}(X|\d))$/);
    var arrMatches = strText.match(asinPattern);
    // console.log(arrMatches)
    if(arrMatches){
        if (arrMatches[0] == strText) {
            return true;
        }
    }
    return false;
}

function isUPC(strText) {
    // var validator = new Barcoder('ean13');
    var res=Barcoder.validate( strText )
    return res;
}

router.post("/new", auth,  async (req, res) => {
    try {
        let { username, productInp } = req.body;
        if(!username){
            username="admin"
        }
        // console.log(user)
        console.log(productInp)
        

        var productString = JSON.stringify(productInp)

        let options = {
            mode: 'json',
            pythonPath: process.env.PYTHON_PATH,
            pythonOptions: ['-u'], // get print results in real-time 
            scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
            args: [productString] //An argument which can be accessed in the script using sys.argv[1] 
        };
        PythonShell.run('shopifyUpload.py', options, function (err, result) {
            if (err) throw err;

            // console.log('result: ', result); 
            // res.send(result[0])
            // const response = await axios.post(api_url,productDetails)
            
            try {
                const resp = result[0]
                console.log(resp)
                const newProduct = new Products({
                    shopifyID: resp['product']['id'],
                    upc: productInp.upc,
                    sku: productInp.sku,
                    title: productInp.title,
                    retail: productInp.retail,
                    discounted_price: productInp.discounted_price,
                    image: productInp.image,
                    description: productInp.description,
                    condition: productInp.condition,
                    quantity: productInp.quantity,
                    categories: [""]
                });
                const savedProduct = newProduct.save();

                const newUserProduct = new UserProducts({
                    username: username,
                    posted_products: resp['product']['id']
                });

                const saveUserProduct = newUserProduct.save();

                res.json(resp)
            } catch (err) {
                dumpError(err)
                res.status(500).json({ error: err.message })
            }
        });
    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }



})

router.post("/productlist", auth,  async (req, res) => {
    try {

        //at first get the query
        //then check whether it is a upc/asin or a text string with space
        //1. If UPC, then follow one process (Sellerchamp way, if this one works, then no search list should be generated in the front end)
        //2. If text string, then follow another process (Product Data API way)
        const { searchQuery, marketplace } = req.body;
        if(!searchQuery){
            res.status(400).json({error:"Missing query data"})
        }
        // console.log(req.body)
        marketplaceString = JSON.stringify(marketplace)
        var query = searchQuery.toString();
        console.log(query)
        // console.log("12")
        
        if (isAsin(query)) {
            // console.log("gaitai")
            // let dir = path.join(__dirname, '../python');
            // console.log(dir);
            // console.log(process.env.PYTHON_PATH);
            queryType="ASIN"
            let options = {
                mode: 'json',
                pythonPath: process.env.PYTHON_PATH,
                pythonOptions: ['-u'], // get print results in real-time 
                scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
                args: [query, queryType, marketplaceString] //An argument which can be accessed in the script using sys.argv[1] 
            };
            PythonShell.run('apiController.py', options, function (err, result) {
                if (err) throw err;
                console.log('result: ', result); 
                res.send(result[0])
            });

        }
        else if(isUPC(query)){
            // let dir = path.join(__dirname, '../python');
            // console.log(dir);
            // console.log(process.env.PYTHON_PATH);
            queryType="UPC"
            let options = {
                mode: 'json',
                pythonPath: process.env.PYTHON_PATH,
                pythonOptions: ['-u'], // get print results in real-time 
                scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
                args: [query, queryType, marketplaceString] //An argument which can be accessed in the script using sys.argv[1] 
            };
            PythonShell.run('apiController.py', options, function (err, result) {
                if (err) throw err;
                console.log('result: ', result); 
                res.send(result[0])
            });
        }
         
        else {
            queryType="KEYWORD"
            let options = {
                mode: 'json',
                pythonPath: process.env.PYTHON_PATH,
                pythonOptions: ['-u'], // get print results in real-time 
                scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
                args: [query, queryType, marketplaceString] //An argument which can be accessed in the script using sys.argv[1] 
            };
            PythonShell.run('apiController.py', options, function (err, result) {
                if (err) throw err;
                console.log('result: ', result); 
                res.send(result[0])
            });
        }
    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
});

router.get("/getsku", auth, async (req, res) => {
    var DocCounter = await Products.countDocuments({})
    DocCounter++;
    console.log(DocCounter)
    const sku = "BTZ" + DocCounter.toString().padStart(7, "0");
    
    res.json({
        sku: sku
    });
    
})

router.post("/dashboarddata", auth, async (req, res) =>{
    const { username } = req.body;
    // console.log(username)
    const userPostedProductsCount = await UserProducts.countDocuments({username:username})
    const totPostedProductsCount = await Products.countDocuments({})

    const resData = await UserProducts.aggregate([
        {$group :{_id:"$username","count":{$sum:1}}},
        {$sort:{"count":-1}},
        {$limit : 5}]
    )
    const bestPoster = resData[0]._id
    const bestPosterCount=resData[0].count
    res.json({userPostedProductsCount,totPostedProductsCount,bestPoster,bestPosterCount})
})


module.exports = router;
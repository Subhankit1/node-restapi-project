const express = require ("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

var port = process.env.PORT || 3000;


//import routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//mongoDB connection
mongoose.connect("mongodb://localhost:27017/node-rest-api", {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex:true
    }
).then(()=>{
    console.log('Database connected');
});

//use middleware for parsing model data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow CORS Origin or Preventing CORS error in browser
app.use((req,res,next) => {
    res.header('Access-Coontrol-Allow-Origin', '*');       
    res.header('Access-control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');   //Allow All type of request
        return res.status(200).json({});
    }
    next();
});

//routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);






/*   Test server

app.get('/', (req,res) => {
    res.status(200).json({
        message: 'hello from server'
    });
});
*/

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
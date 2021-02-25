const Product = require('../models/products');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products');

const { connect } = require('mongoose');

dotenv.config({path:'src/backend/config/config.env'});

connectDatabase();

const seedProducts = async () => {
    try{
        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products);
        console.log('All products are added');
        
        process.exit();

    } catch(error){
        console.log(error.message);
        process.exit()
    }
}

seedProducts();
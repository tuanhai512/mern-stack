const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true , 'Please enter product name'],
        trim:true,
        maxLength:[100, 'Product name cannot excess 100 character']
    },
    price:{
        type: Number,
        required : [true , 'Please enter product price'],
        trim:true,
        maxLength:[5, 'Product name cannot excess 5 character']
    },
    description:{
        type: String,
        required : [true , 'Please enter product name'],
 
    },
    ratings :{
        type:Number,
        default : 0,
    },
    images:[
        {
            public_id:{
                type:String,
                required : true,
            },
            url:{
                type:String,
                required : true,
            },
        }
    ],
    category:{
        type:String,
        required:[true, 'Please select category for this product'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Food',
                'Accessories',
                'Headphone',
                'Clothes',
                'Healthy'
            ],
            message:'Please select correct category for product'
        }
    },
    seller:{
        type:String,
        required:[true,'Please enter products seller']
    },
    stock:{
        type:Number,
        required:[true,'Please enter products stock'],
        maxLength:[5,'Product name cannot excess 5 character'],
        default :0
    },
    numOfReviews:{
        type:Number,
        default : 0
    },
    reviews:[
       {
           name:{
               type:String,
               required:true,
           },
           ratings:{
                type:Number,
                required:true,
           },
           comments:{
               type:String,
               required:true
           }   
       }
    ],
    createdAt:{
        type:Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Product',productSchema)
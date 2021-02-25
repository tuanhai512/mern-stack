const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/products');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/appFeatures')


//Created new products => api/v1/admin/product/new
exports.newProduct = catchAsyncError ( async (req,res,next)=>{

    const product = await Product.create(req.body);
    
    res.status(201).json({
        success : true,
        product 
    })
})

// Get all products => api/v1/products
exports.getProducts = catchAsyncError ( async (req,res,next) => {
    
    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                    .search()
                    .filter()
                    .pagination(resPerPage)
                        

    const products = await apiFeatures.query;

    res.status(200).json({
        success : true,
        count: products.length,
        products
    })
})

//Get single products detail => api/v1/products/:id
exports.getSingleProducts = catchAsyncError ( async (req,res,next) => {

    const products = await Product.findById(req.params.id)

    if(!products){
        return next(new ErrorHandler('Products not found',404));
    }
    res.status(200).json({
        success : true,
        products
    })
})

//Update products => api/v1/admin/products/:id
exports.updateProduct =  catchAsyncError ( async (req,res,next) => {

    let products = await Product.findById(req.params.id)

    if(!products){
        return next(new ErrorHandler('Products not found',404));
    }
    products = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success:true,
        products
    })
})

//Delete product => api/v1/admin/products/:id
exports.deleteProduct = catchAsyncError ( async (req,res,next) => {

    const products = await Product.findById(req.params.id)

    if(!products){
        return next(new ErrorHandler('Products not found',404));
    }
    await Product.remove();

    res.status(200).json({
        success:true,
        message :"Product is delete "
    })
})
class APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr
    }
    //tìm kiếm sản phẩm
    search(){
        const keyword = this.queryStr.keyword ? {
            name :{
                $regex : this.queryStr.keyword,
                $options:'i'
            }
        }:{}

        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }
    //lọc sản phẩm
    filter(){
        const queryCopy = { ...this.queryStr };

        //Removing fields from query
        const removeFields = [ 'keyword','limit','page' ]
        removeFields.forEach( el => delete queryCopy[el] );

        console.log(queryCopy);

        //Advance filter for prices,ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    //phân trang
    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1 ;

        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
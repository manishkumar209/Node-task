import productSchema from '../model/products.model';

// Get all products
export const allProducts = (req, res) => {
    try {
        productSchema.find().populate('category').exec((err, result) => {
            if (result && result.length > 0) {
                var data = result;
                return res.json({ 'success': true, 'ProductList': data });
            } else {
                return res.json({ 'success': false, 'message': 'No product found' });
            }
        })
    } catch (err) {
        console.log(err);
    }
}


// Add new product
export const addProduct = (req, res) => {
    try {
        // First check product assiciated with any category if yes, then update existing
        productSchema.findOne({$and:[{product_name: req.body.product_name},{category:req.body.category}]}).exec((err, resultMatch) => {
            if(resultMatch){
                var obj = resultMatch;
                obj.quantity = obj.quantity + req.body.quantity;
                productSchema.updateOne({_id:resultMatch},{$set:obj},{new:false},(err,result)=> {
                    if(result){
                        return res.json({ 'success': true, 'message': 'Product updated in existing' });
                    }else{
                        return res.json({ 'success': false, 'message': 'Error in add new product' });

                    }
                });
            }else{
                // Add new if does not exist
                var newObj = new productSchema(req.body);
                newObj.save((err, result) => {
                    if (result) {
                        return res.json({ 'success': true, 'message': 'New product added' });
                    } else {
                        return res.json({ 'success': false, 'message': 'Error in add new product' });
                    }
                })
            }
        })
    } catch (err) {
        console.log(result);
    }
}

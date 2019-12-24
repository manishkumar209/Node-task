import categorySchema from '../model/categories.model';
import productSchema from '../model/products.model';

// Get all category
export const allCategory = (req, res) => {
    try {
        categorySchema.find().exec((err, result) => {
            if (result) {
                console.log(result)
                var data = result;
                return res.json({ 'success': true, 'categoryList': data });
            } else {
                return res.json({ 'success': false, 'message': 'No any category found' });
            }
        })
    } catch (err) {
        console.log(err);
    }
}

// Add new category
export const addCategory = (req, res) => {
    try {
        categorySchema.findOne({category_name: req.body.category_name}).exec((err, matchResult) => {
            if(matchResult){
                return res.json({'success': false,'message':'Category already added'});
            }else{
                var newObj = new categorySchema(req.body);
                newObj.save((err, result) => {
                    if (result) {
                        return res.json({ 'success': true, 'message': 'New category added' });
                    } else {
                        return res.json({ 'success': false, 'message': 'Error in add new category' });
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}

// Delete category
export const deleteCategory = (req, res) => {
    try {
        var category_id = req.params.id;
        // Find product associated with category
        productSchema.find({ category: category_id }).exec((err, product_data) => {
            if (product_data && product_data.length > 0) {
                var productList = product_data;
                // Delete all product associated with category
                productSchema.deleteMany({ category: category_id }).exec((err, deleted_result) => {
                    if (deleted_result) {
                        // Delete category
                        categorySchema.deleteOne({ _id: category_id }).exec((err, result) => {
                            if (result) {
                                // return success with deleted items
                                return res.json({ 'success': true, 'Deleted items are': productList });
                            } else {
                                return res.json({ 'success': false, 'message': 'No category found to be delete _id with : ' + category_id });
                            }
                        })
                    } else {
                        return res.json({ 'success': false });
                    }
                })
            }else{
                categorySchema.deleteOne({ _id: category_id }).exec((err, result) => {
                    if (result) {
                        // return success with deleted items
                        return res.json({ 'success': true, 'message':'Category deleted, no any product in this category' });
                    } else {
                        return res.json({ 'success': false, 'message': 'No category found to be delete _id with : ' + category_id });
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
    }

}

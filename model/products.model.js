import mongoose from 'mongoose';
var Schema = mongoose.Schema({
    product_name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categorySchema' },
    quantity: {type:Number, default: 0},
    active: { type: Boolean, default: true },
})
export default mongoose.model('productSchema', Schema);
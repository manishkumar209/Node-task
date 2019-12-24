import mongoose from 'mongoose';
var Schema = mongoose.Schema({
    category_name: String,
    active: { type: Boolean, default: true },
})
export default mongoose.model('categorySchema', Schema);
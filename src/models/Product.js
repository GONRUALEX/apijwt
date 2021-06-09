import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String
},{
    versionKey: false,
    timestamps: true
});

export default model('Product',productSchema);
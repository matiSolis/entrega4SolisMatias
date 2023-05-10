import mongoose from "mongoose";

const collection = 'Carts';

const schema = new mongoose.Schema({
    products:{
        type: [
            {
                product:{
                    type: String,
                    ref: "products",
            },
            quantity: Number,
            }
        ],
        default: []
    }
});

const cartModel = mongoose.model(collection, schema);
export default cartModel;
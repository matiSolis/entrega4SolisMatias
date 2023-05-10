import mongoose from "mongoose";

const collection = 'Carts';

const schema = new mongoose.Schema({
    products:{
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                    required: true
                },
                quantity:{
                    type: Number,
                    required: true,
                    default:1
                }
            }
        ],
        default: []
    }
});

const cartModel = mongoose.model(collection, schema);
export default cartModel;
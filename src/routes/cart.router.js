import { Router } from "express";
import ManagerAcces from "../Dao/managers/managerAcces.js";
import cartModel from "../Dao/models/cart.model.js";
import productModel from "../Dao/models/products.model.js";

const router = Router();
const managerAcces = new ManagerAcces();

router.get('/', async (req, res) => {
    try {
        await managerAcces.createRecord('GET CARTS');
        const result = await cartModel.find();
        res.status(200).send({result});
    }catch(error){
        res.status(400).send({
            status: "Error",
            msg: `El total de carritos no se puede visualizar.`
        });
    }
});
router.get('/:id', async (req, res) => {
    try{
        await managerAcces.createRecord('GET CART BY ID');
        const id = req.params.id;
        const result = await cartModel.find({_id:id});
        res.status(200).send({result});
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carro solicitado no se pueden visualizar.`
        });
    }
});
router.post('/', async (req, res) => {
    try{
        await managerAcces.createRecord('NEW CART CREATED');
        const cart = {products: []};
        const result = await cartModel.create(cart);
        res.status(200).send({result});
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carrito solicitado no se puede visualizar.`
        });
    }
});
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const findProduct = await productModel.findOne({_id: idProduct});
        const alreadyInCart = await cartModel.findOne({products: {$elemMatch: {product: findProduct._id}}});
        if (!alreadyInCart) {
            const result = await cartModel.updateOne({_id: idCart}, {$push: {products: {product: findProduct._id, quantity: 1}}});
            res.status(200).send({result});
        } else {
            alreadyInCart.products.find(p => p.product.equals(findProduct._id)).quantity += 1;
            await alreadyInCart.save();
            res.status(200).send({result: alreadyInCart});
        };
        await managerAcces.createRecord('PUT PRODUCT IN CART');
    } catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto solicitado no se puede agregar en el carro indicado.`
        });
    };
});
router.delete('/:id', async (req, res) => {
    try {
        await managerAcces.createRecord('REMOVED CART');
        const id = req.params.id;
        const result = await cartModel.deleteOne({_id:id});
        res.status(200).send({result});
    } catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto no se ha podido eliminar.`
        });
    }
});
export default router;
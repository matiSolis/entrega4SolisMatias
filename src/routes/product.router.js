import { Router } from "express";
import ManagerAcces from "../Dao/managers/managerAcces.js";
import productModel from "../Dao/models/products.model.js";

const router = Router();
const managerAcces = new ManagerAcces();

router.get('/', async (req, res)=>{
    try{
        await managerAcces.createRecord('GET PRODUCTS');
        const result = await productModel.find();
        res.status(200).send({result});
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `Los productos solicitados no se pueden visualizar.`
        });
    }
});
router.get('/:id', async (req, res)=>{
    try{
        await managerAcces.createRecord('GET PRODUCT BY ID');
        const id = req.params.id;
        const result = await productModel.findOne({_id:id});
        res.status(200).send({result});
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto no existe o no se pudo encontrar.`
        });
    }
});
router.post('/' , async (req, res)=>{
    try{
        await managerAcces.createRecord('NEW PRODUCT CREATED');
        const {title, description, price, thumbnail, code, stock} = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock){
            return res.status(400).send({error: 'Datos incompletos'});
        }
        const product = {title, description, price, thumbnail, code, stock};
        const result = await productModel.create(product);
        res.status(200).send({result});
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: error.message
        });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await managerAcces.createRecord('REMOVED PRODUCT');
        const id = req.params.id;
        const result = await productModel.deleteOne({_id:id});
        res.status(200).send({result});
    } catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto no se ha podido eliminar.`
        });
    }
});
router.put('/:id', async (req, res)=>{
    try{
        await managerAcces.createRecord('UPDATE PRODUCT');
        const id = req.params.id;
        const updateProduct = req.body;
        const result = await productModel.updateOne({_id: id}, {$set: updateProduct});
        res.status(200).send({result});
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: `El producto no se ha podido actualizar.`
        });
    }
});
export default router;
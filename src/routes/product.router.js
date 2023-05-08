import { Router } from "express";
import ManagerAccess from "../Dao/managers/managerAcces.js";
import productModel from "../Dao/models/products.model.js";
//import ProductManager from "../Dao/managers/productManager.js";

const router = Router();
const managerAccess = new ManagerAccess();
//const productManager = new ProductManager();

router.get('/', async (req, res)=>{
    try{
        //MODO VIEJO
        //const products = await productManager.getProducts();
        await managerAccess.createRecord('GET PRODUCTS');
        const result = await productModel.find();
        return res.status(200).send({result});
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `Los productos solicitados no se pueden visualizar.`
        });
    }
});
router.get('/:pid', async (req, res)=>{
    try{
        //MODO VIEJO
        //const pid = req.params.pid;
        //res.status(200).send(await productManager.getProductById(pid));
        await managerAccess.createRecord('GET PRODUCT BY ID');
        const id = req.params.pid;
        const result = await productModel.find({_id:id});
        res.status(200).send({result});
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no existe o no se pudo encontrar.`
        });
    }
});
router.post('/' , async (req, res)=>{
    try{
        //MODO VIEJO
        //return res.status(200).send(await productManager.addProduct({ title, description, price, thumbnail, code, stock }));
        await managerAccess.createRecord('NEW PRODUCT CREATED');
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
router.delete('/:pid', async (req, res) => {
    try {
        //MODO VIEJO
        //const pid = req.params.pid;
        //const product = await productManager.getProductById(pid);
        //return res.status(200).send(await productManager.deleteProduct(pid));
        await managerAccess.createRecord('REMOVED PRODUCT');
        const id = req.params.id;
        const result = await productModel.deleteOne({_id:id});
        res.status(200).send({result});
    } catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no se ha podido eliminar.`
        });
    }
});
router.put('/:pid', async (req, res)=>{
    try{
        //MODO VIEJO
        //const pid = req.params.pid;
        //const updates = req.body;
        //res.status(200).send(await productManager.updateProduct(pid, updates));
        await managerAccess.createRecord('UPDATE PRODUCT');
        const id = req.params.id;
        const updateProduct = req.body;
        const result = await productModel.updateOne({_id: id}, {$set: updateProduct});
        res.status(200).send({result});
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no se ha podido actualizar.`
        });
    }
});
export default router;
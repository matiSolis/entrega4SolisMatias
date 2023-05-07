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
        const limit = parseInt(req.query.limit);
        if (limit){
            const productNumber = products.slice(0, limit);
            return res.status(200).send(productNumber);
        }else{
            return res.status(200).send(products);
        }
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `Los productos solicitados no se pueden visualizar.`
        });
    }
});
router.get('/:pid', async (req, res)=>{
    try{
        await managerAccess.createRecord('GET PRODUCT BY ID');
        //MODO VIEJO
        //const pid = req.params.pid;
        //res.status(200).send(await productManager.getProductById(pid));
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no existe o no se pudo encontrar.`
        });
    }
});
router.post('/' , async (req, res)=>{
    try{
        await managerAccess.createRecord('POST PRODUCTS');
        //MODO VIEJO
        //return res.status(200).send(await productManager.addProduct({ title, description, price, thumbnail, code, stock }));
        const {title, description, price, thumbnail, code, stock} = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock){
            return res.status(400).send({error: 'Datos incompletos'});
        }
        const product = {title, description, price, thumbnail, code, stock};
        const result = await productModel.create(product);
        res.status(200).send(result);
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: error.message
        });
    }
});
router.delete('/:pid', async (req, res) => {
    try {
        await managerAccess.createRecord('DELETE PRODUCT');
        //MODO VIEJO
        //const pid = req.params.pid;
        //const product = await productManager.getProductById(pid);
        if (product.length === 0) {
            return res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no existe o no se pudo encontrar.`
        });
    }
    //MODO VIEJO
    //return res.status(200).send(await productManager.deleteProduct(pid));
    } catch (error) {
    res.status(400).send({
        status: "Error",
        msg: `El producto con ID: ${pid} no se ha podido eliminar.`
    });
    }
});
router.put('/:pid', async (req, res)=>{
    try{
        await managerAccess.createRecord('PUT');
        //MODO VIEJO
        //const pid = req.params.pid;
        //const updates = req.body;
        //res.status(200).send(await productManager.updateProduct(pid, updates));
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no se ha podido actualizar.`
        });
    }
});
export default router;
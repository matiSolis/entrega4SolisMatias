import { Router } from "express";
import CartManager from "../Dao/managers/cartManager.js";
import ManagerAccess from "../Dao/managers/managerAcces.js";

const router = Router();
const cartManager = new CartManager();
const managerAccess = new ManagerAccess();

router.get('/', async (req, res) => {
    try {
        await managerAccess.createRecord('GET CARTS');
        //MODO VIEJO
        //return res.status(200).send(await cartManager.getCarts());
    }catch(error){
        res.status(400).send({
            status: "Error",
            msg: `El total de carritos no se puede visualizar.`
        });
    }
});
router.get('/:cid', async (req, res) => {
    try{
        await managerAccess.createRecord('GET CARTS BY ID');
        //MODO VIEJO
        //const cid = req.params.cid;
        //return res.status(200).send(await cartManager.getCartById(cid));
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carro solicitado no se pueden visualizar.`
        });
    }
});
router.post('/', async (req, res) => {
    try{
        await managerAccess.createRecord('POST CART');
        //MODO VIEJO        
        //return res.status(200).send(await cartManager.addCart());
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carrito solicitado no se puede visualizar.`
        });
    }
});
router.post('/:cid/product/:pid', async (req, res) => {
    try{
        await managerAccess.createRecord('POST PRODUCT IN CART');
        //MODO VIEJO
        //const idCart = req.params.cid;
        //const idProduct = req.params.pid;
        return res.status(200).send(await cartManager.addProductToCart(idCart, idProduct));
    }catch(error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto solicitado no se puede agregar en el carro indicado.`
        });
    }
});
export default router;
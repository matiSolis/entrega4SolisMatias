import { Router } from "express";
import messagesModel from "../Dao/models/messages.model.js";
import ManagerAcces from "../Dao/managers/managerAcces.js";

const router = Router();
const managerAcces = new ManagerAcces();

router.get('/', async (req, res) => {
    try {
        await managerAcces.createRecord('GET MESSAGES');
        const messages = await messagesModel.find();
        res.status(200).render('chat', {messages});
    }catch (err) {
        res.status(400).send({
            status: "Error",
            msg: `Los mensajes no se pueden visualizar.`
        });
    }
});
export default router;
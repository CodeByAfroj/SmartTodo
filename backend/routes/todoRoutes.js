import e from "express";
import { create ,showAll,del} from "../controller/todoController.js";

const route = e.Router();
route.post('/add',create);

route.get('/view',showAll);
route.delete('/delete/:id',del);

export default route;
import { userLogin, userRegister } from "../controllers/user.controller.js";

export function userRoute(app){
    app.post('/api/register',userRegister);
    app.post('/api/login',userLogin);
    
}
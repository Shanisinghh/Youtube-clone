
import { fetchUser, userLogin, userRegister, logout, updateUaer,  } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
export function userRoute(app){
    app.post('/api/register',userRegister);
    app.post('/api/login',userLogin);
    app.get('/api/user',verifyToken,fetchUser);
    app.post("/api/logout", logout);
    app.put("/api/user/:channelId",verifyToken,updateUaer);
  
    
}
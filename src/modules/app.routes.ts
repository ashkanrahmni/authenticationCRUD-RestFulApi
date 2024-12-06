import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async(req:Request,res:Response)=>{
    res.redirect('/auth/register')
});


export default router;

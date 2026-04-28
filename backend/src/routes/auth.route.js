import { Router } from "express";
import passport from "passport";
import { googleAuthCallback } from "../controllers/auth.controller.js";


const authRouter = Router();



authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }), googleAuthCallback);

export default authRouter;
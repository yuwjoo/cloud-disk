import { Router } from "express";
import { proxyMiddleware } from "./middleware/proxyMiddleware";

const router = Router();

router.all("/proxy-server", proxyMiddleware);

export default router;

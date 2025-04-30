import { json, Router } from "express";
import { proxyMiddleware } from "./middleware/proxyMiddleware";

const router = Router();

router.all("/proxy-server", proxyMiddleware);

router.get("/test", (res, req) => {
  console.log(res.query);
  req.send("hello world 你好世界");
});

router.post("/test1", json(), (res, req) => {
  console.log(res.body);
  req.json({
    msg: "hello world 你好世界"
  });
});

export default router;

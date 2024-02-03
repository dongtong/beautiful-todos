import { Router } from "express";

const router = Router();

/**
 * Check system healtch for monitor
 */
router.get("/healthcheck", (req, res) => {
  res.json({
    statusCode: 200,
    message: "OK",
  });
});

export default router;

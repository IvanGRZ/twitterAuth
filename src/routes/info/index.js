import express from "express";

const router = express.Router();

router.get("/info", (req, res) => {
  try {
    const args = process.argv.length > 2 ? process.argv.slice(2).join(", ") : "ninguno";
    return res.status(200).json(
      {
        args:  args,
        process: process
      }
    );
  
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `${httpStatus[500]}: Internal error`,
    });
  }
});

export default router;

import express from "express";
import { fork } from 'child_process';
import {random} from '../../utils/random.js';

const router = express.Router();

router.get("/random", (req, res) => {
  try {

    const num = req.query.cant || 100;
    const randoms = fork('../../utils/random.js', [num]);
    return res.status(200).json({randoms:randoms});
  
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `${httpStatus[500]}: Internal error`,
    });
  }
});

export default router;

import express from "express";
import { fork } from 'child_process';
import os from 'node:os';

const router = express.Router();

router.get("/random", (req, res) => {
  try {

    const cant = req.query.cant || 100;

    const randomNumbersGeneratorFork = fork('./src/utils/random.js');

    randomNumbersGeneratorFork.on('message', (resultado) => {
      res.status(200).json(resultado);
    
    });
    
    randomNumbersGeneratorFork.send(cant);
    console.log('Lista generada')


  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `${httpStatus[500]}: Internal error`,
    });
  }
});

export default router;

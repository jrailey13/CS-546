// Set-Up Routes

import {Router} from "express";
const router = Router();
import path from "path";

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET to show static HTML file
      res.sendFile(path.resolve('static/webpage.html'));
  })

export default router

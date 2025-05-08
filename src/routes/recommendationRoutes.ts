import express, { Request, Response, Router } from 'express';
import axios from 'axios';

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response): Promise<void> => {
    const { product_name } = req.body;

    if (!product_name) {
        res.status(400).send({ error: 'Product name is required' });
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/recommend', { product_name });
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send({ 
            error: 'Error fetching recommendations', 
            details: (error as Error).message 
        });
    }
});

export default router;
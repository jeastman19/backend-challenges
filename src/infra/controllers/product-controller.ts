import { Request, Response } from 'express';

import { CreateProductDTO } from '@app/dto/create-product-dto';
import { CreateProductService } from '@app/services/create-product-service';

export class ProductController {
    constructor(private createProductService: CreateProductService) {}

    async createProduct(req: Request, res: Response): Promise<Response> {
        try {
            const createProductDTO: CreateProductDTO = req.body;
            const createdProduct =
                await this.createProductService.createProduct(createProductDTO);

            return res.status(201).json(createdProduct);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}

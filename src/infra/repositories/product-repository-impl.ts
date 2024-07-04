import { Product } from '@src/domain/entities/product';
import { ProductRepository } from '@src/domain/repositories/product-repository';
import ProductModel from '../models/product-model';

export class ProductRepositoryImpl implements ProductRepository {
    async save(product: Product): Promise<Product> {
        const productDoc = new ProductModel({
            id: product.id,
            title: product.title,
            description: product.description,
            dueDate: product.dueDate,
            status: product.status,
        });
        const savedProduct = await productDoc.save();
        return Product.create(
            savedProduct.id,
            savedProduct.title,
            savedProduct.description,
            savedProduct.dueDate,
            savedProduct.status,
        );
    }
}

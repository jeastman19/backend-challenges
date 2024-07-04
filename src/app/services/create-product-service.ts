import { CreateProductDTO } from '@app/dto/create-product-dto';
import { ProductMapper } from '@app/maps/product-mapper';
import { CreateProduct } from '@src/domain/use-cases/create-product';
import { CreatedProductDTO } from '../dto/created-product-dto';

export class CreateProductService {
    constructor(
        private createProductUC: CreateProduct,
        private productMapper: ProductMapper,
    ) {}

    async createProduct(
        productData: CreateProductDTO,
    ): Promise<CreatedProductDTO> {
        const productDomain = await this.productMapper.toDomain(productData);
        await this.createProductUC.execute(productDomain);
        return this.productMapper.toCreatedDTO(productDomain);
    }
}

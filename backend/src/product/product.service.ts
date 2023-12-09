import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { IProduct, Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from "./dto/update-product.dto";
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>
  ) {}

  private handleExceptions(error: any) {
    console.warn(error);
    throw new InternalServerErrorException('Unexpected error, please check the logs...');
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productModel.create({ ...createProductDto });
      
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Product successfully created',
        product: product.toJSON<IProduct>()
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll({ limit = 10, page = 1 }: PaginationDto) {
    const count = await this.productModel.countDocuments();
    let products = await this.productModel.find()
                            .limit(limit * 1)
                            .skip((page - 1) * limit)
                            .sort({ name: 1 })
                            .exec();

    return {
      total: count,
      page,
      products: products.map( prd => prd.toJSON<IProduct>() )
    }
  }

  async findOne(key: string) {
    let product: Product;
    if (isValidObjectId(key)) product = await this.productModel.findById(key);
    if (!product) product = await this.productModel.findOne({ name: key });
    if (!product) throw new NotFoundException(`No product found in DB with the given name or ID: [${key}]`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    try {
      if (updateProductDto.name) updateProductDto.name = updateProductDto.name.toLowerCase();
      await product.updateOne(updateProductDto);
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Product successfully updated',
        product: { ...product.toJSON(), ...updateProductDto }
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async delete(id: string) {
    const { deletedCount } = await this.productModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`No product found in DB with the given ID: [${id}]`);
    return;
  }

  async wipeoutDB() {
    await this.productModel.deleteMany({});
  }
}

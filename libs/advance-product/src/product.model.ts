import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ImagesModel } from './images.model';

@Table({
    tableName: 'products',
    timestamps: false,
})
export class ProductModel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: string;
    
    @Column
    title: string;

    @Column
    description: string;

    @Column
    price: number;

    @Column
    discountPercentage: number;

    @Column
    rating: number;

    @Column
    stock: number;

    @Column
    brand: string;

    @Column
    category: string;

    @Column
    thumbnail: string;

    @HasMany(() => ImagesModel, 'productId')
    images: ImagesModel[];
    
}
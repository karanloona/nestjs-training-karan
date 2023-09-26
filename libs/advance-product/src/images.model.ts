import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'images',
    timestamps: false,
})
export class ImagesModel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: string;
    
    @Column
    productId: string;

    @Column
    url: string;

}
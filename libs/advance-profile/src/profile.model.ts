import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'profile',
    timestamps: false,
})
export class ProfileModel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: string;
    
    @Column
    userId: number;
    
    @Column
    username: string;

    @Column
    email: string;

    @Column
    firstname: string;

    @Column
    lastname: string;

    @Column
    gender: string;

    @Column
    image: string;

}
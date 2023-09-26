import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: false,
})
export class AuthModel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: string;
    
    @Column
    username: string;

    @Column
    password: string;

}
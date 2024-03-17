
import UserEntity from "../../../core/entities/userEntity";
import { Table, Index, Model, Column, DataType, HasMany, HasOne, BeforeCreate, BeforeUpdate,} from "sequelize-typescript";
import CreditCardDetails from "./creditCardDetail";
import bcrypt from 'bcrypt';


@Table({tableName: 'users', timestamps: true, paranoid: true, underscored:false})

export default class User extends Model implements UserEntity {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })
    id:number;

    @Index('idx_user_id')
    @Column({
        type: DataType.STRING(75),
        allowNull: false,
    })
    name: string;
    
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique : true
    })
    email: string;

    @Column({
        type: DataType.STRING(36),
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ARRAY,
        allowNull: false,
    })
    photos: string;

    @HasOne(() => CreditCardDetails, 'user_id')
    credit_card_detail : CreditCardDetails

    @BeforeCreate
    @BeforeUpdate
    static encryptPassword(instance: User) {
        if (instance.changed('password')) {
            instance.password = bcrypt.hashSync(instance.password, 10);
        }
    }

    // Method to compare the provided password with the encrypted password
    public comparePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}
import CreditCardDetailsEntity from "../../../core/entities/creditCardDetailsEntity";
import { Table, Index, Model, Column, DataType, BelongsTo, BeforeCreate, BeforeFind, BeforeFind } from "sequelize-typescript";
import User from "./user";
import bcrypt from 'bcrypt';

@Table({tableName: 'credit_card_details', timestamps: true, paranoid: true, underscored:false})

export default class CreditCardDetails extends Model implements CreditCardDetailsEntity {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    })
    id : number 
    
    @Index('idx_user_id')
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        unique : true
    })
    user_id! : number

    @Column({
        type: DataType.STRING(50),
        allowNull : false,
    })
    creditcard_type!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull : false,
    })
    creditcard_number!: string;
    
    @Column({
        type: DataType.STRING(50),
        allowNull : false,
    })
    creditcard_name!: string;
    
    @Column({
        type: DataType.STRING(50),
        allowNull : false,
    })
    creditcard_expired!: string;
    
     @Column({
        type: DataType.STRING(3),
        allowNull : false,
    })
    creditcard_cvv!: string;

    @BelongsTo(() => User, 'id')
    user : User


    @BeforeCreate
    static encryptAttributes(instance: CreditCardDetails) {
        const encryptedAttributes = {
            creditcard_type: bcrypt.hashSync(instance.creditcard_type, 10),
            creditcard_number: bcrypt.hashSync(instance.creditcard_number, 10),
            creditcard_name: bcrypt.hashSync(instance.creditcard_name, 10),
            creditcard_expired: bcrypt.hashSync(instance.creditcard_expired, 10),
            creditcard_cvv: bcrypt.hashSync(instance.creditcard_cvv, 10),
        };
        Object.assign(instance, encryptedAttributes);
    }

    @BeforeFind
    static decryptAttributes(instances: CreditCardDetails[]) {
        instances.forEach(instance => {
            instance.creditcard_type = bcrypt.compareSync(instance.creditcard_type, 10);
            instance.creditcard_number = bcrypt.compareSync(instance.creditcard_number, 10);
            instance.creditcard_name = bcrypt.compareSync(instance.creditcard_name, 10);
            instance.creditcard_expired = bcrypt.compareSync(instance.creditcard_expired, 10);
            instance.creditcard_cvv = bcrypt.compareSync(instance.creditcard_cvv, 10);
        });
    }
}

   
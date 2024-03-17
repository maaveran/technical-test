import { FindOptions } from "sequelize";
import UserEntity from "../../core/entities/userEntity";
import UserRepository, { GetUser } from "../../core/repositories/userRepository";
import User from "./models/user";

interface FindUserOptions extends FindOptions {
    order: [string, 'ASC' | 'DESC'][];
    offset?: number;
    limit?: number;
  }
  
export default class UserSource implements UserRepository {
    async findOneUser(user_id: string): Promise<UserEntity> {
        const user =  await User.findOne({where : {id : user_id}})
        return user;
    }
    async insertUser(params: Omit<UserEntity, "id">): Promise<UserEntity> {
        const user =  await User.create(params)
        return user
    }
    async findAllUser(params: GetUser): Promise<UserEntity[]> {
        const options: FindUserOptions = {
            order: [[params.queryBy ?? 'id', params.orderby ?? "DESC"]],
            offset: params.offset ?? 0,
            limit: params.lt
          };
        const user =  await User.findAll(options)

        return user;
    }
    
    
}
import UserEntity from "../entities/userEntity";

export interface GetUser {
    queryBy? : string, 
    orderby? : "ASC" | "DESC", 
    sortBy? : string,
    offset? : number,
    lt? : number,
}

export default  interface UserRepository {
    insertUser(user : Omit<UserEntity,'id'>) : Promise<UserEntity>
    findAllUser(params : GetUser) : Promise<UserEntity[]>
    findOneUser(user_id : string) : Promise<UserEntity>
}
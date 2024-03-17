import User from "../../data-sources/mysql/models/user";

export default interface UserEntity {
    id: number,
    name: string, 
    address: string,
    email: string,
    password : string,
    photos: string,
    creditCardDetail? : User
}

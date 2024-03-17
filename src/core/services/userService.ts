import UserEntity from "../entities/userEntity";
import UserRepository from "../repositories/userRepository";
import fs from "node:fs"

export default class Billing {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async storeUserData(user : Omit<UserEntity,"id">): Promise<number> {
    fs 
    const tax = await this.userRepository.insertUser(regionA, regionB);

    const cost_per_minute = tax.costPerMinute + (tax.costPerMinute * additionalTaxPerMinute);

    return minutes * cost_per_minute;
  }

}
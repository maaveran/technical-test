import CreditCardDetailsEntity from "../../core/entities/creditCardDetailsEntity";
import CreditCardRepository from "../../core/repositories/creditCardRepository";
import CreditCardDetails from "./models/creditCardDetail";

export default class CreditCardDetailSource implements CreditCardRepository {
    async updateCreditDetail(params: Omit<CreditCardDetailsEntity, "id">, user_id : number): Promise<number[]> {
        const creditcardDetail =  await CreditCardDetails.update(params,{where : {
            user_id
        }})

        return creditcardDetail;
    }
  
}
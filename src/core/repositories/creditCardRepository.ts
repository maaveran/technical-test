import CreditCardDetailsEntity from "../entities/creditCardDetailsEntity";

export default  interface CreditCardRepository {
    updateCreditDetail(user : Omit<CreditCardDetailsEntity,'id'>, user_id : number) : Promise<number[]>
}
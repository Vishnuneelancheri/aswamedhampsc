export class MultipleChceQtnModel { 
    public optionAId:string;
    public optionBId:string;
    public optionCId:string;
    public optionDId:string;
    constructor(
        public question:string,
        public optionA:string,
        public optionB:string,
        public optionC:string,
        public optionD:string,
        public answer:string,
        public anubandham:string
    ){}
    public setOptionAid( id:string) {
          this.optionAId = id;
    } 
    public setOptionBid(id:string) {
        this.optionBId = id;
    } 
    public setOptionCid(id:string) {
        this.optionCId = id;
    } 
    public setOptionDid(id:string) {
        this.optionDId = id;
    } 

    public getOptionAid():string{
        return this.optionAId;
    } 
    public getOptionBid():string{
        return this.optionBId;
    } 
    public getOptionCid():string{
        return this.optionCId;
    } 
    public getOptionDid():string{
        return this.optionDId;
    } 

    

}

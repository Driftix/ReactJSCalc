export class Calculs{
    constructor(n1,op,n2,res) {
        this.n1 = n1;
        this.op = op;
        this.n2 = n2;
        this.res = res;
    }
    addn1(n1){
        this.n1 = n1;
   }
   addOp(op){
        this.op = op;
   }
   addn2(n2){
        this.n2 = n2;
   }
   addRes(res){
        this.res = res;
   }
   getn1(){
        return this.n1;
   }
   getn2(){
        return this.n2;
   }
   getOp(){
        return this.op;
   }
   getRes(){
        return this.res;
   }

}
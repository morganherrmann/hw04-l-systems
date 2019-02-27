
class DrawRules {


    drawRulesMap: Map<string, Map<number, any>> = new Map<string, Map<number, any>>();

    constructor() { }

    newMap(probability : number, drawFunction : any, char: string){
      var probToFunctionMap: Map<number, any> = new Map<number, any>();
      probToFunctionMap.set(probability, drawFunction);
      this.drawRulesMap.set(char, probToFunctionMap);
    }

    addDrawRule(char: string, probability: number, drawFunction: any) {
      var hasChar = this.drawRulesMap.has(char);
        if (hasChar) {
            this.drawRulesMap.get(char).set(probability, drawFunction);
        } else {
            this.newMap(probability, drawFunction, char);
        }
    }


    getDrawRule(char: string): any {

        if (this.drawRulesMap.has(char)) {
            var probToFunctionMap: Map<number, any> = this.drawRulesMap.get(char);
            var rand: number = Math.random();
            var drawRule: any;
            var cumulativeProb: number = 0.0;

            for (const prob of probToFunctionMap.keys()) {

              var isRandom = rand > cumulativeProb;
              var isValid = rand <= cumulativeProb + prob;

                if (isRandom && isValid) {
                    drawRule = probToFunctionMap.get(prob);
                }
                cumulativeProb += prob;
            }
            return drawRule;

        } else {

            return function() : void {};
        }

    }
}

export default DrawRules;

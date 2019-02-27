


class ExpansionRules {


    expMap: Map<string, Map<number, string>> = new Map<string, Map<number, string>>();

    constructor() {}

    // adds expansion rule to map
    createExpRule(startChar: string, str: string, probability: number) {
        if (this.expMap.has(startChar)) {
            var probToStringMap: Map<number, string> = this.expMap.get(startChar);
            probToStringMap.set(probability, str);
        } else {
            var probToStringMap: Map<number, string> = new Map<number, string>();
            probToStringMap.set(probability, str);
            this.expMap.set(startChar, probToStringMap);
        }

    }

    // uses randomly generated number to determine how to expand a character
    getExpansion(startChar: string): string {
        if (this.expMap.has(startChar)) {



            var str: string;
            var probToStringMap: Map<number, string> = this.expMap.get(startChar);
            var rand: number = Math.random();
            var cumulativeProb: number = 0.0;

            for (const prob of probToStringMap.keys()) {

                if (rand > cumulativeProb && rand <= cumulativeProb + prob) {
                    str = probToStringMap.get(prob);
                }
                cumulativeProb += prob;
            }
            return str;
        } else {
            return '';
        }
    }


}

export default ExpansionRules;

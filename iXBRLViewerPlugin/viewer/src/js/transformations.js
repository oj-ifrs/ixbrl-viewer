import Decimal from "decimal.js"

export class Transformations{
    
    static transformations = {
        'ixt:numdotdecimal': Transformations.ixtnumdotdecimal
    }

    static ixtnumdotdecimal(text) {
        const trimmed = text.replace(/[^0-9\.]/g,'')
        return Decimal(trimmed);
    }

}
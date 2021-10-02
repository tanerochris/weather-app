import { FAREN, CELC } from "../constants/constants"
// Convert temperature from kelvin to Celsius or Farhenheit
export const calcTemp = (unit, kelvinTemp) => {
    if (unit === CELC) {
        const celsius = kelvinTemp - 273.15
        return `${Math.floor(celsius)}C`
    }
    if (unit === FAREN) {
        const faren = (kelvinTemp - 273.15) * 9/5 + 32
        return `${Math.floor(faren)}F`
    }    
}
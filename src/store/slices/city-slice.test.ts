import { PARIS, AMSTERDAM } from "../../types/city";
import cityReducer, { changeCity } from "./city-slice";

describe('City Slice', () => {

    const initialCityState = {
        city: PARIS,
    }

    it('should return initial state with empty action', () => {
        const emptyAction = { type: '' };

        const result = cityReducer(initialCityState, emptyAction);

        expect(result).toEqual(initialCityState);
    })

    it('should return initial state with undefined', () => {
        const emptyAction = { type: '' };

        const result = cityReducer(undefined, emptyAction);

        expect(result).toEqual(initialCityState);
    })

    it('should change city on changeCity action', () => {
        const expectedState = {
            city: AMSTERDAM,
        }

        const result = cityReducer(initialCityState, changeCity(AMSTERDAM));

        expect(result).toEqual(expectedState);
    })

})
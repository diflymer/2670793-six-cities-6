import { Offer } from "../../types/offer";
import { mockOffers } from "../../utils/mock";
import { fetchOffers } from "../api-actions";
import { type OffersState } from "./offers-slice";
import offersReducer, { loadOffers, setOffersLoading } from "./offers-slice";

describe('Offers Slice', () => {

    const initialState: OffersState = {
        offers: [],
        isOffersLoading: false,
    };

    it('should return initial state with empty action', () => {
        const emptyAction = { type: '' };

        const result = offersReducer(initialState, emptyAction);

        expect(result).toEqual(initialState);
    })

    it('should return initial state with undefined', () => {
        const emptyAction = { type: '' };

        const result = offersReducer(undefined, emptyAction);

        expect(result).toEqual(initialState);
    })

    it('should load offers on loadOffers action', () => {
        const offers = mockOffers();

        const result = offersReducer(initialState, loadOffers(offers));

        expect(result.offers).toEqual(offers);
    })

    it('should set offers loading on setOffersLoading action', () => {
        const isOffersLoading: boolean = true;

        const result = offersReducer(initialState, setOffersLoading(isOffersLoading));

        expect(result.isOffersLoading).toEqual(isOffersLoading);
    })

    it('should set "isOffersLoading" to "true" with fetchOffers.pending', () => {
        
        const result = offersReducer(initialState, fetchOffers.pending);

        expect(result.isOffersLoading).toBe(true);
    })

    it('should set "isOffersLoading" to "false", and offers with fetchOffers.fullfilled', () => {

        const expectedState = {
            ...initialState,
            isOffersLoading: false,
            offers: mockOffers()
        };
        
        const result = offersReducer(initialState, fetchOffers.fulfilled(expectedState.offers, '', undefined));

        expect(result).toEqual(expectedState);
    })

    it('should set "isOffersLoading" to "false" with fetchOffers.rejected', () => {
        
        const result = offersReducer(initialState, fetchOffers.rejected);

        expect(result.isOffersLoading).toBe(false);
    })

})
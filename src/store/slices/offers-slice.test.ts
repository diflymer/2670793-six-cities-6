import { Offer } from "../../types/offer";
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
        const offers: Offer[] = [
            {
                id: '1',
                title: 'Offer 1',
                type: 'Apartment',
                price: 100,
                city: {
                    name: 'City 1',
                    location: {
                        latitude: 1,
                        longitude: 1,
                        zoom: 1,
                    },
                },
                location: {
                    latitude: 1,
                    longitude: 1,
                    zoom: 1,
                },
                isFavorite: false,
                isPremium: false,
                rating: 1,
                previewImage: 'https://example.com/image.png',
                bedrooms: 1,
                maxAdults: 1,
                description: 'Description 1',
                goods: ['Good 1', 'Good 2'],
                host: {
                    id: 1,
                    name: 'Host 1',
                    isPro: false,
                    avatarUrl: 'https://example.com/avatar.png',
                },
                images: ['https://example.com/image.png', 'https://example.com/image.png'],
            }
        ];

        const result = offersReducer(initialState, loadOffers(offers));

        expect(result.offers).toEqual(offers);
    })

    it('should set offers loading on setOffersLoading action', () => {
        const isOffersLoading: boolean = true;

        const result = offersReducer(initialState, setOffersLoading(isOffersLoading));

        expect(result.isOffersLoading).toEqual(isOffersLoading);
    })

})
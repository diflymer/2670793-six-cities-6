import { AuthInfo, LoginData, User } from "../types/auth";
import { Offer } from "../types/offer"
import { name, internet, image, datatype } from 'faker';

export const mockOffers = (): Offer[] => {

    const offers = [
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
        },
        {
            id: '2',
            title: 'Offer 2',
            type: 'Apartment',
            price: 200,
            city: {
                name: 'City 2',
                location: {
                    latitude: 2,
                    longitude: 2,
                    zoom: 2,
                },
            },
            location: {
                latitude: 2,
                longitude: 2,
                zoom: 2,
            },
            isFavorite: true,
            isPremium: true,
            rating: 5,
            previewImage: 'https://example.com/image4.png',
            bedrooms: 2,
            maxAdults: 2,
            description: 'Description 2',
            goods: ['Good 11', 'Good 42'],
            host: {
                id: 2,
                name: 'Host 3',
                isPro: true,
                avatarUrl: 'https://example.com/avatarg.png',
            },
            images: ['https://example.com/imagey6.png', 'https://example.com/image4.png'],
        },
    ]

    return offers;
}

export const mockUser = ():User => {
    const user: User = {
        name: name.firstName(),
        email: internet.email(),
        avatarUrl: image.avatar(),
        isPro: datatype.boolean(),
    }

    return user;
}

export const mockAuthInfo = ():AuthInfo => {
    const authInfo: AuthInfo = {
        name: name.firstName(),
        email: internet.email(),
        avatarUrl: image.avatar(),
        isPro: datatype.boolean(),
        token: datatype.uuid()
    }

    return authInfo;
}

export const mockLoginData = ():LoginData => {
    const loginData = {
        email: internet.email(),
        password: internet.password()
    }
    return loginData;
}
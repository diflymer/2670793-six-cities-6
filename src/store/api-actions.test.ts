import { configureMockStore } from "@jedmao/redux-mock-store"
import { createAPI } from "../api/api"
import MockAdapter from "axios-mock-adapter"
import thunk from 'redux-thunk'
import { State } from "../types/state"
import { Action } from 'redux'
import { AppThunkDispatch, extractActionsTypes, mockOffers } from "../utils/mock"
import { checkAuth, fetchOffers } from "./api-actions"

describe('Async actions', () => {
    const axios = createAPI();
    const mockAxiosAdapter = new MockAdapter(axios);
    const middleware = [thunk.withExtraArgument(axios)];
    const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
    let store: ReturnType<typeof mockStoreCreator>;

    beforeEach(() => {
        store = mockStoreCreator({});
    });

    describe('checkAuth', () => {
        it('should dispatch "checkAuth.pending" and "checkAuth.fulfilled" with thunk "checkAuth', async () => {
            mockAxiosAdapter.onGet('/login').reply(200);

            await store.dispatch(checkAuth());
            const actions = extractActionsTypes(store.getActions());

            expect(actions).toEqual([
                checkAuth.pending.type,
                checkAuth.fulfilled.type,
            ]);
        });

        it('should dispatch "checkAuth.pending" and "checkAuth.rejected" when server response 400', async () => {
            mockAxiosAdapter.onGet('/login').reply(400);

            await store.dispatch(checkAuth());
            const actions = extractActionsTypes(store.getActions());

            expect(actions).toEqual([
                checkAuth.pending.type,
                checkAuth.rejected.type,
            ]);
        });
    })

    describe('fetchOffers', () => {
        it('should dispatch "fetchOffers.pending", "fetchOffers.fulfilled", when server response 200', async () => {
            const offers = mockOffers();
            mockAxiosAdapter.onGet('/offers').reply(200, offers);

            await store.dispatch(fetchOffers());

            const emittedActions = store.getActions();
            const extractedActionsTypes = extractActionsTypes(emittedActions);
            const fetchOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffers.fulfilled>;

            expect(extractedActionsTypes).toEqual([
                fetchOffers.pending.type,
                fetchOffers.fulfilled.type,
            ]);

            expect(fetchOffersFulfilled.payload)
                .toEqual(offers);
        });

        it('should dispatch "fetchOffers.pending", "fetchOffers.rejected" when server response 400', async () => {
            mockAxiosAdapter.onGet('/offers').reply(400, []);

            await store.dispatch(fetchOffers());
            const actions = extractActionsTypes(store.getActions());

            expect(actions).toEqual([
                fetchOffers.pending.type,
                fetchOffers.rejected.type,
            ]);
        });
    });
})
import { mockUser, mockAuthInfo, mockLoginData } from "../../utils/mock";
import { checkAuth, login } from "../api-actions";
import userReducer, { AuthorizationStatus, type UserState, setAuthorizationStatus, setUser } from "./user-slice";

describe('User Slice', () => {

    const initialState: UserState = {
        authorizationStatus: 'UNKNOWN',
        user: null,
    };

    it('should return initial state with empty action', () => {
        const emptyAction = { type: '' };

        const result = userReducer(initialState, emptyAction);

        expect(result).toEqual(initialState);
    })

    it('should return initial state with undefined', () => {
        const emptyAction = { type: '' };

        const result = userReducer(undefined, emptyAction);

        expect(result).toEqual(initialState);
    })

    it('should set user on setUser action', () => {
        const user = mockUser();

        const result = userReducer(initialState, setUser(user));

        expect(result.user).toEqual(user);
    })

    it('should set authorization status on setAuthorizationStatus action', () => {
        const authorizationStatus: AuthorizationStatus = 'AUTH';

        const result = userReducer(initialState, setAuthorizationStatus(authorizationStatus));

        expect(result.authorizationStatus).toEqual(authorizationStatus);
    })

    it('should set authorization status and user with checkAuth.fullfilled ', () => {
        const authInfo = mockAuthInfo();
        const { token, ...user } = authInfo;
        const expectedState = {
            authorizationStatus: 'AUTH',
            user: user,
        };

        const result = userReducer(initialState, checkAuth.fulfilled(authInfo, '', undefined));

        expect(result).toEqual(expectedState);
    })

    it('should set authorization status and user with checkAuth.rejected ', () => {
        const expectedState = {
            authorizationStatus: 'NO_AUTH',
            user: null,
        };

        const result = userReducer(initialState, checkAuth.rejected);

        expect(result).toEqual(expectedState);
    })

    it('should set authorization status and user with login.fullfilled ', () => {
        const authInfo = mockAuthInfo();
        const loginData = mockLoginData();
        const { ...user } = authInfo;
        const expectedState = {
            authorizationStatus: 'AUTH',
            user: user,
        };

        const result = userReducer(initialState, login.fulfilled(authInfo, '', loginData));

        expect(result).toEqual(expectedState);
    })

    it('should set authorization status and user with login.rejected ', () => {
        const expectedState = {
            authorizationStatus: 'NO_AUTH',
            user: null,
        };

        const result = userReducer(initialState, login.rejected);

        expect(result).toEqual(expectedState);
    })

})
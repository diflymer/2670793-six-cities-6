import { User } from "../../types/auth";
import userReducer, {AuthorizationStatus, type UserState, setAuthorizationStatus, setUser } from "./user-slice";
import  { name, internet, image, datatype }  from 'faker';

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
        const user: User = {
            name: name.firstName(),
            email: internet.email(),
            avatarUrl: image.avatar(),
            isPro: datatype.boolean(),
        }

        const result = userReducer(initialState, setUser(user));

        expect(result.user).toEqual(user);
    })

    it('should set authorization status on setAuthorizationStatus action', () => {
        const authorizationStatus: AuthorizationStatus = 'AUTH';

        const result = userReducer(initialState, setAuthorizationStatus(authorizationStatus));

        expect(result.authorizationStatus).toEqual(authorizationStatus);
    })

})
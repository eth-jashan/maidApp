import { LOGIN, LOGOUT, SIGN_UP } from "../action/Auth";

const initialState = {
    token:null,
    userId:null
};

export default (state = initialState,action) => {
    switch(action.type){
        case LOGIN:
            return{
                token:action.token,
                userId:action.userId
            };
        case SIGN_UP:
            return{
                token:action.token,
                userId:action.userId
            }
        case LOGOUT:
            return{
                initialState
            }
        default:
            return state
    }
}
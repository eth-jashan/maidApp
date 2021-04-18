import Maid from '../../models/Maid';
import User from '../../models/User';
import { CREATE_MAID, CREATE_USER, FETCH_ALL_MAID, FETCH_MAID } from '../action/ManageUser';

const initialState = {
    users:[],
    maids:[],
    allmaids:[]
};

export default (state = initialState,action) => {
    switch(action.type){
        case CREATE_USER:
            const newUser = new User(
                action.userCredentials.id,
                action.userCredentials.ownerId,
                action.userCredentials.name
            );
            return{...state,
            users:state.users.concat(newUser)};

        case CREATE_MAID:
            const newMaid = new Maid(
                action.maidCredentials.id,
                action.maidCredentials.ownerId,
                action.maidCredentials.name,
                action.maidCredentials.phone,
                action.maidCredentials.price,
                action.maidCredentials.from,
                action.maidCredentials.till,
                action.maidCredentials.work,
                action.maidCredentials.location,
                action.maidCredentials.address
            );
            return{...state,
            maids:state.maids.concat(newMaid)};
        
        case FETCH_MAID:
            return{
                maids:action.maids
            }
        case FETCH_ALL_MAID:
            return{
                allmaids:action.maids
            }
    }
    return state;
}
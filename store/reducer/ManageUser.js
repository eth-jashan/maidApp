import User from '../../models/User';
import { CREATE_USER } from '../action/ManageUser';

const initialState = {
    users:[]
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
    }
    return state;
}
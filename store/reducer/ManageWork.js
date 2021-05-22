import Work from "../../models/Work";
import { FETCH_WORK, HIRE_MAID } from "../action/ManageWork";

const initialState = {
    work:[]
};

export default (state = initialState,action) => {
    switch(action.type){
        case HIRE_MAID:
            const newWork = new Work(
                action.work.id,
                action.work.maidId,
                action.work.userId,
                action.work.name,
                action.work.phone,
                action.work.time,
                action.work.toTime,
                action.work.address,
                action.work.basePrice,
                action.work.chipWork,
                action.work.loc,
                action.work.nego,
                action.work.maidName
            );  
            return{...state,
            work:state.work.concat(newWork)}
        
        case FETCH_WORK:
            return{
                work:action.works
            }

    }
    return state;
}
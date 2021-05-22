import Work from "../../models/Work";
import { FETCH_MAID_WORK, FETCH_WORK, HIRE_MAID, UPDATE_STATUS } from "../action/ManageWork";

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
                action.work.maidName,
                action.work.maidPhone,
                action.work.maidAddress
            );  
            return{...state,
            work:state.work.concat(newWork)}
        
        case FETCH_WORK:
            return{
                work:action.works
            }
        case FETCH_MAID_WORK:{
            return{
                work:action.maidWorks
            }
        }
        
        case UPDATE_STATUS:{
            const workIndex = state.work.findIndex(
                work => work.id === action.updatedStatus.id
              );
              const updatedWork = new Work(
                state.work[workIndex].id,
                state.work[workIndex].maidId,
                state.work[workIndex].userId,
                state.work[workIndex].name,
                state.work[workIndex].phone,
                state.work[workIndex].time,
                state.work[workIndex].toTime,
                state.work[workIndex].address,
                state.work[workIndex].basePrice,
                state.work[workIndex].chipWork,
                state.work[workIndex].loc,
                action.updatedStatus.nego,
                state.work[workIndex].maidName,
                state.work[workIndex].maidPhone,
                state.work[workIndex].maidAddress
            );
            const updateMaidWork = [...state.work];
            updateMaidWork[workIndex] = updatedWork;
            
            return{
                ...state,
                work:updateMaidWork
            }
        }

    }
    return state;
}
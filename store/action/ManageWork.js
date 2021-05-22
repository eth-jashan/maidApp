import Work from "../../models/Work";

export const HIRE_MAID = 'HIRE_MAID';
export const FETCH_WORK = 'FETCH_WORK';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const FETCH_MAID_WORK = 'FETCH_MAID_WORK';

export const hireMaid = (maidId,name,phone,time,toTime,address,basePrice,chipWork,loc,nego,maidName,maidPhone,maidAddress) => {
    return async(dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        
        const response = await fetch(`https://housekeeper-4f6d8-default-rtdb.firebaseio.com/work.json?auth=${token}`,{
            method:'POST',
            header:{
                'Content Type':'application/json'
            },
            body:JSON.stringify({
                maidId,userId:userId,
                name,
                phone,time,
                toTime,address,
                basePrice,chipWork,
                loc,nego,maidName,maidPhone,maidAddress
            })
        });
        const resData = await response.json();
        console.log(resData.name);

        dispatch({
            type:HIRE_MAID,
            work:{
                id:resData.name,
                maidId,name,
                userId:userId,
                phone,time,
                toTime,address,
                basePrice,chipWork,
                loc,nego,maidName,maidPhone,maidAddress
            }
        })
    }

}

 export const statusHandler = (nego,id) => {
    return async(dispatch)=>{
        await fetch(`https://housekeeper-4f6d8-default-rtdb.firebaseio.com/work/${id}.json`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                nego:nego
            })
        })
        dispatch({type:UPDATE_STATUS,updatedStatus:{id,nego}})
    }


 }

// export const negotitation = (nego) => {

//     await fetch('https://housekeeper-4f6d8-default-rtdb.firebaseio.com/work.json?auth=${token}',{
//         method:'PATCH',
//         headers:{'Content-Type':'application/json'},
//         body:JSON.stringify({
//             nego:nego
//         })
//     })

// }

export const fetchWork = () => {

    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(`https://housekeeper-4f6d8-default-rtdb.firebaseio.com/work.json`);
        const resData = await response.json();

        const maidWork = [];
        for(const key in resData){
            maidWork.push(new Work(key,resData[key].maidId,resData[key].userId,resData[key].name,resData[key].phone,resData[key].time,resData[key].toTime,resData[key].address,resData[key].basePrice,resData[key].chipWork,resData[key].loc,resData[key].nego,resData[key].maidName,resData[key].maidPhone,resData[key].maidAddress))
        }
        dispatch({type:FETCH_WORK,works:maidWork.filter(maid => maid.userId === userId)})

    }

}

export const fetchMaidWork = () => {

    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(`https://housekeeper-4f6d8-default-rtdb.firebaseio.com/work.json`);
        const resData = await response.json();

        const maidWork = [];
        for(const key in resData){
            maidWork.push(new Work(key,resData[key].maidId,resData[key].userId,resData[key].name,resData[key].phone,resData[key].time,resData[key].toTime,resData[key].address,resData[key].basePrice,resData[key].chipWork,resData[key].loc,resData[key].nego,resData[key].maidName,resData[key].maidPhone,resData[key].maidAddress))
        }
        dispatch({type:FETCH_MAID_WORK,maidWorks:maidWork.filter(maid => maid.maidId === userId)})

    }

}
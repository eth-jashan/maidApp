import Work from "../../models/Work";

export const HIRE_MAID = 'HIRE_MAID';

export const hireMaid = (maidId,name,phone,time,toTime,address,basePrice,chipWork,loc,nego, status) => {
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
                loc,nego,status
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
                loc,nego,status
            }
        })
    }

}

export const statusHandler = (status) => {

    await fetch('https://housekeeper-4f6d8-default-rtdb.firebaseio.com/work.json?auth=${token}',{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            status:status
        })
    })

}

export const negotitation = (nego) => {

    await fetch('https://housekeeper-4f6d8-default-rtdb.firebaseio.com/work.json?auth=${token}',{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            nego:nego
        })
    })

}

export const fetchWork = () => {

    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch('https://housekeeper-4f6d8-default-rtdb.firebaseio.com/work.json?auth=${token}')
        const resData = await response.json()

        const maidWork = []
        for(const key in resData){
            maidWork.push(new Work(key,resData[key].maidId, resData[key].userId, resData[key].name,resData[key].phone, resData[key].time, resData[key].toTime, resData[key].address,resData[key].basePrice,resData[key].chipWork,resData[key].loc,resData[key].nego,status, resData[key].status))
        }


    }

}
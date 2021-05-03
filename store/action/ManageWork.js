export const HIRE_MAID = 'HIRE_MAID';

export const hireMaid = (maidId,name,phone,time,toTime,address,basePrice,chipWork,loc,nego) => {
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
                loc,nego
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
                loc,nego
            }
        })
    }

}
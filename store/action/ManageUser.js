import Maid from '../../models/Maid';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_MAID = 'CREATE_MAID';
export const FETCH_MAID = 'FETCH_MAID';
export const FETCH_ALL_MAID = 'FETCH_ALL_MAID';

export const createUser = (name) => {
    return async(dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        console.log(userId);
        const response = await fetch(`https://housekeeper-4f6d8-default-rtdb.firebaseio.com/user.json?auth=${token}`,{
            method:'POST',
            header:{
                'Content Type':'application/json'
            },
            body:JSON.stringify({
                ownerId:userId,
                name
            })
        });
        const resData = await response.json();
        console.log(resData.name);

        dispatch({
            type:CREATE_USER,
            userCredentials:{
                id:resData.name,
                ownerId:userId,
                name

            }
        });
    }
}

export const createMaid = (name,phone,price,from,till,work,location,address) =>{
    return async(dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://housekeeper-4f6d8-default-rtdb.firebaseio.com/maid.json?auth=${token}`,{
            method:'POST',
            header:{
                'Content Type':'application/json'
            },
            body:JSON.stringify({
                ownerId:userId,
                name,phone,
                price,from,
                till,work,
                location,address
            })
        });
        const resData = await response.json();
        console.log(resData.name);

        dispatch({
            type:CREATE_MAID,
            maidCredentials:{
                id:resData.name,ownerId:userId,
                name,phone,
                price,from,
                till,work,
                location,address
            }

        })
    }
}

export const fetchMaid = () => {
    return async(dispatch,getState) => {
        const userId = getState().auth.userId;
      
            const response = await fetch('https://housekeeper-4f6d8-default-rtdb.firebaseio.com/maid.json');
            
            const resData = await response.json();
            const loadedMaids = [];

            for(const key in resData){
                loadedMaids.push(new Maid(key,resData[key].ownerId,resData[key].name,resData[key].phone,
                    resData[key].price,resData[key].from,resData[key].till,resData[key].work,resData[key].location,
                    resData[key].address))
            }
            dispatch({type:FETCH_MAID,maids:loadedMaids.filter(maid => maid.ownerId === userId)})
        
    }
}

export const fetchAllMaid = () => {
    return async(dispatch) => {
        const response = await fetch('https://housekeeper-4f6d8-default-rtdb.firebaseio.com/maid.json');
        const resData = await response.json();

        const loadedMaids = [];

        for(const key in resData){
            loadedMaids.push(new Maid(key,resData[key].ownerId,resData[key].name,resData[key].phone,
                resData[key].price,resData[key].from,resData[key].till,resData[key].work,resData[key].location,
                resData[key].address))
        }
        dispatch({type:FETCH_ALL_MAID,maids:loadedMaids})
    }
}
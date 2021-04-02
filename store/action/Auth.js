export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const signup = (email,password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDW1kker6gM46tCLX696wNIPoOU43mbILw',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        });
        if(!response.ok){
            const errorData = await response.json();
            const errorId = errorData.error.message;
            console.log(errorData);

            let message='Something Went Wrong';
            if(errorId==='EMAIL_EXISTS'){
                message='Email Already Exists';
            }else if(errorId==='WEAK_PASSWORD : Password should be at least 6 characters'){
                message='Password should be at least 6 characters'
            }
            throw new Error(message)
        }
        const resData = await response.json();
        dispatch({type:SIGN_UP,userId:resData.localId,token:resData.idToken});
    }
}

export const login = (email,password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDW1kker6gM46tCLX696wNIPoOU43mbILw',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        });
        if(!response.ok){
            const errorResData =  await response.json();
            const errorId = errorResData.error.message;
            console.log(errorResData);

            let message='Something Went Wrong';
            if(errorId==='EMAIL_NOT_FOUND'){
                message='Invalid Credentials';
            }else if(errorId==='INVALID_PASSWORD'){
                message='Invalid Credentials';
            }
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch({type:LOGIN,userId:resData.localId,token:resData.idToken});
    }
}

export const logout = () => {
    return{type:LOGOUT};
}
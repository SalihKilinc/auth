import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../types";
import { authInitialState } from "./auth-initial-state";


export const authReducer = (state=authInitialState, action) => {
    if(action.type === LOGIN_SUCCESS){
        return {...state, isUserLogin: true, user: action.payload }  // kullanici bilgileri dogru ise  authInitialState degeri false dan true ya doner
    }
    else if(action.type === LOGIN_FAIL){
        return {...state, isUserLogin: false, user: {} } // kullanici yanlis bilgisi icin obje bos kaliir 
    }
    else if(action.type === LOGOUT){
        return {...state, isUserLogin: false, user: {} } // kullanici cikisi icin obje bos kaliir 
    }

    return state;   // bunu yapmazsak gumleriz kesinlikle konmali
}
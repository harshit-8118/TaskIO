export const UserReducer = (state, action)=>{
    switch(action.type){
        case "LOGIN_START": return {
            isFetching:true,
            error:false,
            user:null
        };
        case "LOGIN_SUCCESS": return {
            isFetching:false,
            error:false,
            user:action.payload
        };
        case "LOGIN_FAILURE": return {
            isFetching:false,
            error:true,
            user:null
        };
        case "UPDATE_USER_START": return {
            isFetching:true,
            error:false,
            ...state
        };
        case "UPDATE_USER_SUCCESS": return {
            isFetching:false,
            error:false,
            user: {...action.payload}
        };
        case "UPDATE_USER_FAILURE": return {
            isFetching:false,
            error:true,
            ...state
        };
        case "LOGOUT": return {
            isFetching:false,
            error:false,
            user:null
        };
        default: return {
            ...state
        };
    }
};
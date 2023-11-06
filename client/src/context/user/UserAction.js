export const login_start = ()=>({
    type:"LOGIN_START"
})
export const login_success = (user)=>({
    type:"LOGIN_SUCCESS",
    payload: user,
})
export const login_fail = ()=>({
    type:"LOGIN_FAILURE"
})
export const logout = ()=>({
    type:"LOGOUT"
})
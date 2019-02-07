const userStatus = (state,user)=>{
  if(user){
    state.currentUser = user;
    state.isLogin = true;
  }else if(user == null){
    // 清空sessionStorage
    sessionStorage.setItem('sessionID','');
    sessionStorage.setItem('uid',null);
    state.currentUser = null;
    state.isLogin = false;
    state.sessionID = '';
  }
}

const userSession = (state,sessionID)=>{
    state.sessionID = sessionID;
}
export default {userStatus,userSession};
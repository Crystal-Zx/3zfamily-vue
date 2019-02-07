const setUser = ({commit},user) => {
  commit('userStatus',user);
};

const setSessionID = ({commit},sessionID)=> {
  commit('userSession',sessionID); 
}

export default {setUser,setSessionID};
export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_INFO':
      const newState = {...state, ...action.payload};
      window.localStorage.setItem('userInfo', JSON.stringify(newState))
      return newState
    default:
      return state;
  }
};

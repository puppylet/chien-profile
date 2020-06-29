export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const GET_PROFILE = 'GET_PROFILE'
export default (state = { isLoading: true, data: {} }, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state, startTime: new Date().getTime()
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    default:
      return state;
  }
};

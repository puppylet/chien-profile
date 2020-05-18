export default (state = { isLoading: true, data: {} }, action) => {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      };
    default:
      return state;
  }
};

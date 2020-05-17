export default (state = { isLoading: true, data: {} }, action) => {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      state.isLoading = false
      state.data = action.payload.data;
      return state;
    default:
      return state;
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'TEST_SAGA':
      console.log('=== Saga testing ===');
      return state;
    case 'TEST_SAGA_SUCCESS':
      console.log('=== Tada done saga testing ===');
      return state;
    default:
      return state;
  }
};

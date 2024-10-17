const initialState = {
    albums: [], 
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ALBUM':
        return {
          ...state,
          albums: [...state.albums, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
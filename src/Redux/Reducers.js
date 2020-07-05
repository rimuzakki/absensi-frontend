const defaultState = {
  breadcrumb: 'default breadcrumb',
}

const rootReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_BREADCRUMB':
      return {
        ...state,
        breadcrumb: action.breadcrumb
      }
    default:
      return state;
  }
}

export default rootReducer;
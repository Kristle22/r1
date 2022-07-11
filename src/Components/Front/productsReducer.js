function productsReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'products_list':
      newState = action.payload.map((p, i) => ({ ...p, row: i }));
      console.log(newState);
      break;
    case 'ascTitle':
      newState = [...state].sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
      break;
    case 'descTitle':
      newState = [...state].sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });
      break;
    case 'ascPrice':
      newState = [...state].sort((a, b) => a.price - b.price);
      break;
    case 'descPrice':
      newState = [...state].sort((a, b) => b.price - a.price);
      break;
    case 'default':
      newState = [...state].sort((a, b) => a.row - b.row);
      break;
    default:
      newState = state;
  }
  return newState;
}

export default productsReducer;
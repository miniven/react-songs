export const getListsBeforeRemoving = (state, id) => {
  const { [id]: listToRemove, ...restPrevOrders } = state;

  return restPrevOrders;
};
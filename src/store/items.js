export default {
  namespaced: true,
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems(state) {
      return state.items.reduce((total, item) => total + item.count, 0);
    },
    totalPrice(state) {
      return state.items.reduce(
        (total, item) => total + item.price * item.count,
        0,
      );
    },
  },
  mutations: {
    addItem(state, item) {
      if (item.count === 0) {
        item.count = 1;
      }
      state.items.push(item);
    },
    addCount(state, id) {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.count += 1;
      }
    },
    removeCount(state, id) {
      const item = state.items.find((item) => item.id === id);
      if (item && item.count > 0) {
        item.count -= 1;
      }
      if (item && item.count == 0) {
        state.items.splice(id - 1, 1);
      }
    },
    // removeItem(state, id) {
    //   state.items.splice(id - 1, 1);
    // },
  },
  actions: {
    addItem({ commit, state }, item) {
      const exists = state.items.find(
        (existingItem) => existingItem.id === item.id,
      );
      if (exists) {
        return false;
      }
      commit("addItem", item);
      return true;
    },
    incrementItemCount({ commit }, id) {
      commit("addCount", id);
    },
    decrementItemCount({ commit }, id) {
      commit("removeCount", id);
    },
    dropCartItem({ commit }, id) {
      commit("removeItem", id);
    },
  },
};

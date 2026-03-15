  // src/store.js
import { createStore } from 'vuex';

  const store = createStore({
    state: {
      carrito: [],
    },
    mutations: {
      agregarAlCarrito(state, producto) {
        state.carrito.push(producto);
      },
      eliminarDelCarrito(state, productoCodigo) {
        state.carrito = state.carrito.filter((producto) => producto.codigo !== productoCodigo);
      },
    },
    actions: {
      agregarAlCarrito({ commit }, producto) {
        commit('agregarAlCarrito', producto);
      },
      eliminarDelCarrito({ commit }, productoCodigo) {
        commit('eliminarDelCarrito', productoCodigo);
      },
    },
    getters: {
      carrito: (state) => state.carrito,
    },
  });

  export default store;

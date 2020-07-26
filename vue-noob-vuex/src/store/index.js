import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		counter: 0,
		todos: [],
		loading: false,
		showCompleted: false,
	},
	mutations: {
		SET_COUNTER(state, payload) {
			state.counter += payload;
		},
		SET_TODOS(state, payload) {
			state.todos = [...state.todos, ...payload];
		},
		SET_LOADING(state, payload) {
			state.loading = payload;
		},
		SET_TODO_TYPE(state, payload) {
			state.showCompleted = payload;
		},
	},
	getters: {
		doubleCounter(state) {
			return state.counter * 3;
		},
		completedTodos(state) {
			return state.todos.filter(todo => todo.completed);
		},
		todoType(state) {
			return state.showCompleted ? 'Completed' : 'All';
		},
	},
	actions: {
		increase(context, value) {
			context.commit('SET_COUNTER', value);
		},
		decrease(context, value) {
			context.commit('SET_COUNTER', -value);
		},
		fetchTodos: async (context, start = 0) => {
			context.commit('SET_LOADING', true);
			const res = await axios.get(
				`http://jsonplaceholder.typicode.com/todos?_limit=10&_start=${start}`
			);
			context.commit('SET_LOADING', false);
			context.commit('SET_TODOS', res.data);
		},
	},
});

export default store;

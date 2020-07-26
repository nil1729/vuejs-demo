import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const sendRequest = async body => {
	let reqHeaders = new Headers();
	reqHeaders.append('Content-Type', 'application/json');
	let requestOptions = {
		method: 'POST',
		headers: reqHeaders,
		body,
		redirect: 'follow',
	};
	let uri = ``;
	if (process.env.NODE_ENV !== 'production') {
		uri += 'http://localhost:5000';
	}
	const res = await fetch(`${uri}/api_v1_graphql`, requestOptions);
	const JSONData = await res.json();
	return JSONData;
};

const store = new Vuex.Store({
	state: {
		customers: [],
		alerts: null,
		loading: false,
		customerLoading: false,
		currentCustomer: null,
	},
	getters: {},
	actions: {
		customers: async context => {
			const query = JSON.stringify({
				query: `
                    query {
                        customers {
                            email
                            _id
                            firstName
                            lastName
                        }
                    }
                `,
			});
			context.commit('SET_LOADING', true);
			const res = await sendRequest(query);
			context.commit('SET_LOADING', false);
			if (res.errors) {
				return res.errors;
			}
			context.commit('SET_CUSTOMERS', res.data.customers);
		},
		customer: async (context, payload) => {
			context.commit('SET_CUSTOMER_LOADING', true);
			const query = JSON.stringify({
				query: `
                    query {
                        customer (_id: "${payload}") {
                            email
                            phone
                            firstName
                            lastName
                            address
                            state
                            city
                        }
                    }
                `,
			});
			const res = await sendRequest(query);
			context.commit('SET_CUSTOMER_LOADING', false);
			if (res.errors) {
				return res.errors;
			}
			context.commit('VIEW_CUSTOMER', res.data.customer);
		},
		addCustomer: async (context, customer) => {
			const query = JSON.stringify({
				query: `
                mutation {
                    createCustomer(customerInput: {
                        email:"${customer.email}", 
                        phone:"${customer.phone}", 
                        city:"${customer.city}", 
                        state: "${customer.state}", 
                        address: "${customer.address}", 
                        firstName: "${customer.firstName}", 
                        lastName: "${customer.lastName}"}) {
                            _id
                            firstName
                            lastName
                            email
                        }
                    }
                `,
			});
			const res = await sendRequest(query);
			if (res.errors) {
				return res.errors;
			}
			context.commit('ADD_CUSTOMER', res.data.createCustomer);
		},
		deleteCustomer: async (context, payload) => {
			const query = JSON.stringify({
				query: `
                mutation {
                    deleteCustomer(_id: "${payload}") {
                      email
                      firstName
                    }
                  }
                `,
			});
			const res = await sendRequest(query);
			if (res.errors) {
				return res.errors;
			}
		},
		setAlert: async (context, payload) => {
			context.commit('SET_ALERT', payload);
			setTimeout(() => {
				context.commit('CLEAR_ALERT');
			}, 3000);
		},
	},
	mutations: {
		SET_ALERT(state, payload) {
			return (state.alerts = {
				...payload,
			});
		},
		CLEAR_ALERT(state) {
			return (state.alerts = null);
		},
		ADD_CUSTOMER(state, payload) {
			return (state.customers = [...state.customers, payload]);
		},
		SET_LOADING(state, payload) {
			return (state.loading = payload);
		},
		SET_CUSTOMERS(state, payload) {
			return (state.customers = payload);
		},
		SET_CUSTOMER_LOADING(state, payload) {
			return (state.customerLoading = payload);
		},
		VIEW_CUSTOMER(state, payload) {
			return (state.currentCustomer = payload);
		},
		CLEAR_CURRENT_CUSTOMER(state) {
			return (state.currentCustomer = null);
		},
	},
});

export default store;

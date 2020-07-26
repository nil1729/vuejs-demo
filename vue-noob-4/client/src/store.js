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
	},
	getters: {},
	actions: {
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
			return (state.customers = [...state.customers, ...payload]);
		},
	},
});

export default store;

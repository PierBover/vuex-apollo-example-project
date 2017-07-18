import Vue from 'vue';
import Vuex from 'vuex';
import apolloClient from './apollo.js';

import gql from 'graphql-tag';

Vue.use(Vuex);

// apolloClient.subscribe returns an Observable instance
// I've put the observer and observable here for simplicity but this should go into its own module
const fruitsSubscriptionObservable = apolloClient.subscribe({
	query: gql`
		subscription {
			Fruit {
				mutation
				node {
					id
					name
					color {
						name
					}
				}
				previousValues {
					id
			    }
			}
		}
	`,
});

let fruitsSubscriptionObserver;

const store = new Vuex.Store({
	state: {
		fruits: {},
	},
	mutations: {
		SET_FRUITS(state, fruits){
			// having an object instead of an array makes the other methods easier
			// since we can use Vue.set() and Vue.delete()
			const object = {};
			fruits.map((fruit) => {
				object[fruit.id] = fruit;
			});
			state.fruits = object;
		},
		ADD_FRUIT(state, fruit){
			Vue.set(state.fruits, fruit.id, fruit);
		},
		UPDATE_FRUIT(state, fruit){
			Vue.set(state.fruits, fruit.id, fruit);
		},
		DELETE_FRUIT(state, fruit){
			Vue.delete(state.fruits, fruit.id);
		},
	},
	actions: {
		getFruits(context){
			apolloClient.query({
				query: gql`
					{
						allFruits {
							id
							name
							color {
								name
							}
						}
					}
				`
			}).then((result) => {
				context.commit('SET_FRUITS', result.data.allFruits);
			});
		},
		// You call this action to start the sunscription
		subscribeToFruits(context){
			fruitsSubscriptionObserver = submetricvaluesSubscriptionObservable.subscribe({
				next(data){
					// mutation will say the type of GraphQL mutation `CREATED`, `UPDATED` or `DELETED`
					console.log(data.Fruit.mutation);
					// node is the actual data of the result of the GraphQL mutation
					console.log(data.Fruit);
					// then call your store mutation as usual
					switch (data.Fruit.mutation) {
						case 'CREATED':
							context.commit('ADD_FRUIT', data.Fruit.node);
							break;
						case 'UPDATED':
							context.commit('UPDATE_FRUIT', data.Fruit.node);
							break;
						case 'DELETED':
							context.commit('DELETE_FRUIT', data.Fruit.previousValues);
							break;
					}
				},
				error(error){
					console.log(error);
				}
			});
		},
		// You call this action to stop the subscription
		unsubscribeFromFruits(context){
			if (fruitsSubscriptionObserver) {
				fruitsSubscriptionObserver.unsubscribe();
				fruitsSubscriptionObserver = null;
			}
		},
	}
});

export default store;

import Vue from 'vue';
import Vuex from 'vuex';
import apolloClient from './apollo.js';

import gql from 'graphql-tag';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		fruits: []
	},
	mutations: {
		SET_FRUITS(state, fruits){
			console.log(fruits);
			state.fruits = fruits;
		}
	},
	actions: {
		getFruits(context){
			apolloClient.query({
				query: gql`
					{
						allFruits {
							name
							color {
								name
							}
						}
					}
				`
			}).then((result) => {
				context.commit('SET_FRUITS', result.data.allFruits);
			})
		}
	}
});

export default store;
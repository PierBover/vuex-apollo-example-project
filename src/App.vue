<template>
	<div id="app">
		<h1>Some fruits</h1>
		<button type="button" @click="toggleSubscribe">{{subscriptionButtonText}}</button>
		<ul v-if="fruits">
			<li v-for="fruit in fruits">{{fruit.name}} <em v-if="fruit.color">{{fruit.color.name}}</em></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'app',
	data(){
		return {
			subscribed: false
		}
	},
	computed: {
		fruits(){
			return this.$store.state.fruits;
		},
		fruitsSubscription(){
			return this.$store.state.fruitsSubscription;
		},
		subscriptionButtonText(){
			return this.subscribed ? 'Unsubscribe' : 'Subscribe';
		}
	},
	created(){
		this.$store.dispatch('getFruits');
	},
	destroyed(){
		if (this.subscribed) this.$store.dispatch('unsubscribeFromFruits');
	},
	methods: {
		toggleSubscribe(){
			this.subscribed = !this.subscribed;
			if(!this.subscribed) this.$store.dispatch('unsubscribeFromFruits');
			else this.$store.dispatch('subscribeToFruits');
		}
	}
}
</script>

<style>
body {
	font-family: sans-serif;
	margin: 3rem;
}
</style>

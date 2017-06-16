<template>
	<div id="app">
		<h1>Some fruits</h1>
		<ul v-if="fruits">
			<li v-for="fruit in fruits">{{fruit.name}} <em v-if="fruit.color">{{fruit.color.name}}</em></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'app',
	computed: {
		fruits(){
			return this.$store.state.fruits;
		},
		fruitsSubscription(){
			return this.$store.state.fruitsSubscription;
		},
	},
	mounted(){
		this.$store.dispatch('getFruits');
		this.$store.dispatch('subscribeToFruits');
	},
	destroyed(){
		this.$store.dispatch('unsubscribeFromFruits');
	}
}
</script>

<style>
body {
	font-family: sans-serif;
	margin: 3rem;
}
</style>

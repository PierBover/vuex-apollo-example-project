<template>
	<div id="app">
		<h1>Some fruits</h1>
		<ul v-if="fruits">
			<li v-for="fruit in fruits">{{fruit.name}} <em>{{fruit.color.name}}</em></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'app',
	computed: {
		fruits(){
			return this.$store.state.fruits;
		}
	},
	mounted(){
		this.$store.dispatch('getFruits');
	}
}
</script>

<style>
body {
	font-family: sans-serif;
	margin: 3rem;
}
</style>

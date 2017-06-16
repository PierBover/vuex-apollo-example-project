# apollo-vuex-example

An example Vue project based on the Vue template `webpack-simple`. It uses Vuex and vanilla Apollo Client.

I wrote this since everyone seems to be using `vue-apollo` which encourages to put the GraphQL queries in Vue componentes. **This is an antipattern and should never be done**. The whole point of using Vuex is to centralize state and decouple your data layer code from your components.

I've included the [Graphcool](https://www.graph.cool) schema so you can replicate this. Just copy pasta the schema into the Graphcool console, add some data, and then paste the simple API and subscription endpoints in `apollo.js`.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

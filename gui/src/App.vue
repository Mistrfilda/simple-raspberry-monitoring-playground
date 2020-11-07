<template>
  <div>
    <div>
      <b-nav pills>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="Dropdown"
            toggle-class="nav-link-custom"
            right
        >
          <b-dropdown-item>One</b-dropdown-item>
          <b-dropdown-item>Two</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Three</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </div>
  </div>
<!--  <div id="nav">-->
<!--    <button v-on:click="increment"> {{ count }}</button>-->
<!--    <ul>-->
<!--      <li v-for="test in testik" v-bind:key="test.text">-->
<!--        {{ test.text }}-->
<!--      </li>-->
<!--    </ul>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link> |-->
<!--    <router-link to="/dashboard">Dashboard</router-link>-->
<!--  </div>-->
<!--  <router-view />-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      count: 0,
      testik: [
        { text: '321321 534'},
        { text: '321321 534 543'},
        { text: '321321 534 6435'}
      ]
    }
  },
  methods: {
    increment () {
      this.count++
    }
  },
  components: {
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

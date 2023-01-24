<template>
  <v-container>
    <navigation-drawer></navigation-drawer>
    <app-bar></app-bar>
    <v-main> </v-main>
  </v-container>
</template>
<script>

import AppBar from "../components/AppBar";
import NavigationDrawer from "../components/NavigationDrawer";
export default {
  name: "Home",
  components: { AppBar, NavigationDrawer },
  
}
</script>

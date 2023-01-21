<template>
  <v-container>
  <navigation-drawer></navigation-drawer>
  <app-bar></app-bar>
  <v-main>
 
    <v-container fluid>

      Main
    </v-container>
  </v-main>

</v-container>
</template>

<script>
// @ is an alias to /src
import AppBar from '../components/AppBar';
import NavigationDrawer from '../components/NavigationDrawer';


export default {
  name: 'Home',
  components: {AppBar, NavigationDrawer}
}
</script>

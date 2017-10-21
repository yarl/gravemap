<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          Logo
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link class="navbar-item" to="/about">
            About
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>

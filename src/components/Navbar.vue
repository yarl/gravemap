<template>
  <nav class="navbar has-shadow">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <strong>graves.wiki</strong>
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
  .navbar {
    z-index: 1000;
  }
</style>

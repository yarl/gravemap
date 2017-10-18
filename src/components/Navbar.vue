<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="../">
          Logo
        </a>

        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenu" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown">
            <a class="navbar-link">
              Account
            </a>

            <div class="navbar-dropdown" v-if="false">
              <a class="navbar-item">
                Dashboard
              </a>
              <a class="navbar-item">
                Profile
              </a>
              <a class="navbar-item">
                Settings
              </a>
              <hr class="navbar-divider">
              <div class="navbar-item">
                Logout
              </div>
            </div>
          </div>
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

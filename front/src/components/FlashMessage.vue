<template>
  <div id="live-region" v-show="isVisible">{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isVisible: false,
    };
  },
  methods: {
    displayFlash(message, reload="") {
      this.message = message;
      this.isVisible = true;

      setTimeout(() => {
        this.message = '';
        this.isVisible = false;
      }, 3000);

      if (reload) {
        this.$router.push(reload);
      }
    },
  },
};
</script>

<style scoped>
#live-region {
  display: none;
  /* Ajoutez les styles nécessaires pour le message flash */
}
</style>

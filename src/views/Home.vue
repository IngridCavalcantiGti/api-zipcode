<template>
  <div class="container-fluid">
    <FormCep />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import FormCep from '@/components/FormCep.vue';

export default defineComponent({
  name: 'Home',
  components: {
    FormCep,
  },
});
</script>

<style lang="scss" scoped>
$black: #000;
$gray-800: #343a40;

.container-fluid {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(179deg, rgba($black, 0.98) 6%, $gray-800);
}
</style>

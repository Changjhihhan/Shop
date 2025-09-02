<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();

const productId = computed(() => route.params.productId as string);
</script>

<template>
  <div>
    {{ productId }}
  </div>
</template>

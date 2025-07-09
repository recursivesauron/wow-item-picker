<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  total: number | string;
  name: string;
  inlineStyle: string;
}>();

</script>

<template>
  <div class="stat-total">
    <div class="stat-icon-container">
      <slot></slot>
    </div>
    <div class="stat-info">
      <div class="stat-total-number" :style="inlineStyle">{{ props.total.toLocaleString ? props.total.toLocaleString() : props.total }}</div>
      <div class="stat-total-label">{{ props.name }}</div>
    </div>
  </div>
</template>

<style scoped>

.stat-total {
  display: flex;
  align-items: center;
  gap: 16px;
}
.stat-icon-container {
  border-radius: 50%;
  padding: 8px;
  width: 70px;
  height: 70px;
  box-sizing: border-box;
}
.stat-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.stat-total-number {
  font-size: 1.2rem;
  font-family: 'Open Sans', 'Arial', 'Helvetica', 'sans-serif';
  font-weight: 400;
  line-height: 1;
}
.stat-total-label {
    font-size: 1rem;
    line-height: 1.5;
    font-family: 'SemplicitaPro', 'Open Sans', 'Arial', 'Helvetica', sans-serif;
    color: #ffffff;
    text-shadow: 0 0 1px transparent, 0px 1px 2px rgba(0, 0, 0, 0.8);
    font-weight: 700;
    text-transform: uppercase;
}
</style> 
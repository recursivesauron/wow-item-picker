<template>
  <div class="gear-item-wrapper">
    <div 
      class="gear-item-container"
      :class="{ 'clicked': showDropdown }"
      @click="handleClick"
    >
      <WowGearItem :item="item" />
    </div>
    
    <!-- Dropdown for alternative items -->
    <div v-if="showDropdown && alternativeItems.length > 0" class="alternative-items-dropdown">
      <div class="dropdown-header">
        <span>Alternative {{ item.category }} Items:</span>
      </div>
      <div class="dropdown-items">
        <div 
          v-for="altItem in alternativeItems" 
          :key="altItem.itemId"
          class="dropdown-item"
          @click="selectItem(altItem)"
        >
          <WowGearItem :item="altItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import WowGearItem from './WowGearItem.vue'
import { Item } from '../types/item-types'
import items from '../data/item-sample'

interface Props {
  item: Item
  onItemSelect?: (newItem: Item) => void
}

const props = defineProps<Props>()

const showDropdown = ref(false)

// Get alternative items of the same category (excluding the current item)
const alternativeItems = computed(() => {
  return items.filter(item => 
    item.category === props.item.category && 
    item.itemId !== props.item.itemId
  )
})

// Handle click on the gear item
const handleClick = () => {
  if (alternativeItems.value.length > 0) {
    showDropdown.value = !showDropdown.value
  }
}

// Handle selection of an alternative item
const selectItem = (newItem: Item) => {
  if (props.onItemSelect) {
    props.onItemSelect(newItem)
  }
  showDropdown.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.gear-item-wrapper')) {
    showDropdown.value = false
  }
}

// Add click outside listener when dropdown is shown
import { onMounted, onUnmounted, watch } from 'vue'

watch(showDropdown, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.gear-item-wrapper {
  position: relative;
  display: inline-block;
}

.gear-item-container {
  cursor: pointer;
  transition: all 0.2s ease;
}

.gear-item-container:hover {
  transform: scale(1.02);
}

.gear-item-container.clicked {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(163, 53, 238, 0.5);
}

.alternative-items-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #a335ee;
  border-radius: 8px;
  padding: 8px;
  margin-top: 4px;
  min-width: 400px;
  max-height: 400px;
  overflow-y: auto;
}

.dropdown-header {
  color: #a335ee;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 8px;
  text-align: center;
  border-bottom: 1px solid #a335ee;
  padding-bottom: 4px;
}

.dropdown-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dropdown-item {
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  padding: 2px;
}

.dropdown-item:hover {
  background: rgba(163, 53, 238, 0.2);
  transform: scale(1.02);
}

/* Custom scrollbar for dropdown */
.alternative-items-dropdown::-webkit-scrollbar {
  width: 8px;
}

.alternative-items-dropdown::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.alternative-items-dropdown::-webkit-scrollbar-thumb {
  background: #a335ee;
  border-radius: 4px;
}

.alternative-items-dropdown::-webkit-scrollbar-thumb:hover {
  background: #c366ff;
}
</style> 
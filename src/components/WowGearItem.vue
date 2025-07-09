<template>
  <div class="gear-item">
    <img :src="item.itemIcon" alt="Item Icon" class="gear-icon" />
    <div class="gear-details">
      <div class="gear-title-row">
        <span class="gear-name">{{ item.itemName }}</span>
      </div>

      <div class="gear-info-row">
        <span class="gear-ilvl">{{ item.ilvl }}</span>

        <img v-if="socket && gemIcon !== null":src="gemIcon" alt="gem-icon" class="gem-icon" />
        <span class="gear-enchant" v-if="enchantment !== null">Enchanted: {{ enchantment }}</span>
      
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from '../types/item-types';
import { PropType } from 'vue';

export default {
    props: {
        item: {
            type: Object as PropType<Item>,
            required: true
        }
    },
    data() {
        return {
            damage: null,
            gemIcon: null,
            enchantment: null,
            socket: false
        }
    },
    mounted() {
        if(this.item.type === 'MainHand') {
            this.damage = this.item.damage;
            this.enchantment = this.item.enchantment;
        } else if(this.item.type === 'Clothing') {
            this.gemIcon = this.item.gemIcon;
            this.enchantment = this.item.enchantment;
            this.socket = this.item.socket;
        }
    }
}
</script>

<style scoped>
.gear-item {
  display: flex;
  align-items: flex-start;
  background: rgba(0,0,0,0.7);
  border-radius: 6px;
  padding: 4px 8px;
  width: 400px;
  min-width: 400px;
  max-width: 400px;
}
.gear-icon {
  width: 40px;
  height: 40px;
  border: 2px solid #a335ee;
  border-radius: 4px;
  margin-right: 8px;
}
.gear-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.gear-title-row {
  display: flex;
  align-items: center;
}
.gear-name {
  color: #a335ee;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 2px;
}
.gear-info-row {
  display: flex;
  align-items: center;
  gap: 4px;
}
.gear-ilvl {
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
}
.gem-icon {
  width: 18px;
  height: 18px;
  margin: 0 2px;
}
.gear-enchant {
  color: #1eff00;
  font-size: 0.95rem;
  margin-left: 8px;
}
</style> 
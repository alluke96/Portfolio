<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item">
        <nuxt-link
          v-if="index !== crumbs.length - 1"
          :to="crumb.path"
          class="breadcrumb-not-actual"
        >
          {{ crumb.label }}
        </nuxt-link>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBreadcrumbStore } from '../stores/breadcrumbs'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const breadcrumbStore = useBreadcrumbStore()
    const { breadcrumbs } = storeToRefs(breadcrumbStore)
    
    return {
      crumbs: breadcrumbs
    }
  }
})
</script>

<style>
.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  color: whitesmoke;
}

.breadcrumb-item {
  margin-right: 0.5rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
  margin-right: 0.5rem;
  color: whitesmoke;
}

.breadcrumb-item span {
  font-weight: bold;
}

.breadcrumb-not-actual {
  font-weight: normal;
}

.breadcrumb-item a {
  text-decoration: none;
  color: gray;
}
</style>

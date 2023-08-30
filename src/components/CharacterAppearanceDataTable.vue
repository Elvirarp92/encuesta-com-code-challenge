<template>
<v-table>
  <thead>
    <tr>
      <th>
        Title
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in items" :key="item.name">
      <td>
        {{ item.title }}
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>
        <v-pagination 
          v-model="page" 
          :length="pageNumber" 
          total-visible="9" 
          density="compact"
          @update:model-value="changePage"
        />
      </td>
    </tr>
  </tfoot>
</v-table>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: Array,
  totalItems: Number,
})

const emit = defineEmits([
  'changePage',
])

const page = ref(1)
const itemsPerPage = ref(20)
const pageNumber = computed(() => Math.ceil(props.totalItems / itemsPerPage.value))

/* functions */
const changePage = newPage => {
  emit('changePage', {
    page: newPage,
    itemsPerPage: itemsPerPage.value
  })
}
</script>
<template>
<div style="min-width: 50%">
  <el-page-header @back="back" style="margin-bottom: 20px">
    <template #content>
      <span class="text-large font-600 mr-3"> Configure the database {{ dbName }} </span>
    </template>
  </el-page-header>
  <div style="margin-bottom: 30px;">
    <el-row>
      <el-text v-show="list.length===0">Currently there're no defined models.&nbsp;</el-text>
      <el-link type="success" :underline="false" @click="create">Create</el-link>
      <el-text>&nbsp;a new model. Or&nbsp;</el-text>
      <el-link type="primary" :underline="false" @click="refresh">refresh</el-link>
      <el-text>&nbsp;the list.</el-text>
    </el-row>
  </div>
  <div style="margin-bottom: 30px;" v-for="element in list" :key="element.name">
    <el-descriptions :title="element.name" size="default" border style="margin-bottom: 10px;">
      <template #extra>
        <el-row>
          <el-link type="primary" :underline="false" @click="config(element)">Configure</el-link>
          <el-text>&nbsp;or&nbsp;</el-text>
          <el-link type="danger" :underline="false" @click="del(element)">delete</el-link>
          <el-text>&nbsp;this model.&nbsp;Explore the&nbsp;</el-text>
          <el-link type="primary" :underline="false" @click="gotoData(element)">data</el-link>
          <el-text>&nbsp;and&nbsp;</el-text>
          <el-link type="primary" :underline="false" @click="gotoApi(element)">APIs</el-link>
          <el-text>.</el-text>
        </el-row>
      </template>
      <el-descriptions-item label="Created at">{{ displayTimestamp(element.createdAt) }}</el-descriptions-item>
      <el-descriptions-item label="Updated at">{{ displayTimestamp(element.updatedAt) }}</el-descriptions-item>
    </el-descriptions>
  </div>
</div>
  
  
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'

const router = useRouter()
const route = useRoute()

const dbName = ref(route.query.db)

const list = ref([])

onMounted(async () => {
  refresh()
})

const back = () => {
  router.push({ name: 'Database' })
}

const refresh = async e => {
  await toastAction(async () => {
    list.value = await rpc.model.get(dbName.value)
  }, 'refresh models')
}

const create = async e => {
  let name = null
  try {
    name = await ElMessageBox.prompt('Please input the model name', 'Create model', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    })
  } catch {
    return
  }
  toastAction(async () => {
    await rpc.model.add({
      dbName: dbName.value,
      name: name.value
    })
    await refresh()
  }, 'create model')
}

const config = el => {
  router.push({ name: 'Property', query: { modelId: el.id }})
}

const del = async el => {
  try {
    await ElMessageBox.confirm(
      'This model will be permanently deleted. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    toastAction(async () => {
      await rpc.model.del(el.id)
      list.value = await rpc.model.get(dbName.value)
    }, 'delete the model')
  }
  catch (e) {
  }
}

const displayTimestamp = el => {
  return new Date(el).toLocaleString()
}

const gotoData = el => {
  router.push({ name: 'ExploreData', query: { modelId: el.id }})
}

const gotoApi = el => {
  router.push({ name: 'ExploreApi', query: { modelId: el.id }})
}

</script>
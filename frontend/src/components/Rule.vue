<template>
<div>
  <div style="margin-bottom: 30px;">
    <el-row>
      <el-text v-show="list.length===0">Currently there're no defined proxy rules.&nbsp;</el-text>
      <el-link type="success" :underline="false" @click="create">Create</el-link>
      <el-text>&nbsp;a new rule. Or&nbsp;</el-text>
      <el-link type="primary" :underline="false" @click="refresh">refresh</el-link>
      <el-text>&nbsp;the list.</el-text>
    </el-row>
  </div>
  <div>
  <draggable
    :list="list"
    :disabled="!enabled"
    item-key="name"
    class="list-group"
    ghost-class="ghost"
    @end="resequence"
  >
    <template #item="{ element }">
      <div style="margin-bottom: 30px;">
        <el-descriptions :title="element.name" size="default" border style="margin-bottom: 10px;">
          <template #extra>
            <el-row>
              <el-link type="primary" :underline="false" @click="update(element)">Update</el-link>
              <el-text>&nbsp;or&nbsp;</el-text>
              <el-link type="danger" :underline="false" @click="del(element)">delete</el-link>
              <el-text>&nbsp;this rule.</el-text>
            </el-row>
          </template>
          <el-descriptions-item label="Port">{{ element.port }}</el-descriptions-item>
          <el-descriptions-item label="Created at">{{ displayTimestamp(element.createdAt) }}</el-descriptions-item>
          <el-descriptions-item label="Updated at">{{ displayTimestamp(element.updatedAt) }}</el-descriptions-item>
          <el-descriptions-item label="Limit">{{ displayLimit(element.limit) }}</el-descriptions-item>
          <el-descriptions-item label="Parse as body">
            <el-tag size="small" :type="element.parseReqBody?'success':'danger'">{{ element.parseReqBody }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Request as buffer">
            <el-tag size="small" :type="element.reqAsBuffer?'success':'danger'">{{ element.reqAsBuffer }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Timeout">
            <el-tag v-if="element.timeout===null" size="small" type="info">not specified</el-tag>
            <el-text v-if="element.timeout!==null">{{ element.timeout }}</el-text>
          </el-descriptions-item>
          <el-descriptions-item label="Memoize host">
            <el-tag size="small" :type="element.memoizeHost?'success':'danger'">{{ element.memoizeHost }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Enforce HTTPS">
            <el-tag size="small" :type="element.https?'success':'danger'">{{ element.https }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </template>
  </draggable>
  </div>
</div>
  
  
</template>

<script setup>
import draggable from 'vuedraggable'
import { useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'

const router = useRouter()

onMounted(async () => {
  refresh()
})

const list = ref([])
const enabled = ref(true)
const dragging = ref(false)

const refresh = e => {
  toastAction(async () => {
    list.value = await rpc.rule.get()
  }, 'refresh proxy rules')
}

const resequence = (e) => {
  const newSeq = list.value.map((el, idx) => {
    return {
      id: el.id,
      sequence: idx
    }
  })
  const oldSeq = list.value.map(el => {
    return {
      id: el.id,
      sequence: el.sequence
    }
  })
  const seqToUpdate = newSeq.filter(el => el.sequence !== oldSeq.find(el2 => el2.id === el.id).sequence)
  if (seqToUpdate.length === 0) {
    return
  }
  toastAction(async () => {
    await rpc.rule.updateSeq(seqToUpdate)
  }, 'update proxy sequence')
}

const create = e => {
  router.push({ name: 'NewRule', query: { ruleId: undefined }})
}

const update = el => {
  router.push({ name: 'NewRule', query: { ruleId: el.id }})
}

const del = async el => {
  try {
    await ElMessageBox.confirm(
      'This rule will be permanently deleted. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    toastAction(async () => {
      await rpc.rule.del(el.id)
      list.value = await rpc.rule.get()
    }, 'delete the rule')
  }
  catch (e) {
  }
}

const displayTimestamp = el => {
  return new Date(el).toLocaleString()
}

const displayLimit = el => {
  return el.replace(/(\d)([a-zA-Z])/g, '$1 $2').toUpperCase()
}

</script>

<style scoped>

.list-group {
  width: 100%;
}

.ghost {
  opacity: 0.5;
}
</style>
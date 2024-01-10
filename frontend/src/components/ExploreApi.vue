<template>
  <div style="min-width: 90%">
    <el-page-header @back="back" style="margin-bottom: 20px">
        <template #content>
            <span class="text-large font-600 mr-3"> Explore RESTful APIs of {{ model.name }} in the database {{ model.dbName }} </span>
        </template>
    </el-page-header>
    <div style="margin-bottom: 30px;">
        <el-row v-if="!rest">
            <el-text>RESTful APIs are not enrolled for this model.&nbsp;</el-text>
            <el-link type="success" :underline="false" @click="enroll">Enroll</el-link>
            <el-text>&nbsp;it now.</el-text>
        </el-row>
        <el-row v-else>
            <el-link type="danger" :underline="false" @click="dismiss">Dismiss</el-link>
            <el-text>&nbsp;the RESTful APIs.</el-text>
        </el-row>
    </div>
    <el-form v-if="rest">
      <el-form-item label="RESTful API token">
          <el-input v-model="rest.token" :disabled="true" style="width: 320px; margin-right:10px;" />
          <el-button type="primary" @click="renew">Renew</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 30px;" v-if="rest">
        <el-collapse>
          <el-collapse-item title="Query">
            <el-checkbox v-model="rest.query" @change="toggleStatus('query')">Enable this API</el-checkbox>
            <p>
              <code>GET /api/datacenter/{{ model.dbName }}/{{ model.name }}</code>
            </p>
            <p>
              This API can query all the items. You can also specify parameters to filter the results.<br>
              E.g. <code>?id=3&name=John</code>
            </p>
            <p>Test this API.</p>
            <ApiRunner
              method="GET"
              :urlPrefix="`/api/datacenter/${model.dbName}/${model.name}?`"
              urlSuffixPlaceholder="e.g. id=1"
              :token="rest.token" />
          </el-collapse-item>
          <el-collapse-item title="Query by primary key">
            <el-checkbox v-model="rest.queryByPk" @change="toggleStatus('queryByPk')">Enable this API</el-checkbox>
            <p>
              <code>GET /api/datacenter/{{ model.dbName }}/{{ model.name }}/{pk}</code>
            </p>
            <p>
              This API can query the item with specified primary key (ID).<br>
              E.g. <code>/1</code>
            </p>
            <p>Test this API.</p>
            <ApiRunner
              method="GET"
              :urlPrefix="`/api/datacenter/${model.dbName}/${model.name}/`"
              :urlSuffixRequired="true"
              urlSuffixPlaceholder="e.g. 1"
              :token="rest.token" />
          </el-collapse-item>
          <el-collapse-item title="Advanced query">
            <el-checkbox v-model="rest.advancedQuery" @change="toggleStatus('advancedQuery')">Enable this API</el-checkbox>
            <p>
              <code>POST /api/datacenter/{{ model.dbName }}/{{ model.name }}/$query</code>
            </p>
            <p>
              This API can query the item with advanced settings.<br>
              E.g. by specifying the filter, offset, limit and the order.
            </p>
            <p>Test this API.</p>
            <ApiRunner
              method="POST"
              :urlPrefix="`/api/datacenter/${model.dbName}/${model.name}/$query`"
              :bodyExample="advancedQueryExample"
              :token="rest.token" />
          </el-collapse-item>
          <el-collapse-item title="Create">
            <el-checkbox v-model="rest.create" @change="toggleStatus('create')">Enable this API</el-checkbox>
            <p>
              <code>POST /api/datacenter/{{ model.dbName }}/{{ model.name }}</code>
            </p>
            <p>
              This API can create one or multiple items.<br>
            </p>
            <p>Test this API.</p>
            <ApiRunner
              method="POST"
              :urlPrefix="`/api/datacenter/${model.dbName}/${model.name}`"
              :bodyExample="createExample"
              :token="rest.token" />
          </el-collapse-item>
          <el-collapse-item title="Update">
            <el-checkbox v-model="rest.update" @change="toggleStatus('update')">Enable this API</el-checkbox>
            <p>
              <code>PUT /api/datacenter/{{ model.dbName }}/{{ model.name }}</code>
            </p>
            <p>
              This API can update one or multiple items.<br>
            </p>
            <p>Test this API.</p>
            <ApiRunner
              method="PUT"
              :urlPrefix="`/api/datacenter/${model.dbName}/${model.name}`"
              :bodyExample="updateExample"
              :token="rest.token" />
          </el-collapse-item>
          <el-collapse-item title="Delete by primary key">
            <el-checkbox v-model="rest.delete" @change="toggleStatus('delete')">Enable this API</el-checkbox>
            <p>
              <code>DELETE /api/datacenter/{{ model.dbName }}/{{ model.name }}/{pk}</code>
            </p>
            <p>
              This API can delete one item by specifying the primary key.<br>
            </p>
            <p>Test this API.</p>
            <ApiRunner
              method="DELETE"
              :urlPrefix="`/api/datacenter/${model.dbName}/${model.name}/`"
              :urlSuffixRequired="true"
              urlSuffixPlaceholder="e.g. 1"
              :token="rest.token" />
          </el-collapse-item>
          <el-collapse-item title="Bulk delete">
            <el-checkbox v-model="rest.bulkDelete" @change="toggleStatus('bulkDelete')">Enable this API</el-checkbox>
            <p>
              <code>DELETE /api/datacenter/{{ model.dbName }}/{{ model.name }}</code>
            </p>
            <p>
              This API can delete one or multiple items by specifying the primary keys.<br>
            </p>
            <p>Test this API.</p>
            <ApiRunner
              method="DELETE"
              :urlPrefix="`/api/datacenter/${model.dbName}/${model.name}`"
              :bodyExample="bulkDeleteExample"
              :token="rest.token" />
          </el-collapse-item>
        </el-collapse>
    </div>

    <el-dialog v-model="dialogVisible" title="Create model instance" width="30%" destroy-on-close>
        <func-editor v-model="editorData" :showHeader="false" :params="[]" :height="1000"></func-editor>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="createOrUpdate">
                {{ isCreate ? 'Create' : 'Update' }}
                </el-button>
            </span>
        </template>
    </el-dialog>
  </div>
</template>

<script setup>

import JsonViewer from 'vue-json-viewer'

import { useRouter, useRoute } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'
import { loadExampleObject } from '../utils/example'

import JSON5 from 'json5'

const router = useRouter()
const route = useRoute()

const model = ref({ dbName: '', name: '' })
const properties = ref([])

const rest = ref('')
const selected = ref(null)

const dialogVisible = ref(false)
const editorData = ref('123')

const isCreate = ref(false)

onMounted(async () => {
  model.value = await rpc.model.getById(route.query.modelId)
  properties.value = await rpc.property.get(route.query.modelId)
  properties.value.splice(0, 0, { id: -1, name: 'id', type: 'INTEGER' })
  properties.value.push({ id: 100000, name: 'createdAt', type: 'DATE' })
  properties.value.push({ id: 100001, name: 'updatedAt', type: 'DATE' })
  rest.value = await rpc.rest.get(route.query.modelId)
  
  const json = loadExampleObject(true, properties.value)
  createExample.value = JSON.stringify(json, undefined, 4)
  json.id = 1
  updateExample.value = JSON.stringify(json, undefined, 4)
})

const enroll = async () => {
  toastAction(async () => {
    await rpc.rest.add(route.query.modelId)
    rest.value = await rpc.rest.get(route.query.modelId)
  }, 'enroll RESTful APIs')
}

const dismiss = async () => {
  toastAction(async () => {
    await rpc.rest.del(rest.value.id)
    rest.value = await rpc.rest.get(route.query.modelId)
  }, 'dismiss RESTful APIs')
}

const advancedQueryExample = ref(JSON.stringify({
  where: {
    '$and': [
      {
        id: 1,
        name: {
          '$substring': 'test'
        }
      },
      {
        createdAt: {
          '$gt': new Date(2023, 4, 17).toJSON()
        }
      }
    ]
  },
  offset: 0,
  limit: 3,
  order: [['id', 'DESC']]
}, null, 4))

const updateExample = ref('')
const createExample = ref('')

const bulkDeleteExample = ref(JSON.stringify([0,1,2,3], undefined, 4))

const create = async e => {
    dialogVisible.value = true
    isCreate.value = true
    loadJson()
}

const update = async e => {
    dialogVisible.value = true
    isCreate.value = false
    loadJson()
}

const renew = async e => {
    await toastAction(async () => {
      await rpc.rest.renewToken(rest.value.id)
      rest.value = await rpc.rest.get(route.query.modelId)
    }, 'renew token')
}

const toggleStatus = async name => {
  const current = rest.value[name]
  await toastAction(async () => {
      const toUpdate = {}
      toUpdate[name] = current
      await rpc.rest.update(rest.value.id, toUpdate)
      rest.value = await rpc.rest.get(route.query.modelId)
    }, `${!current ? 'disable' : 'enable'} ${name}`)
}

const back = () => {
  router.back()
}

</script>

<style scoped>
code {
    font-size: 85%;
    background-color: rgba(27,31,35,.05);
    border-radius: 3px;
    padding: 3px;
}
</style>
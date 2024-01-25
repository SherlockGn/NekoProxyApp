<template>
    <div style="width: 80%">
        <el-form :model="rule" label-width="180px" :rules="validates" ref="form">
            <el-form-item label="Rule name" prop="name">
                <el-input v-model="rule.name" />
            </el-form-item>
            <el-form-item label="Rule description">
                <el-input v-model="rule.description" />
            </el-form-item>
            <el-form-item label="Enabled">
                <el-checkbox v-model="rule.enabled" />
            </el-form-item>
            <el-form-item label="Port">
                <el-input-number v-model="rule.port" :min="1" />
            </el-form-item>
            <el-form-item label="Proxy host">
                <el-input v-model="rule.host" />
            </el-form-item>
            <el-form-item label="Content limit">
                <el-input-number v-model="rule.limit.val" :min="1" />
                &nbsp; &nbsp;
                <el-select
                    v-model="rule.limit.unit"
                    placeholder="Select"
                    size="default">
                    <el-option
                        v-for="item in ['KB', 'MB', 'GB', 'TB', 'PB']"
                        :key="item"
                        :label="item"
                        :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Timeout (ms)">
                <el-input-number v-model="rule.timeout" :min="0" />
            </el-form-item>
            <el-form-item label="Parse request body">
                <el-checkbox v-model="rule.parseReqBody" />
            </el-form-item>
            <el-form-item label="Request as buffer">
                <el-checkbox v-model="rule.reqAsBuffer" />
            </el-form-item>
            <el-form-item label="Memoize host">
                <el-checkbox v-model="rule.memoizeHost" />
            </el-form-item>
            <el-form-item label="Enforce HTTPS">
                <el-checkbox v-model="rule.https" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <el-text>
                        Filter
                        <el-icon @click="showNotification(info.rule.filter)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <func-editor
                    v-model="rule.filter"
                    funcName="filter"
                    :paramList="['req']"
                    placeholder="    return true" />
            </el-form-item>
            <el-form-item label="">
                <template #label>
                    <el-text>
                        Forward path
                        <el-icon @click="showNotification(info.rule.path)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <func-editor
                    v-model="rule.path"
                    funcName="path"
                    :paramList="['req']"
                    placeholder="    return req.originalUrl" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <el-text>
                        Request
                        <el-icon @click="showNotification(info.rule.req)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <func-editor
                    v-model="rule.req"
                    funcName="req"
                    :paramList="['req']"
                    placeholder="    return req" />
            </el-form-item>
            <el-form-item label="Request body">
                <template #label>
                    <el-text>
                        Request body
                        <el-icon @click="showNotification(info.rule.reqBody)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <func-editor
                    v-model="rule.reqBody"
                    funcName="reqBody"
                    :paramList="['body']"
                    placeholder="    return body" />
            </el-form-item>
            <el-form-item label="Response headers">
                <template #label>
                    <el-text>
                        Response headers
                        <el-icon @click="showNotification(info.rule.resHeader)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <func-editor
                    v-model="rule.resHeader"
                    funcName="resHeader"
                    :paramList="['headers']"
                    placeholder="    return headers" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <el-text>
                        Response body
                        <el-icon @click="showNotification(info.rule.resBody)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <func-editor
                    v-model="rule.resBody"
                    funcName="resBody"
                    :paramList="['body']"
                    placeholder="    return body" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createOrUpdate">
                    {{ ruleId === undefined ? 'Create' : 'Update' }}
                </el-button>
                <el-button @click="cancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'
import { info } from '../utils/info'
import { toastAction } from '../utils/toastAction'

const route = useRoute()
const router = useRouter()

const ruleId = ref(route.query.ruleId)
const form = ref(null)

onMounted(async () => {
    if (ruleId.value !== undefined) {
        const rul = (
            await rpc.rule.get({
                id: ruleId.value
            })
        )[0]

        const limit = rul.limit
            .replace(/(\d)([a-zA-Z])/g, '$1 $2')
            .toUpperCase()
        rule.value = {
            ...rul,
            timeout: rul.timeout === null ? 0 : rul.timeout,
            limit: {
                val: parseInt(limit.split(' ')[0]),
                unit: limit.split(' ')[1]
            }
        }
    }
})

const rule = ref({
    'name': 'My Proxy Rule',
    'description': '',
    'enabled': true,
    'port': 3334,
    'host': 'localhost:3000',
    'filter': '    return true',
    'path': '    return req.originalUrl',
    'req': '    return req',
    'reqBody': '    return body',
    'resBody': '    return body',
    'resHeader': '    return headers',
    'limit': {
        val: 1,
        unit: 'MB'
    },
    'parseReqBody': true,
    'reqAsBuffer': true,
    'timeout': 0,
    'memoizeHost': false,
    'https': false
})

const validates = {
    name: [
        {
            required: true,
            message: 'Please input the rule name',
            trigger: 'blur'
        }
    ]
}

const createOrUpdate = async () => {
    try {
        await form.value.validate()
    } catch {
        return
    }
    const ruleToCreate = {
        ...rule.value,
        limit: `${rule.value.limit.val}${rule.value.limit.unit}`.toLowerCase(),
        timeout: rule.value.timeout === 0 ? null : rule.value.timeout
    }
    if (ruleId.value !== undefined) {
        await toastAction(async () => {
            await rpc.rule.update(ruleId.value, ruleToCreate)
        }, 'create proxy')
    } else {
        await toastAction(async () => {
            await rpc.rule.add(ruleToCreate)
        }, 'update proxy')
    }
    router.push({ name: 'Rule' })
}

const cancel = () => {
    router.push({
        name: 'Rule'
    })
}

const showNotification = message => {
    ElNotification({
        title: 'Hint',
        message,
        type: 'info',
        dangerouslyUseHTMLString: true,
        duration: 0
    })
}
</script>

<style scoped>
.el-notification {
    --el-notification-width: 1000px !important;
}

.el-icon {
    margin-left: 5px;
}
</style>

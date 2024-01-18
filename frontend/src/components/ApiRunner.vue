<template>
    <div style="padding: 10px; border: #409eff 1px solid">
        <el-tag>{{ method }}</el-tag>
        <el-input
            style="margin-top: 5px"
            v-model="urlSuffix"
            :disabled="urlSuffixPlaceholder === null"
            :placeholder="urlSuffixPlaceholder">
            <template #prepend>{{ urlPrefix }}</template>
        </el-input>
        <func-editor
            v-model="body"
            v-if="bodyExample !== null"
            :params="[]"
            :showHeader="false"
            style="margin-top: 5px"></func-editor>
        <el-button
            style="margin-top: 10px"
            type="primary"
            @click="send"
            size="small">
            Try it out
        </el-button>
        <div style="margin-top: 20px" v-if="result !== null">
            <el-tag>{{ result.status }}</el-tag>
            <br />
            <el-input
                type="textarea"
                style="margin-top: 5px"
                :rows="5"
                readonly
                :value="result.data"></el-input>
        </div>
    </div>
</template>

<script setup>
import { host } from '../utils/host'
import JSON5 from 'json5'

const props = defineProps({
    method: {
        type: String,
        default: 'GET'
    },
    urlPrefix: {
        type: String,
        default: '/api/dataceneter/'
    },
    urlSuffixPlaceholder: {
        type: String,
        default: null
    },
    urlSuffixRequired: {
        type: Boolean,
        default: false
    },
    bodyExample: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: ''
    }
})

const urlSuffix = ref('')

const result = ref(null)

const body = ref('')

onMounted(() => {
    body.value = props.bodyExample
})

const send = async () => {
    if (props.urlSuffixRequired && urlSuffix.value === '') {
        return
    }

    const contentType =
        props.bodyExample === null ? undefined : 'application/json'
    const headers = {
        'Authorization': props.token
    }
    if (contentType) {
        headers['Content-Type'] = contentType
    }

    let b
    try {
        b = JSON5.parse(body.value)
        b = JSON.stringify(b)
    } catch {
        b = body.value
    }

    const rsp = await fetch(host + props.urlPrefix + urlSuffix.value, {
        method: props.method,
        headers,
        body: props.bodyExample === null ? undefined : b
    })

    result.value = {
        status: rsp.status,
        data: await rsp.text()
    }

    try {
        result.value.data = JSON.parse(result.value.data)
        result.value.data = JSON.stringify(result.value.data, null, 4)
    } catch {}
}
</script>

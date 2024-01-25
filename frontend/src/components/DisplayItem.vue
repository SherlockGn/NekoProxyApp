<template>
    <!-- eslint-disable -->
    <div style="margin-bottom: 30px">
        <el-descriptions size="default" border style="margin-bottom: 10px">
            <template #title>
                {{ name }}&nbsp;
                <el-text v-if="description" type="info">
                    {{ description }}
                </el-text>
            </template>
            <template #extra>
                <el-row>
                    <template v-for="(textItem, index) in text">
                        <template v-if="textItem.type">
                            <el-link
                                :key="index"
                                v-if="textItem.type"
                                :type="textItem.type"
                                :underline="false"
                                @click="textItem.action">
                                {{ textItem.val }}
                            </el-link>
                        </template>
                        <template v-else>
                            <el-text
                                :key="index"
                                v-html="
                                    textItem.val.replace(/ /g, '&nbsp;')
                                "></el-text>
                        </template>
                    </template>
                </el-row>
            </template>
            <template v-for="(prop, index) in props">
                <el-descriptions-item
                    v-if="getPropOfEl(element, prop.prop) !== undefined"
                    :key="index"
                    :label="prop.label ?? prop.prop"
                    :span="prop.col ?? 1">
                    <el-tag
                        v-if="
                            typeof getPropOfEl(element, prop.prop) === 'boolean'
                        "
                        size="small"
                        :type="
                            getPropOfEl(element, prop.prop)
                                ? 'success'
                                : 'danger'
                        ">
                        {{ getPropOfEl(element, prop.prop) }}
                    </el-tag>
                    <el-tag
                        v-else-if="getPropOfEl(element, prop.prop) === null"
                        size="small"
                        type="info">
                        not specified
                    </el-tag>
                    <el-text
                        v-else-if="isJsonDate(getPropOfEl(element, prop.prop))">
                        {{ displayTimestamp(getPropOfEl(element, prop.prop)) }}
                    </el-text>
                    <json-viewer
                        v-else-if="
                            typeof getPropOfEl(element, prop.prop) === 'object'
                        "
                        :expand-depth="0"
                        :value="getPropOfEl(element, prop.prop)"></json-viewer>
                    <el-text v-else>
                        {{ getPropOfEl(element, prop.prop) }}
                    </el-text>
                </el-descriptions-item>
            </template>
        </el-descriptions>
    </div>
</template>

<script setup>
import JsonViewer from 'vue-json-viewer'

const properties = defineProps({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    text: {
        type: Array,
        required: true
        /*
            {
                val: 'Update',
                type: 'primary',
                action: async () => {...}
            }
        */
    },
    element: {
        type: Object,
        required: true
    },
    props: {
        type: Array,
        required: true
        /*
            {
                label: 'Port',
                prop: 'port',
                col: 3
            }
        */
    }
})

const getPropOfEl = (el, prop) => {
    if (typeof prop === 'string') {
        return el[prop]
    }
    if (typeof prop === 'function') {
        return prop(el)
    }
}

const isJsonDate = el => {
    if (el instanceof Date) {
        return true
    }
    try {
        return el === new Date(el).toJSON()
    } catch {
        return false
    }
}

const displayTimestamp = el => {
    return new Date(el).toLocaleString()
}
</script>

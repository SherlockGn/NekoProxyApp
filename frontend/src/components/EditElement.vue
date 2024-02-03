<template>
    <div :style="{ width: config.width ?? '80%' }">
        <el-form :model="element" label-width="180px" ref="form">
            <el-form-item
                v-for="(comp, index) in config.components"
                :key="index"
                :prop="comp.items.map(i => i.prop).join(',')"
                v-show="comp.showIf ? comp.showIf(element) : true"
                :rules="comp.validate">
                <template #label>
                    <el-text>
                        {{ comp.label }}
                        <el-icon
                            v-if="comp.hint"
                            @click="showNotification(comp.hint)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <template v-for="(item, idx) in comp.items">
                    <span :key="idx + 'space'" v-if="idx > 0">
                        &nbsp;&nbsp;&nbsp;
                    </span>
                    <el-input
                        v-if="item.type === 'el-input'"
                        :key="idx"
                        :modelValue="getElementProperty(element, item.prop)"
                        @update:modelValue="
                            e => setSelementProperty(element, item.prop, e)
                        "
                        v-bind="item.attrs"
                        :disabled="!item.disabledIfUpdate ? false : !isCreate"
                        v-show="
                            item.showIf ? item.showIf(element) : true
                        "></el-input>
                    <el-checkbox
                        v-if="item.type === 'el-checkbox'"
                        :key="idx"
                        :modelValue="getElementProperty(element, item.prop)"
                        @update:modelValue="
                            e => setSelementProperty(element, item.prop, e)
                        "
                        v-bind="item.attrs"
                        :disabled="!item.disabledIfUpdate ? false : !isCreate"
                        v-show="
                            item.showIf ? item.showIf(element) : true
                        "></el-checkbox>
                    <el-input-number
                        v-if="item.type === 'el-input-number'"
                        :key="idx"
                        :modelValue="getElementProperty(element, item.prop)"
                        @update:modelValue="
                            e => setSelementProperty(element, item.prop, e)
                        "
                        v-bind="item.attrs"
                        :disabled="!item.disabledIfUpdate ? false : !isCreate"
                        v-show="
                            item.showIf ? item.showIf(element) : true
                        "></el-input-number>
                    <el-select
                        v-if="item.type === 'el-select'"
                        :key="idx"
                        :modelValue="getElementProperty(element, item.prop)"
                        @update:modelValue="
                            e => setSelementProperty(element, item.prop, e)
                        "
                        v-bind="item.attrs"
                        :disabled="!item.disabledIfUpdate ? false : !isCreate"
                        v-show="item.showIf ? item.showIf(element) : true">
                        <template v-if="!isOptionGrouped(item.options)">
                            <el-option
                                v-for="option in item.options"
                                :key="option.key ?? option"
                                :label="option.label ?? option"
                                :value="option.val ?? option" />
                        </template>
                        <template v-else>
                            <el-option-group
                                v-for="group in item.options"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="option in group.options"
                                    :key="option.key ?? option"
                                    :label="option.label ?? option"
                                    :value="option.val ?? option" />
                            </el-option-group>
                        </template>
                    </el-select>
                    <func-editor
                        v-if="item.type === 'func-editor'"
                        :key="idx"
                        :modelValue="getElementProperty(element, item.prop)"
                        @update:modelValue="
                            e => setSelementProperty(element, item.prop, e)
                        "
                        v-bind="item.attrs"
                        v-show="
                            item.showIf ? item.showIf(element) : true
                        "></func-editor>
                    <date-picker
                        v-if="item.type === 'date-picker'"
                        :key="idx"
                        :modelValue="getElementProperty(element, item.prop)"
                        @update:modelValue="
                            e => setSelementProperty(element, item.prop, e)
                        "
                        v-bind="item.attrs"></date-picker>
                    <el-checkbox-group
                        v-if="item.type === 'el-checkbox-group'"
                        :key="idx"
                        :modelValue="getElementProperty(element, item.prop)"
                        @update:modelValue="
                            e => setSelementProperty(element, item.prop, e)
                        "
                        v-bind="item.attrs"
                        v-show="item.showIf ? item.showIf(element) : true">
                        <el-checkbox
                            v-for="option in item.options"
                            :key="option.key ?? option"
                            :label="option.val ?? option">
                            {{ option.label ?? option }}
                        </el-checkbox>
                    </el-checkbox-group>
                </template>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createOrUpdate">
                    {{
                        config.customBtn
                            ? config.customBtn
                            : isCreate
                            ? 'Create'
                            : 'Update'
                    }}
                    <el-icon class="is-loading" v-show="isLoading">
                        <i-ep-loading />
                    </el-icon>
                </el-button>
                <el-button v-if="!config.hideCancel" @click="cancel">
                    Cancel
                </el-button>
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

const props = defineProps({
    config: {
        type: Object
    }
})

const isLoading = ref(false)

const newElKey = ref(route.query[props.config.newElRouter?.key])
const form = ref(null)

const isCreate = ref(newElKey.value === undefined)

const element = ref(props.config.default)

onMounted(async () => {
    if (!isCreate.value) {
        const queried = await props.config.actions.getElById(newElKey.value)
        if (props.config.actions.afterGet) {
            element.value = props.config.actions.afterGet(queried)
        } else {
            element.value = queried
        }
    }
})

const createOrUpdate = async () => {
    try {
        await form.value.validate()
    } catch {
        return
    }

    let toCreate = element.value
    if (props.config.actions.beforeCreate) {
        toCreate = props.config.actions.beforeCreate(element.value)
    }

    let action
    if (props.config.actions.click) {
        action = props.config.actions.click
    } else {
        action = isCreate.value
            ? props.config.actions.addEl
            : props.config.actions.updateEl
    }

    isLoading.value = true
    if (action.description) {
        await toastAction(
            async () => await action.func(toCreate),
            action.description
        )
    } else {
        await action.func(toCreate)
    }
    isLoading.value = false

    if (!props.config.stay) {
        router.back()
    }
}

const getElementProperty = (el, prop) => {
    let e = el
    prop.split('.').forEach(part => {
        e = e[part]
    })
    return e
}

const setSelementProperty = (el, prop, value) => {
    let e = el
    prop.split('.')
        .slice(0, -1)
        .forEach(part => {
            e = e[part]
        })
    e[prop.substring(prop.lastIndexOf('.') + 1)] = value
}

const isOptionGrouped = options => {
    if (options.length === 0) {
        return false
    }
    return options.every(o => o.hasOwnProperty('options'))
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

const cancel = () => {
    router.back()
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

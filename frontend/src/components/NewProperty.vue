<template>
    <div style="width: 80%">
        <el-form :model="property" label-width="180px">
            <el-form-item label="Property name">
                <el-input v-model="property.name" />
            </el-form-item>
            <el-form-item label="Type">
                <el-select
                    v-model="property.type"
                    placeholder="Select"
                    size="default">
                    <el-option
                        v-for="item in [
                            'INTEGER',
                            'BIGINT',
                            'FLOAT',
                            'DOUBLE',
                            'DECIMAL',
                            'TEXT',
                            'STRING',
                            'BOOLEAN',
                            'DATE',
                            'DATEONLY',
                            'UUID'
                        ]"
                        :key="item"
                        :label="item"
                        :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="Default value">
                <el-input v-model="property.defaultValue" />
            </el-form-item>
            <el-form-item label="Unique">
                <el-checkbox v-model="property.unique" />
            </el-form-item>
            <el-form-item label="Allow null">
                <el-checkbox v-model="property.allowNull" />
            </el-form-item>
            <el-form-item label="Validate">
                <template #label>
                    <el-text>
                        Validate<el-icon
                            @click="showNotification(info.property.validate)"
                            ><i-ep-info-filled
                        /></el-icon>
                    </el-text>
                </template>
                <FuncEditor v-model="property.validate" :showHeader="false" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createOrUpdate">{{
                    isCreate ? 'Create' : 'Update'
                }}</el-button>
                <el-button @click="cancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'
import { info } from '../utils/info'

import JSON5 from 'json5'

const route = useRoute()
const router = useRouter()

const propertyId = ref(route.query.propertyId)
const modelId = ref(route.query.modelId)

const isCreate = ref(modelId.value !== undefined)

onMounted(async () => {
    if (!isCreate.value) {
        const pro = await rpc.property.getById(propertyId.value)
        property.value = {
            ...pro,
            defaultValue:
                pro.defaultValue === null
                    ? ''
                    : JSON.parse(pro.defaultValue).toString(),
            validate:
                pro.validate === null
                    ? ''
                    : JSON.stringify(JSON.parse(pro.validate), undefined, 2)
        }
    }
})

const property = ref({
    name: 'propertyName',
    type: 'INTEGER',
    unique: false,
    allowNull: true,
    defaultValue: '',
    validate: ''
})

const getDefaultValue = (type, stringValue) => {
    if (stringValue === '') {
        return null
    }
    if (type === 'BOOLEAN') {
        return Boolean(stringValue)
    }
    if (['INTEGER', 'BIGINT', 'FLOAT', 'DOUBLE', 'DECIMAL'].includes(type)) {
        return Number(stringValue)
    }
    if (['DATE', 'DATEONLY'].includes(type) && stringValue === 'NOW') {
        return '#DataTypes.NOW#'
    }
    if (type === 'UUID' && ['UUIDV4', 'UUIDV1'].includes(stringValue)) {
        return `#DataTypes.${stringValue}#`
    }
    return stringValue
}

const createOrUpdate = async () => {
    let validate = null
    try {
        validate = JSON5.parse(property.value.validate)
    } catch {}
    const propertyToCreate = {
        ...property.value,
        defaultValue: getDefaultValue(
            property.value.type,
            property.value.defaultValue
        ),
        validate
    }
    if (!isCreate.value) {
        await toastAction(async () => {
            await rpc.property.update(propertyToCreate, propertyId.value)
        }, 'update property')
    } else {
        await toastAction(async () => {
            await rpc.property.add(propertyToCreate, modelId.value)
        }, 'create property')
    }
    router.back()
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

<template>
    <edit-element :config="config" />
</template>

<script setup>
import JSON5 from 'json5'
import { useRoute } from 'vue-router'

import { info } from '../utils/info'

const route = useRoute()
const modelId = Number(route.query.modelId)

const config = ref({
    newElRouter: {
        key: 'propertyId'
    },
    actions: {
        getElById: rpc.property.getById,
        addEl: {
            func: async el => rpc.property.add(el, modelId),
            description: 'create property'
        },
        updateEl: {
            func: async el => await rpc.property.update(el, el.id),
            description: 'update property'
        },
        afterGet: el => {
            return {
                ...el,
                defaultValue:
                    el.defaultValue === null
                        ? ''
                        : JSON.parse(el.defaultValue).toString(),
                validate:
                    el.validate === null
                        ? ''
                        : JSON.stringify(JSON.parse(el.validate), undefined, 2)
            }
        },
        beforeCreate: el => {
            let validate = null
            try {
                validate = JSON5.parse(el.validate)
            } catch {}
            return {
                ...el,
                defaultValue: getDefaultValue(el.type, el.defaultValue),
                validate
            }
        }
    },
    default: {
        name: 'NewProperty',
        type: 'INTEGER',
        defaultValue: '',
        unique: false,
        allowNull: true,
        validate: ''
    },
    components: [
        {
            label: 'Name',
            validate: [
                {
                    required: true,
                    message: 'Please input the property name',
                    trigger: 'blur'
                }
            ],
            items: [
                {
                    type: 'el-input',
                    prop: 'name'
                }
            ]
        },
        {
            label: 'Type',
            items: [
                {
                    type: 'el-select',
                    prop: 'type',
                    options: [
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
                    ]
                }
            ]
        },
        {
            label: 'Default value',
            items: [
                {
                    type: 'el-input',
                    prop: 'defaultValue'
                }
            ]
        },
        {
            label: 'Unique',
            items: [
                {
                    type: 'el-checkbox',
                    prop: 'unique'
                }
            ]
        },
        {
            label: 'Allow null',
            items: [
                {
                    type: 'el-checkbox',
                    prop: 'allowNull'
                }
            ]
        },
        {
            label: 'Validate',
            hint: info.property.validate,
            items: [
                {
                    type: 'func-editor',
                    prop: 'validate',
                    attrs: {
                        funcName: '',
                        paramList: [],
                        showHeader: false,
                        placeholder: '{isNumeric: true}'
                    }
                }
            ]
        }
    ]
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
</script>

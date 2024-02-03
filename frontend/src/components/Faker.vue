<template>
    <div>
        <el-dialog title="Set properties" v-model="dialogVisible" width="50%">
            <edit-element :config="config"></edit-element>
        </el-dialog>
    </div>
</template>

<script setup>
import { options, generate } from '../utils/fake'

const props = defineProps({
    modelValue: Boolean,
    properties: Array
})

const emit = defineEmits(['update:modelValue', 'update', 'cancel'])

const dialogVisible = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const defaultProperties = {}
props.properties
    .filter(i => i.id > 0)
    .forEach(item => {
        defaultProperties[item.name] = null
    })

const defaultValue = {
    lang: '',
    number: 10,
    properties: defaultProperties
}

const components = [
    {
        label: 'Language',
        items: [
            {
                type: 'el-select',
                prop: 'lang',
                options: [
                    { label: 'English', val: '' },
                    { label: 'Chinese', val: 'ZH_CN' }
                ]
            }
        ]
    },
    {
        label: 'Generate number',
        items: [
            {
                type: 'el-input-number',
                prop: 'number',
                min: 1,
                max: 100
            }
        ]
    }
]

props.properties
    .filter(i => i.id > 0)
    .forEach(i => {
        const selectOptions = {
            'INTEGER': options.integerOptions,
            'BIGINT': options.bigIntOptions,
            'FLOAT': options.floatOptions,
            'DOUBLE': options.doubleOptions,
            'DECIMAL': options.decimalOptions,
            'TEXT': options.textOptions,
            'STRING': options.stringOptions,
            'BOOLEAN': options.booleanOptions,
            'DATE': options.dateOptions,
            'DATEONLY': options.dateOnlyOptions,
            'UUID': options.uuidOptions
        }[i.type]
        const comp = {
            type: 'el-select',
            prop: `properties.${i.name}`,
            options: selectOptions
        }
        components.push({
            label: i.name,
            items: [comp]
        })
        defaultValue.properties[i.name] = selectOptions[0].options[0].val
    })

const gen = e => {
    const d = Array(e.number)
        .fill(null)
        .map(_ => {
            const row = {}
            props.properties
                .filter(i => i.id > -1)
                .forEach(i => {
                    const val = e.properties[i.name]
                    row[i.name] = generate(e.lang, val)
                })
            return row
        })

    emit('update:modelValue', false)
    emit('update', d)
}

const config = ref({
    stay: true,
    customBtn: 'Generate',
    hideCancel: true,
    actions: {
        click: {
            func: gen,
            description: 'Generate fake data'
        }
    },
    default: defaultValue,
    components
})
</script>

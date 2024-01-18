<template>
    <el-date-picker
        v-model="value"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date" />
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { onMounted } from 'vue'

const props = defineProps(['modelValue'])

const value = ref(null)

onMounted(() => {
    value.value = props.modelValue
})

const emit = defineEmits(['update:modelValue'])

const shortcuts = ref([
    {
        text: 'Last 5 mins',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 60 * 5), d]
        }
    },
    {
        text: 'Last 15 mins',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 60 * 15), d]
        }
    },
    {
        text: 'Last 1 hour',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600), d]
        }
    },
    {
        text: 'Last 24 hours',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600 * 24), d]
        }
    },
    {
        text: 'Last 7 days',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600 * 24 * 7), d]
        }
    },
    {
        text: 'Last 30 days',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600 * 24 * 30), d]
        }
    },
    {
        text: 'Last 365 days',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600 * 24 * 365), d]
        }
    }
])

watch(value, newValue => {
    emit('update:modelValue', newValue)
})

watch(
    () => props.modelValue,
    newValue => {
        value.value = newValue
    }
)
</script>

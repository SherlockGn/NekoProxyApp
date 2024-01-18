<template>
    <div style="width: 100%">
        <div class="code" v-if="showHeader">{{ header }}</div>
        <codemirror
            v-model="value"
            :placeholder="placeholder"
            :style="{ maxHeight: height + 'px', width: '100%' }"
            :autofocus="false"
            :indent-with-tab="true"
            :tab-size="4"
            :extensions="extensions" />
        <div class="code" v-if="showHeader">}</div>
    </div>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { onMounted } from 'vue'

const props = defineProps({
    modelValue: String,
    showHeader: {
        type: Boolean,
        default: true
    },
    height: {
        type: Number,
        default: 150
    },
    placeholder: String,
    funcName: String,
    paramList: Array
})

const value = ref('')

onMounted(() => {
    value.value = props.modelValue
})

const emit = defineEmits(['update:modelValue'])

const header = computed(() => {
    return `const ${props.funcName} = (${props.paramList.join(', ')}) => {`
})

const extensions = [javascript(), oneDark]

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

<style scoped>
.code {
    background-color: black;
    color: rgb(171, 178, 191);
    padding-left: 20px;
    font-family: monospace;
}
</style>

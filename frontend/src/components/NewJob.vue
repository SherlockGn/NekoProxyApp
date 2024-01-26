<template>
    <edit-element :config="config" />
</template>

<script setup>
import { info } from '../utils/info'

const config = ref({
    newElRouter: {
        key: 'id'
    },
    actions: {
        getElById: rpc.job.getById,
        addEl: {
            func: rpc.job.add,
            description: 'create job'
        },
        updateEl: {
            func: async el => await rpc.rule.update(el.id, el),
            description: 'update job'
        },
    },
    default: {
        name: 'New Job',
        description: '',
        enabled: true,
        cron: '* 0 * * * *',
        script: '    console.log(\'Hello world!\')'
    },
    components: [
        {
            label: 'Name',
            validate: [
                {
                    required: true,
                    message: 'Please input the job name',
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
            label: 'Description',
            items: [
                {
                    type: 'el-input',
                    prop: 'description'
                }
            ]
        },
        {
            label: 'Enabled',
            items: [
                {
                    type: 'el-checkbox',
                    prop: 'enabled'
                }
            ]
        },
        {
            label: 'Cron',
            validate: [
                {
                    required: true,
                    message: 'Please input the job cron',
                    trigger: 'blur'
                }
            ],
            items: [
                {
                    type: 'el-input',
                    prop: 'cron'
                }
            ]
        },
        {
            label: 'Script',
            hint: info.job.script,
            items: [
                {
                    type: 'func-editor',
                    prop: 'script',
                    attrs: {
                        funcName: 'run',
                        paramList: ['utils'],
                        placeholder: '    console.log(\'Hello world!\')'
                    }
                }
            ]
        }
    ]
})
</script>

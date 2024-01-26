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
        getElById: rpc.project.getById,
        addEl: {
            func: rpc.project.add,
            description: 'create job'
        },
        updateEl: {
            func: async el => await rpc.project.update(el.id, el),
            description: 'update job'
        },
        afterGet: el => {
            return {
                ...el,
                branch: el.branch ?? '',
                script: el.script ?? '',
                args: el.args ?? ''
            }
        },
        beforeCreate: el => {
            return {
                ...el,
                branch: el.branch === '' ? null : el.branch,
                script: el.type === 'Static' ? null : el.script,
                args: el.type === 'Static' ? null : el.args,
                port: el.type === 'NodeServer' ? null : el.port
            }
        }
    },
    default: {
        name: 'New Project',
        description: '',
        repo: '',
        branch: '',
        type: 'Static',
        script: '',
        port: 8080,
        args: ''
    },
    components: [
        {
            label: 'Name',
            validate: [
                {
                    required: true,
                    message: 'Please input the project name',
                    trigger: 'blur'
                }
            ],
            items: [
                {
                    type: 'el-input',
                    prop: 'name',
                    disabledIfUpdate: true
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
            label: 'Repository',
            hint: info.project.repo,
            validate: [
                {
                    required: true,
                    message: 'Please input the project repository',
                    trigger: 'blur'
                }
            ],
            items: [
                {
                    type: 'el-input',
                    prop: 'repo',
                    disabledIfUpdate: true
                }
            ]
        },
        {
            label: 'Branch',
            hint: info.project.branch,
            items: [
                {
                    type: 'el-input',
                    prop: 'branch',
                    disabledIfUpdate: true
                }
            ]
        },
        {
            label: 'Type',
            hint: info.project.type,
            items: [
                {
                    type: 'el-select',
                    prop: 'type',
                    options: [
                        { val: 'Static', label: 'Static Web Page' },
                        { val: 'NodeServer', label: 'NodeJS Server App' }
                    ],
                    disabledIfUpdate: true
                }
            ]
        },
        {
            label: 'Script',
            showIf: el => el.type === 'NodeServer',
            items: [
                {
                    type: 'el-input',
                    prop: 'script',
                    attrs: {
                        placeholder: 'e.g. main.js'
                    }
                }
            ]
        },
        {
            label: 'Args',
            showIf: el => el.type === 'NodeServer',
            items: [
                {
                    type: 'el-input',
                    prop: 'args',
                    attrs: {
                        placeholder: 'e.g. --port 12345 --force'
                    }
                }
            ]
        },
        {
            label: 'Port',
            showIf: el => el.type === 'Static',
            items: [
                {
                    type: 'el-input-number',
                    prop: 'port',
                    attrs: { min: 1 }
                }
            ]
        }
    ]
})
</script>

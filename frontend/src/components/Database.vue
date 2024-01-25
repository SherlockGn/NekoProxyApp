<template>
    <Display :config="config" />
</template>

<script setup>
import { rpc } from '../utils/rpc'
import { useRouter } from 'vue-router'

const router = useRouter()

const config = ref({
    actions: {
        get: {
            func: rpc.db.get,
            description: 'refresh databases'
        },
        add: {
            func: async name => await rpc.db.add(name),
            getNameByDialog: true,
            description: 'create database',
            refreshRequired: true
        },
        del: {
            func: async el => await rpc.db.del(el.name),
            description: 'delete database',
            confirm: true,
            refreshRequired: true
        },
        config: {
            func: el => router.push({ name: 'Model', query: { db: el.name } })
        }
    },
    titles: [
        {
            val: "Currently there're no defined databases. ",
            displayIfEmpty: true
        },
        {
            val: 'Create',
            type: 'success',
            action: 'add'
        },
        {
            val: ' a new database. Or '
        },
        {
            val: 'refresh',
            type: 'primary',
            action: 'get'
        },
        {
            val: ' the list.'
        }
    ],
    header: el => ({ name: el.name }),
    extraText: [
        {
            val: 'Configure',
            type: 'primary',
            action: 'config'
        },
        {
            val: ' or '
        },
        {
            val: 'delete',
            type: 'danger',
            action: 'del'
        },
        {
            val: ' this database.'
        }
    ],
    props: [
        {
            label: 'Size',
            prop: 'size'
        },
        {
            label: 'Created at',
            prop: 'createdAt'
        },
        {
            label: 'Updated at',
            prop: 'updatedAt'
        }
    ]
})
</script>

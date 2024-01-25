<template>
    <Display :config="config" />
</template>

<script setup>
import { rpc } from '../utils/rpc'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const dbName = route.query.db

const config = ref({
    pageHeader: {
        text: `Configure the database ${dbName}`
    },
    actions: {
        get: {
            func: async () => await rpc.model.get(dbName),
            description: 'refresh models'
        },
        add: {
            func: async name => await rpc.model.add({ name, dbName }),
            getNameByDialog: true,
            description: 'create model',
            refreshRequired: true
        },
        del: {
            func: async el => await rpc.model.del(el.id),
            description: 'delete model',
            confirm: true,
            refreshRequired: true
        },
        config: {
            func: el =>
                router.push({ name: 'Property', query: { modelId: el.id } })
        },
        data: {
            func: el =>
                router.push({ name: 'ExploreData', query: { modelId: el.id } })
        },
        api: {
            func: el =>
                router.push({ name: 'ExploreApi', query: { modelId: el.id } })
        }
    },
    titles: [
        {
            val: "Currently there're no defined models. ",
            displayIfEmpty: true
        },
        {
            val: 'Create',
            type: 'success',
            action: 'add'
        },
        {
            val: ' a new model. Or '
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
            val: ' this model. Explore the '
        },
        {
            val: 'data',
            type: 'primary',
            action: 'data'
        },
        {
            val: ' and '
        },
        {
            val: 'APIs',
            type: 'primary',
            action: 'api'
        },
        {
            val: '.'
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

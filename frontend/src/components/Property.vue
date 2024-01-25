<template>
    <Display :config="config" />
</template>

<script setup>
import { rpc } from '../utils/rpc'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const modelId = route.query.modelId
// const model = await rpc.model.getById(modelId)
const model = {
    name: 'modelName',
    dbName: 'dbName'
}

const config = ref({
    pageHeader: {
        text: `Configure model ${model.name} in database ${model.dbName}`
    },
    actions: {
        newElRouter: {
            name: 'NewProperty',
            queryName: 'propertyId',
            extra: {
                modelId
            }
        },
        get: {
            func: async () => await rpc.property.get(modelId),
            description: 'refresh properties'
        },
        del: {
            func: async el => await rpc.property.del(el.id),
            description: 'delete property',
            confirm: true,
            refreshRequired: true
        }
    },
    titles: [
        {
            val: "Currently there're no defined properties. ",
            displayIfEmpty: true
        },
        {
            val: 'Create',
            type: 'success',
            action: 'add'
        },
        {
            val: ' a new property. Or '
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
            val: 'Update',
            type: 'primary',
            action: 'update'
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
            val: ' this property.'
        }
    ],
    props: [
        {
            label: 'Created at',
            prop: 'createdAt'
        },
        {
            label: 'Updated at',
            prop: 'updatedAt'
        },
        {
            label: 'Type',
            prop: 'type'
        },
        {
            label: 'Unique',
            prop: 'unique'
        },
        {
            label: 'Allow null',
            prop: 'allowNull'
        },
        {
            label: 'Default value',
            prop: el => JSON.parse(el.defaultValue)?.toString() ?? null
        },
        {
            label: 'Validate',
            prop: el => JSON.parse(el.validate)
        }
    ]
})
</script>

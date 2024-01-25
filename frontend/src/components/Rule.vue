<template>
    <Display :config="config" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'

const config = ref({
    draggable: {
        action: 'seq'
    },
    actions: {
        newElRouter: {
            name: 'NewRule',
            queryName: 'ruleId'
        },
        get: {
            func: rpc.rule.get,
            description: 'refresh proxy rules'
        },
        del: {
            func: async el => await rpc.rule.del(el.id),
            description: 'delete proxy rule',
            refreshRequired: true,
            confirm: true
        },
        seq: {
            func: async list => {
                const newSeq = list.map((el, idx) => ({
                    id: el.id,
                    sequence: idx
                }))
                const oldSeq = list.map(el => ({
                    id: el.id,
                    sequence: el.sequence
                }))
                const seqToUpdate = newSeq.filter(
                    el =>
                        el.sequence !==
                        oldSeq.find(el2 => el2.id === el.id).sequence
                )
                if (seqToUpdate.length === 0) {
                    return
                }
                return await rpc.rule.updateSeq(seqToUpdate)
            },
            description: 'update proxy sequence',
            refreshRequired: true
        }
    },
    titles: [
        {
            val: "Currently there're no defined proxy rules. ",
            displayIfEmpty: true
        },
        {
            val: 'Create',
            type: 'success',
            action: 'add'
        },
        {
            val: ' a new rule. Or '
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
    header: el => ({ name: el.name, description: el.description }),
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
            val: ' this rule.'
        }
    ],
    props: [
        {
            label: 'Port',
            prop: 'port'
        },
        {
            label: 'Created at',
            prop: 'createdAt'
        },
        {
            label: 'Updated at',
            prop: 'updatedAt'
        },
        {
            label: 'Limit',
            prop: el =>
                el.limit.replace(/(\d)([a-zA-Z])/g, '$1 $2').toUpperCase()
        },
        {
            label: 'Parse request body',
            prop: 'parseReqBody'
        },
        {
            label: 'Request as buffer',
            prop: 'reqAsBuffer'
        },
        {
            label: 'Timeout',
            prop: 'timeout'
        },
        {
            label: 'Memoize host',
            prop: 'memoizeHost'
        },
        {
            lable: 'Enforce HTTPS',
            prop: 'https'
        }
    ]
})
</script>

<template>
    <edit-element :config="config" />
</template>

<script setup>
import { info } from '../utils/info'

const config = ref({
    newElRouter: {
        key: 'ruleId'
    },
    actions: {
        getElById: async id => (await rpc.rule.get({ id: Number(id) }))[0],
        addEl: {
            func: rpc.rule.add,
            description: 'create proxy rule'
        },
        updateEl: {
            func: async el => await rpc.rule.update(el.id, el),
            description: 'update proxy rule'
        },
        afterGet: el => {
            const limit = el.limit
                .replace(/(\d)([a-zA-Z])/g, '$1 $2')
                .toUpperCase()
            return {
                ...el,
                timeout: el.timeout === null ? 0 : el.timeout,
                limit: {
                    val: parseInt(limit.split(' ')[0]),
                    unit: limit.split(' ')[1]
                }
            }
        },
        beforeCreate: el => {
            return {
                ...el,
                limit: `${el.limit.val}${el.limit.unit}`.toLowerCase(),
                timeout: el.timeout === 0 ? null : el.timeout
            }
        }
    },
    default: {
        name: 'My Proxy Rule',
        description: '',
        enabled: true,
        port: 8080,
        host: 'localhost:3000',
        filter: '    return true',
        path: '    return req.originalUrl',
        req: '    return req',
        reqBody: '    return body',
        resBody: '    return body',
        resHeader: '    return headers',
        limit: {
            val: 1,
            unit: 'MB'
        },
        parseReqBody: true,
        reqAsBuffer: true,
        timeout: 0,
        memoizeHost: false,
        https: false
    },
    components: [
        {
            label: 'Rule name',
            validate: [
                {
                    required: true,
                    message: 'Please input the rule name',
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
            label: 'Rule description',
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
            label: 'Port',
            items: [
                {
                    type: 'el-input-number',
                    prop: 'port',
                    attrs: { min: 1 }
                }
            ]
        },
        {
            label: 'Host',
            validate: [
                {
                    required: true,
                    message: 'Please input the host',
                    trigger: 'blur'
                }
            ],
            items: [
                {
                    type: 'el-input',
                    prop: 'host'
                }
            ]
        },
        {
            label: 'Content limit',
            items: [
                {
                    type: 'el-input-number',
                    prop: 'limit.val'
                },
                {
                    type: 'el-select',
                    options: ['KB', 'MB', 'GB', 'TB', 'PB'],
                    prop: 'limit.unit'
                }
            ]
        },
        {
            label: 'Timeout (ms)',
            items: [
                {
                    type: 'el-input-number',
                    prop: 'timeout',
                    attrs: { min: 0 }
                }
            ]
        },
        {
            label: 'Parse request body',
            items: [
                {
                    type: 'el-checkbox',
                    prop: 'parseReqBody'
                }
            ]
        },
        {
            label: 'Request as buffer',
            items: [
                {
                    type: 'el-checkbox',
                    prop: 'reqAsBuffer'
                }
            ]
        },
        {
            label: 'Memoize host',
            items: [
                {
                    type: 'el-checkbox',
                    prop: 'memoizeHost'
                }
            ]
        },
        {
            label: 'Enforce HTTPS',
            items: [
                {
                    type: 'el-checkbox',
                    prop: 'https'
                }
            ]
        },
        {
            label: 'Filter',
            hint: info.rule.filter,
            items: [
                {
                    type: 'func-editor',
                    prop: 'filter',
                    attrs: {
                        funcName: 'filter',
                        paramList: ['req'],
                        placeholder: '    return true'
                    }
                }
            ]
        },
        {
            label: 'Forward path',
            hint: info.rule.path,
            items: [
                {
                    type: 'func-editor',
                    prop: 'path',
                    attrs: {
                        funcName: 'path',
                        paramList: ['req'],
                        placeholder: '    return req.originalUrl'
                    }
                }
            ]
        },
        {
            label: 'Request',
            hint: info.rule.req,
            items: [
                {
                    type: 'func-editor',
                    prop: 'req',
                    attrs: {
                        funcName: 'req',
                        paramList: ['req'],
                        placeholder: '    return req'
                    }
                }
            ]
        },
        {
            label: 'Request body',
            hint: info.rule.reqBody,
            items: [
                {
                    type: 'func-editor',
                    prop: 'reqBody',
                    attrs: {
                        funcName: 'reqBody',
                        paramList: ['body'],
                        placeholder: '    return body'
                    }
                }
            ]
        },
        {
            label: 'Response headers',
            hint: info.rule.resHeader,
            items: [
                {
                    type: 'func-editor',
                    prop: 'resHeader',
                    attrs: {
                        funcName: 'resHeader',
                        paramList: ['headers'],
                        placeholder: '    return headers'
                    }
                }
            ]
        },
        {
            label: 'Response body',
            hint: info.rule.resBody,
            items: [
                {
                    type: 'func-editor',
                    prop: 'resBody',
                    attrs: {
                        funcName: 'resBody',
                        paramList: ['body'],
                        placeholder: '    return body'
                    }
                }
            ]
        }
    ]
})
</script>

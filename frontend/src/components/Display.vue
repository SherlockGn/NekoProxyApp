<template>
    <!-- eslint-disable -->
    <div>
        <el-page-header v-if="config.pageHeader" @back="back" style="margin-bottom: 20px">
            <template #content>
                <span class="text-large font-600 mr-3">
                    {{ config.pageHeader.text }}
                </span>
            </template>
        </el-page-header>
        <div style="margin-bottom: 30px">
            <el-row>
                <template v-for="(textItem, index) in config.titles">
                    <template v-if="textItem.type">
                        <el-link
                            :key="index"
                            v-if="textItem.type"
                            :type="textItem.type"
                            :underline="false"
                            @click="getAction(textItem.action)">
                            {{ textItem.val }}
                        </el-link>
                    </template>
                    <template
                        v-else-if="showTextItem(textItem)">
                        <el-text
                            :key="index"
                            v-html="
                                textItem.val.replace(/ /g, '&nbsp;')
                            "></el-text>
                    </template>
                </template>
            </el-row>
        </div>
        <div>
            <template v-if="config.draggable">
                <draggable
                    :list="list"
                    item-key="name"
                    @end="resequence"
                    class="list-group"
                    ghost-class="ghost"
                    :disabled="false">
                    <template #item="{ element }">
                        <div>
                            <display-item
                                :name="config.header(element).name"
                                :description="
                                    config.header(element).description
                                "
                                :text="getExtraText(element)"
                                :element="element"
                                :props="config.props"></display-item>
                        </div>
                    </template>
                </draggable>
            </template>
            <template v-else>
                <div
                    style="margin-bottom: 30px"
                    v-for="element in list"
                    :key="element.id">
                    <display-item
                        :name="config.header(element).name"
                        :description="config.header(element).description"
                        :text="getExtraText(element)"
                        :element="element"
                        :props="config.props"></display-item>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { useRouter } from 'vue-router'
import { toastAction } from '../utils/toastAction'

const props = defineProps({
    config: {
        type: Object
    }
})

const list = ref([])
const router = useRouter()

onMounted(async () => {
    await toastAction(getItems, props.config.actions.get.description)
})

const getItems = async () => {
    list.value = await props.config.actions.get.func()
}

const getAction = async (item, el) => {
    let func, description, confirm, refreshRequired, getNameByDialog

    if (typeof item === 'function') {
        func = item
    }
    if (typeof item === 'string') {
        if (
            !props.config.actions[item] &&
            props.config.actions.newElRouter &&
            (item === 'add' || item === 'update')
        ) {
            if (item === 'add') {
                func = () =>
                    router.push({
                        name: props.config.actions.newElRouter.name,
                        query: {
                            ...(props.config.actions.newElRouter.extra ?? {})
                        }
                    })
            }
            if (item === 'update') {
                func = () =>
                    router.push({
                        name: props.config.actions.newElRouter.name,
                        query: {
                            [props.config.actions.newElRouter.queryName]: el.id,
                            ...(props.config.actions.newElRouter.extra ?? {})
                        }
                    })
            }
        } else {
            func = props.config.actions[item].func
            description = props.config.actions[item].description
            confirm = props.config.actions[item].confirm
            refreshRequired = props.config.actions[item].refreshRequired
            getNameByDialog = props.config.actions[item].getNameByDialog
        }
    }
    if (typeof item === 'object') {
        func = item.func
        description = item.description
        confirm = item.confirm
        refreshRequired = item.refreshRequired
        getNameByDialog = item.getNameByDialog
    }

    if (!func) {
        return
    }

    if (confirm) {
        try {
            const {
                msg = 'This item will be permanently deleted. Continue?',
                type = 'Warning'
            } = confirm
            await ElMessageBox.confirm(msg, type, {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
        } catch {
            return
        }
    }
    let ret
    if (getNameByDialog) {
        let name = null
        const {
            msg = 'Please input the name',
            title = 'Create item',
            inputErrorMessage = 'Name cannot be empty',
            inputPattern = /^.+$/
        } = getNameByDialog
        try {
            name = await ElMessageBox.prompt(msg, title, {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputErrorMessage,
                inputPattern
            })
        } catch {
            return
        }
        el = name.value
    }
    if (description) {
        ret = await toastAction(async () => await func(el), description)
    } else {
        ret = await func(el)
    }
    if (refreshRequired) {
        await getItems()
    }

    if (item === 'get') {
        list.value = ret
    }
}

const showTextItem = textItem => {
    if (textItem.displayIfEmpty) {
        return list.value.length === 0
    }
    if (textItem.displayIfNotEmpty) {
        return list.value.length > 0
    }
    return true
}

const getExtraText = el => {
    return props.config.extraText.map(item => {
        return {
            ...item,
            action: () => getAction(item.action, el)
        }
    })
}

const resequence = async e => {
    return await getAction(props.config.draggable.action, list.value)
}

const back = () => {
    router.back()
}
</script>

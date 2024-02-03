export const toastAction = async (action, hint) => {
    try {
        const ret = await action()
        const message =
            !hint || hint.length === 0
                ? 'The operation was successful.'
                : `The operation "${hint}" was successful.`
        ElMessage({
            message,
            type: 'success'
        })
        return ret
    } catch (ex) {
        console.error(ex)
        const message =
            !hint || hint.length === 0
                ? 'The operation failed.'
                : `The operation "${hint}" failed.`
        const errorMsg = ex.message
        ElMessage({
            message: `${message} (${errorMsg})`,
            type: 'error'
        })
    }
}

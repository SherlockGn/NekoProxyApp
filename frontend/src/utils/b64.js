export const base64 = str => {
    return window.btoa(unescape(encodeURIComponent(str)))
}

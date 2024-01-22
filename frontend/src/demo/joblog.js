const now = new Date().toJSON()

const logs = [
    {
        'id': 226,
        'name': 'Animechan',
        'transaction': 'e7c1da1d-2a2e-4791-ad9e-4ef990d0e2f4',
        'status': 'end',
        'output':
            '{"anime":"Brave 10","character":"Anastasia","quote":"Do you think you\'re the main character of some kind of sob story? You don\'t want to see people get hurt, so you cover your eyes and ears. Using your grief to hide the suffering is the easiest path to take. But I won\'t forgive you if you do. You\'re a Brave aren\'t you? Do you intend to live as someone who\'s always protected by others!? Fight! What will you solve by running away? The ability to keep going forward is strength as well! Physical strength is not all there is to it!"}',
        'error': null,
        'duration': 689,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 225,
        'name': 'Animechan',
        'transaction': 'e7c1da1d-2a2e-4791-ad9e-4ef990d0e2f4',
        'status': 'start',
        'output': null,
        'error': null,
        'duration': null,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 224,
        'name': 'Hello world',
        'transaction': 'e4f3ab7a-d41d-471f-a151-43165189f07b',
        'status': 'end',
        'output': null,
        'error': null,
        'duration': 3,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 223,
        'name': 'Hello world',
        'transaction': 'e4f3ab7a-d41d-471f-a151-43165189f07b',
        'status': 'start',
        'output': null,
        'error': null,
        'duration': null,
        'createdAt': now,
        'updatedAt': now
    }
]

const get = (timerange, keyword, offset, limit) => {
    let lg = [...logs]
    if (timerange) {
        lg = lg.filter(
            item =>
                new Date(item.createdAt) >= new Date(timerange[0]) &&
                new Date(item.createdAt) <= new Date(timerange[1])
        )
    }
    if (keyword) {
        keyword = keyword.toLowerCase()
        lg = lg.filter(
            item =>
                item.transaction?.toLowerCase()?.includes(keyword) ||
                item.status?.toLowerCase()?.includes(keyword) ||
                item.output?.toLowerCase()?.includes(keyword) ||
                item.error?.toLowerCase()?.includes(keyword)
        )
    }
    const count = lg.length
    return {
        data: lg.slice(offset, offset + limit),
        count
    }
}

const clear = () => {
    logs.splice(0, logs.length)
}

export default {
    get,
    clear
}

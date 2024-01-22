const now = new Date().toJSON()

const logs = [
    {
        'id': 11,
        'url': '/api/datacenter/MyFirstDB/Student',
        'method': 'DELETE',
        'status': 403,
        'transaction': '0314b94d-da4e-4ed3-972b-e3b1be1faa76',
        'duration': 3,
        'reqLength': 9,
        'resLength': 9,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'bulkDelete',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 10,
        'url': '/api/datacenter/MyFirstDB/Student',
        'method': 'DELETE',
        'status': 200,
        'transaction': '14b73abd-bb4e-4f62-8c88-d551cf0a7ece',
        'duration': 6,
        'reqLength': 9,
        'resLength': 0,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'bulkDelete',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 9,
        'url': '/api/datacenter/MyFirstDB/Student/1',
        'method': 'DELETE',
        'status': 200,
        'transaction': '5134944d-70ff-4024-bc16-2c8c3fe2bdf2',
        'duration': 5,
        'reqLength': 0,
        'resLength': 1,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'delete',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 8,
        'url': '/api/datacenter/MyFirstDB/Student/2',
        'method': 'DELETE',
        'status': 200,
        'transaction': '7c7129b8-4da4-4d78-9c9f-89a19edd320e',
        'duration': 2,
        'reqLength': 0,
        'resLength': 1,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'delete',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 7,
        'url': '/api/datacenter/MyFirstDB/Student',
        'method': 'PUT',
        'status': 200,
        'transaction': 'a6606426-4b09-466e-ad75-7b9387ba0849',
        'duration': 6,
        'reqLength': 42,
        'resLength': 3,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'update',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 6,
        'url': '/api/datacenter/MyFirstDB/Student/1',
        'method': 'GET',
        'status': 200,
        'transaction': 'b70f4fa9-848e-4c98-8e73-d5249db4ee02',
        'duration': 4,
        'reqLength': 0,
        'resLength': 120,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'queryByPk',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 5,
        'url': '/api/datacenter/MyFirstDB/Student',
        'method': 'POST',
        'status': 200,
        'transaction': '5c9426bb-5e4b-4b2a-accd-d8361cee93a6',
        'duration': 5,
        'reqLength': 35,
        'resLength': 120,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'create',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 4,
        'url': '/api/datacenter/MyFirstDB/Student/$query',
        'method': 'POST',
        'status': 200,
        'transaction': '33d9bc06-fcd7-402c-9254-149a17318089',
        'duration': 6,
        'reqLength': 152,
        'resLength': 2,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'advancedQuery',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 3,
        'url': '/api/datacenter/MyFirstDB/Student/1',
        'method': 'GET',
        'status': 404,
        'transaction': '8d9e8a40-c0d3-4014-812b-a6319c4d0a58',
        'duration': 3,
        'reqLength': 0,
        'resLength': 9,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'queryByPk',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 2,
        'url': '/api/datacenter/MyFirstDB/Student?',
        'method': 'GET',
        'status': 200,
        'transaction': '44b4559c-e61b-4c0f-ba38-17abc2053f52',
        'duration': 37,
        'reqLength': 0,
        'resLength': 2,
        'db': 'MyFirstDB',
        'model': 'Student',
        'type': 'query',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 1,
        'url': '/api/datacenter/MyFirstDB/Teacher/1',
        'method': 'GET',
        'status': 403,
        'transaction': 'e1265be2-5a70-46a8-9e7a-608a7d58178f',
        'duration': 2,
        'reqLength': 0,
        'resLength': 9,
        'db': null,
        'model': null,
        'type': 'queryByPk',
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
                item.url?.toLowerCase()?.includes(keyword) ||
                item.method?.toLowerCase()?.includes(keyword) ||
                item.type?.toLowerCase()?.includes(keyword)
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

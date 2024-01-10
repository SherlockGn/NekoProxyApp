export const loadExampleObject = (isCreate, properties, selected) => {
    let data = {}
    if (!isCreate) {
        data = JSON.parse(JSON.stringify(selected))
        delete data.createdAt
        delete data.updatedAt
    } else {
        properties.forEach(p => {
            if (['id', 'createdAt', 'updatedAt'].includes(p.name)) {
                return
            }
            const defaultValue = p.defaultValue === null ? null : JSON.parse(p.defaultValue)
            if (defaultValue !== null) {
                const isBuiltInDefault = typeof defaultValue === 'string' && defaultValue.startsWith('#DataTypes.') && defaultValue.endsWith('#')
                if (!isBuiltInDefault) {
                    data[p.name] = defaultValue
                    return
                } else {
                    return
                }
            }
            if (p.allowNull) {
                data[p.name] = null
                return
            }
            const defaultValueMapper = {
                'INTEGER': 0,
                'BIGINT': 0,
                'FLOAT': 0.5,
                'DOUBLE': 0.5,
                'DECIMAL': 0,
                'TEXT': 'Example Text',
                'STRING': 'Example String',
                'BOOLEAN': false,
                'DATE': new Date().toLocaleString(),
                'DATEONLY': new Date().toLocaleString(),
                'UUID': '0000000-0000-0000-0000-000'
            }
            data[p.name] = defaultValueMapper[p.type]
        })
    }
    return data
}
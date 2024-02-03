import { faker, fakerZH_CN } from '@faker-js/faker'

const integerOptions = [
    {
        label: 'Number',
        options: [
            {
                label: 'int',
                val: 'number.int'
            }
        ]
    }
]

const bigIntOptions = [
    {
        label: 'Number',
        options: [
            {
                label: 'bigInt',
                val: 'number.bigInt'
            }
        ]
    }
]

const floatOptions = [
    {
        label: 'Number',
        options: [
            {
                label: 'float',
                val: 'number.float'
            }
        ]
    }
]

const doubleOptions = [
    {
        label: 'Number',
        options: [
            {
                label: 'float',
                val: 'number.float'
            }
        ]
    }
]

const decimalOptions = [
    {
        label: 'Number',
        options: [
            {
                'label': 'bigInt',
                'val': 'number.bigInt'
            },
            {
                'label': 'float',
                'val': 'number.float'
            },
            {
                'label': 'int',
                'val': 'number.int'
            }
        ]
    }
]

const booleanOptions = [
    {
        label: 'Datatype',
        options: [
            {
                label: 'boolean',
                val: 'datatype.boolean'
            }
        ]
    }
]

const dateOptions = [
    {
        label: 'Date',
        options: [
            {
                'label': 'anytime',
                'val': 'date.anytime'
            },
            {
                'label': 'birthdate',
                'val': 'date.birthdate'
            },
            {
                'label': 'future',
                'val': 'date.future'
            },
            // {
            //     'label': 'month',
            //     'val': 'date.month'
            // },
            {
                'label': 'past',
                'val': 'date.past'
            },
            {
                'label': 'recent',
                'val': 'date.recent'
            },
            {
                'label': 'soon',
                'val': 'date.soon'
            }
            // {
            //     'label': 'weekday',
            //     'val': 'date.weekday'
            // }
        ]
    }
]

const dateOnlyOptions = dateOptions

const uuidOptions = [
    {
        label: 'String',
        options: [
            {
                label: 'uuid',
                val: 'string.uuid'
            }
        ]
    }
]

const stringOptions = [
    {
        label: 'Airline',
        options: [
            {
                'label': 'aircraftType',
                'val': 'airline.aircraftType'
            },
            {
                'label': 'airline',
                'val': 'airline.airline'
            },
            {
                'label': 'airplane',
                'val': 'airline.airplane'
            },
            {
                'label': 'airport',
                'val': 'airline.airport'
            },
            {
                'label': 'flightNumber',
                'val': 'airline.flightNumber'
            },
            {
                'label': 'recordLocator',
                'val': 'airline.recordLocator'
            },
            {
                'label': 'seat',
                'val': 'airline.seat'
            }
        ]
    },
    {
        label: 'Animal',
        options: [
            {
                'label': 'bear',
                'val': 'animal.bear'
            },
            {
                'label': 'bird',
                'val': 'animal.bird'
            },
            {
                'label': 'cat',
                'val': 'animal.cat'
            },
            {
                'label': 'cetacean',
                'val': 'animal.cetacean'
            },
            {
                'label': 'cow',
                'val': 'animal.cow'
            },
            {
                'label': 'crocodilia',
                'val': 'animal.crocodilia'
            },
            {
                'label': 'dog',
                'val': 'animal.dog'
            },
            {
                'label': 'fish',
                'val': 'animal.fish'
            },
            {
                'label': 'horse',
                'val': 'animal.horse'
            },
            {
                'label': 'insect',
                'val': 'animal.insect'
            },
            {
                'label': 'lion',
                'val': 'animal.lion'
            },
            {
                'label': 'rabbit',
                'val': 'animal.rabbit'
            },
            {
                'label': 'rodent',
                'val': 'animal.rodent'
            },
            {
                'label': 'snake',
                'val': 'animal.snake'
            },
            {
                'label': 'type',
                'val': 'animal.type'
            }
        ]
    },
    {
        'label': 'Color',
        'options': [
            {
                'label': 'cmyk',
                'val': 'color.cmyk'
            },
            {
                'label': 'colorByCSSColorSpace',
                'val': 'color.colorByCSSColorSpace'
            },
            {
                'label': 'cssSupportedFunction',
                'val': 'color.cssSupportedFunction'
            },
            {
                'label': 'cssSupportedSpace',
                'val': 'color.cssSupportedSpace'
            },
            {
                'label': 'hsl',
                'val': 'color.hsl'
            },
            {
                'label': 'human',
                'val': 'color.human'
            },
            {
                'label': 'hwb',
                'val': 'color.hwb'
            },
            {
                'label': 'lab',
                'val': 'color.lab'
            },
            {
                'label': 'lch',
                'val': 'color.lch'
            },
            {
                'label': 'rgb',
                'val': 'color.rgb'
            },
            {
                'label': 'space',
                'val': 'color.space'
            }
        ]
    },
    {
        'label': 'Commerce',
        'options': [
            {
                'label': 'department',
                'val': 'commerce.department'
            },
            {
                'label': 'isbn',
                'val': 'commerce.isbn'
            },
            {
                'label': 'price',
                'val': 'commerce.price'
            },
            {
                'label': 'product',
                'val': 'commerce.product'
            },
            {
                'label': 'productAdjective',
                'val': 'commerce.productAdjective'
            },
            {
                'label': 'productDescription',
                'val': 'commerce.productDescription'
            },
            {
                'label': 'productMaterial',
                'val': 'commerce.productMaterial'
            },
            {
                'label': 'productName',
                'val': 'commerce.productName'
            }
        ]
    },
    {
        'label': 'Company',
        'options': [
            {
                'label': 'buzzAdjective',
                'val': 'company.buzzAdjective'
            },
            {
                'label': 'buzzNoun',
                'val': 'company.buzzNoun'
            },
            {
                'label': 'buzzPhrase',
                'val': 'company.buzzPhrase'
            },
            {
                'label': 'buzzVerb',
                'val': 'company.buzzVerb'
            },
            {
                'label': 'catchPhrase',
                'val': 'company.catchPhrase'
            },
            {
                'label': 'catchPhraseAdjective',
                'val': 'company.catchPhraseAdjective'
            },
            {
                'label': 'catchPhraseDescriptor',
                'val': 'company.catchPhraseDescriptor'
            },
            {
                'label': 'catchPhraseNoun',
                'val': 'company.catchPhraseNoun'
            },
            {
                'label': 'name',
                'val': 'company.name'
            }
        ]
    },
    {
        'label': 'Database',
        'options': [
            {
                'label': 'collation',
                'val': 'database.collation'
            },
            {
                'label': 'column',
                'val': 'database.column'
            },
            {
                'label': 'engine',
                'val': 'database.engine'
            },
            {
                'label': 'mongodbObjectId',
                'val': 'database.mongodbObjectId'
            },
            {
                'label': 'type',
                'val': 'database.type'
            }
        ]
    },
    {
        label: 'Date',
        options: [
            {
                'label': 'month',
                'val': 'date.month'
            },
            {
                'label': 'weekday',
                'val': 'date.weekday'
            }
        ]
    },
    {
        'label': 'Finance',
        'options': [
            {
                'label': 'accountName',
                'val': 'finance.accountName'
            },
            {
                'label': 'accountNumber',
                'val': 'finance.accountNumber'
            },
            {
                'label': 'amount',
                'val': 'finance.amount'
            },
            {
                'label': 'bic',
                'val': 'finance.bic'
            },
            {
                'label': 'bitcoinAddress',
                'val': 'finance.bitcoinAddress'
            },
            {
                'label': 'creditCardCVV',
                'val': 'finance.creditCardCVV'
            },
            {
                'label': 'creditCardIssuer',
                'val': 'finance.creditCardIssuer'
            },
            {
                'label': 'creditCardNumber',
                'val': 'finance.creditCardNumber'
            },
            {
                'label': 'currency',
                'val': 'finance.currency'
            },
            {
                'label': 'currencyCode',
                'val': 'finance.currencyCode'
            },
            {
                'label': 'currencyName',
                'val': 'finance.currencyName'
            },
            {
                'label': 'currencySymbol',
                'val': 'finance.currencySymbol'
            },
            {
                'label': 'ethereumAddress',
                'val': 'finance.ethereumAddress'
            },
            {
                'label': 'iban',
                'val': 'finance.iban'
            },
            {
                'label': 'litecoinAddress',
                'val': 'finance.litecoinAddress'
            },
            {
                'label': 'maskedNumber',
                'val': 'finance.maskedNumber'
            },
            {
                'label': 'pin',
                'val': 'finance.pin'
            },
            {
                'label': 'routingNumber',
                'val': 'finance.routingNumber'
            },
            {
                'label': 'transactionDescription',
                'val': 'finance.transactionDescription'
            },
            {
                'label': 'transactionType',
                'val': 'finance.transactionType'
            }
        ]
    },
    {
        'label': 'Git',
        'options': [
            {
                'label': 'branch',
                'val': 'git.branch'
            },
            {
                'label': 'commitDate',
                'val': 'git.commitDate'
            },
            {
                'label': 'commitEntry',
                'val': 'git.commitEntry'
            },
            {
                'label': 'commitMessage',
                'val': 'git.commitMessage'
            },
            {
                'label': 'commitSha',
                'val': 'git.commitSha'
            }
        ]
    },
    {
        'label': 'Hacker',
        'options': [
            {
                'label': 'abbreviation',
                'val': 'hacker.abbreviation'
            },
            {
                'label': 'adjective',
                'val': 'hacker.adjective'
            },
            {
                'label': 'ingverb',
                'val': 'hacker.ingverb'
            },
            {
                'label': 'noun',
                'val': 'hacker.noun'
            },
            {
                'label': 'phrase',
                'val': 'hacker.phrase'
            },
            {
                'label': 'verb',
                'val': 'hacker.verb'
            }
        ]
    },
    {
        'label': 'Image',
        'options': [
            {
                'label': 'avatar',
                'val': 'image.avatar'
            },
            {
                'label': 'avatarGitHub',
                'val': 'image.avatarGitHub'
            },
            {
                'label': 'avatarLegacy',
                'val': 'image.avatarLegacy'
            },
            {
                'label': 'dataUri',
                'val': 'image.dataUri'
            },
            {
                'label': 'url',
                'val': 'image.url'
            },
            {
                'label': 'urlLoremFlickr',
                'val': 'image.urlLoremFlickr'
            },
            {
                'label': 'urlPicsumPhotos',
                'val': 'image.urlPicsumPhotos'
            },
            {
                'label': 'urlPlaceholder',
                'val': 'image.urlPlaceholder'
            }
        ]
    },
    {
        'label': 'Internet',
        'options': [
            {
                'label': 'color',
                'val': 'internet.color'
            },
            {
                'label': 'displayName',
                'val': 'internet.displayName'
            },
            {
                'label': 'domainName',
                'val': 'internet.domainName'
            },
            {
                'label': 'domainSuffix',
                'val': 'internet.domainSuffix'
            },
            {
                'label': 'domainWord',
                'val': 'internet.domainWord'
            },
            {
                'label': 'email',
                'val': 'internet.email'
            },
            {
                'label': 'emoji',
                'val': 'internet.emoji'
            },
            {
                'label': 'exampleEmail',
                'val': 'internet.exampleEmail'
            },
            {
                'label': 'httpMethod',
                'val': 'internet.httpMethod'
            },
            {
                'label': 'httpStatusCode',
                'val': 'internet.httpStatusCode'
            },
            {
                'label': 'ip',
                'val': 'internet.ip'
            },
            {
                'label': 'ipv4',
                'val': 'internet.ipv4'
            },
            {
                'label': 'ipv6',
                'val': 'internet.ipv6'
            },
            {
                'label': 'mac',
                'val': 'internet.mac'
            },
            {
                'label': 'password',
                'val': 'internet.password'
            },
            {
                'label': 'port',
                'val': 'internet.port'
            },
            {
                'label': 'protocol',
                'val': 'internet.protocol'
            },
            {
                'label': 'url',
                'val': 'internet.url'
            },
            {
                'label': 'userAgent',
                'val': 'internet.userAgent'
            },
            {
                'label': 'userName',
                'val': 'internet.userName'
            }
        ]
    },
    {
        'label': 'Location',
        'options': [
            {
                'label': 'buildingNumber',
                'val': 'location.buildingNumber'
            },
            {
                'label': 'cardinalDirection',
                'val': 'location.cardinalDirection'
            },
            {
                'label': 'city',
                'val': 'location.city'
            },
            {
                'label': 'country',
                'val': 'location.country'
            },
            {
                'label': 'countryCode',
                'val': 'location.countryCode'
            },
            {
                'label': 'county',
                'val': 'location.county'
            },
            {
                'label': 'direction',
                'val': 'location.direction'
            },
            {
                'label': 'latitude',
                'val': 'location.latitude'
            },
            {
                'label': 'longitude',
                'val': 'location.longitude'
            },
            {
                'label': 'nearbyGPSCoordinate',
                'val': 'location.nearbyGPSCoordinate'
            },
            {
                'label': 'ordinalDirection',
                'val': 'location.ordinalDirection'
            },
            {
                'label': 'secondaryAddress',
                'val': 'location.secondaryAddress'
            },
            {
                'label': 'state',
                'val': 'location.state'
            },
            {
                'label': 'street',
                'val': 'location.street'
            },
            {
                'label': 'streetAddress',
                'val': 'location.streetAddress'
            },
            {
                'label': 'timeZone',
                'val': 'location.timeZone'
            },
            {
                'label': 'zipCode',
                'val': 'location.zipCode'
            }
        ]
    },
    {
        'label': 'Lorem',
        'options': [
            {
                'label': 'lines',
                'val': 'lorem.lines'
            },
            {
                'label': 'paragraph',
                'val': 'lorem.paragraph'
            },
            {
                'label': 'paragraphs',
                'val': 'lorem.paragraphs'
            },
            {
                'label': 'sentence',
                'val': 'lorem.sentence'
            },
            {
                'label': 'sentences',
                'val': 'lorem.sentences'
            },
            {
                'label': 'slug',
                'val': 'lorem.slug'
            },
            {
                'label': 'text',
                'val': 'lorem.text'
            },
            {
                'label': 'word',
                'val': 'lorem.word'
            },
            {
                'label': 'words',
                'val': 'lorem.words'
            }
        ]
    },
    {
        'label': 'Music',
        'options': [
            {
                'label': 'genre',
                'val': 'music.genre'
            },
            {
                'label': 'songName',
                'val': 'music.songName'
            }
        ]
    },
    {
        'label': 'Number',
        'options': [
            {
                'label': 'binary',
                'val': 'number.binary'
            },
            {
                'label': 'hex',
                'val': 'number.hex'
            },
            {
                'label': 'octal',
                'val': 'number.octal'
            }
        ]
    },
    {
        'label': 'Person',
        'options': [
            {
                'label': 'bio',
                'val': 'person.bio'
            },
            {
                'label': 'firstName',
                'val': 'person.firstName'
            },
            {
                'label': 'fullName',
                'val': 'person.fullName'
            },
            {
                'label': 'gender',
                'val': 'person.gender'
            },
            {
                'label': 'jobArea',
                'val': 'person.jobArea'
            },
            {
                'label': 'jobDescriptor',
                'val': 'person.jobDescriptor'
            },
            {
                'label': 'jobTitle',
                'val': 'person.jobTitle'
            },
            {
                'label': 'jobType',
                'val': 'person.jobType'
            },
            {
                'label': 'lastName',
                'val': 'person.lastName'
            },
            {
                'label': 'middleName',
                'val': 'person.middleName'
            },
            {
                'label': 'prefix',
                'val': 'person.prefix'
            },
            {
                'label': 'sex',
                'val': 'person.sex'
            },
            {
                'label': 'sexType',
                'val': 'person.sexType'
            },
            {
                'label': 'suffix',
                'val': 'person.suffix'
            },
            {
                'label': 'zodiacSign',
                'val': 'person.zodiacSign'
            }
        ]
    },
    {
        'label': 'Phone',
        'options': [
            {
                'label': 'imei',
                'val': 'phone.imei'
            },
            {
                'label': 'number',
                'val': 'phone.number'
            }
        ]
    },
    {
        'label': 'Science',
        'options': [
            {
                'label': 'chemicalElement',
                'val': 'science.chemicalElement'
            },
            {
                'label': 'unit',
                'val': 'science.unit'
            }
        ]
    },
    {
        'label': 'String',
        'options': [
            {
                'label': 'alpha',
                'val': 'string.alpha'
            },
            {
                'label': 'alphanumeric',
                'val': 'string.alphanumeric'
            },
            {
                'label': 'binary',
                'val': 'string.binary'
            },
            {
                'label': 'fromCharacters',
                'val': 'string.fromCharacters'
            },
            {
                'label': 'hexadecimal',
                'val': 'string.hexadecimal'
            },
            {
                'label': 'nanoid',
                'val': 'string.nanoid'
            },
            {
                'label': 'numeric',
                'val': 'string.numeric'
            },
            {
                'label': 'octal',
                'val': 'string.octal'
            },
            {
                'label': 'sample',
                'val': 'string.sample'
            },
            {
                'label': 'symbol',
                'val': 'string.symbol'
            },
            {
                'label': 'uuid',
                'val': 'string.uuid'
            }
        ]
    },
    {
        'label': 'System',
        'options': [
            {
                'label': 'commonFileExt',
                'val': 'system.commonFileExt'
            },
            {
                'label': 'commonFileName',
                'val': 'system.commonFileName'
            },
            {
                'label': 'commonFileType',
                'val': 'system.commonFileType'
            },
            {
                'label': 'cron',
                'val': 'system.cron'
            },
            {
                'label': 'directoryPath',
                'val': 'system.directoryPath'
            },
            {
                'label': 'fileExt',
                'val': 'system.fileExt'
            },
            {
                'label': 'fileName',
                'val': 'system.fileName'
            },
            {
                'label': 'filePath',
                'val': 'system.filePath'
            },
            {
                'label': 'fileType',
                'val': 'system.fileType'
            },
            {
                'label': 'mimeType',
                'val': 'system.mimeType'
            },
            {
                'label': 'networkInterface',
                'val': 'system.networkInterface'
            },
            {
                'label': 'semver',
                'val': 'system.semver'
            }
        ]
    },
    {
        'label': 'Vehicle',
        'options': [
            {
                'label': 'bicycle',
                'val': 'vehicle.bicycle'
            },
            {
                'label': 'color',
                'val': 'vehicle.color'
            },
            {
                'label': 'fuel',
                'val': 'vehicle.fuel'
            },
            {
                'label': 'manufacturer',
                'val': 'vehicle.manufacturer'
            },
            {
                'label': 'model',
                'val': 'vehicle.model'
            },
            {
                'label': 'type',
                'val': 'vehicle.type'
            },
            {
                'label': 'vehicle',
                'val': 'vehicle.vehicle'
            },
            {
                'label': 'vin',
                'val': 'vehicle.vin'
            },
            {
                'label': 'vrm',
                'val': 'vehicle.vrm'
            }
        ]
    },
    {
        'label': 'Word',
        'options': [
            {
                'label': 'adjective',
                'val': 'word.adjective'
            },
            {
                'label': 'adverb',
                'val': 'word.adverb'
            },
            {
                'label': 'conjunction',
                'val': 'word.conjunction'
            },
            {
                'label': 'interjection',
                'val': 'word.interjection'
            },
            {
                'label': 'noun',
                'val': 'word.noun'
            },
            {
                'label': 'preposition',
                'val': 'word.preposition'
            },
            {
                'label': 'sample',
                'val': 'word.sample'
            },
            {
                'label': 'verb',
                'val': 'word.verb'
            },
            {
                'label': 'words',
                'val': 'word.words'
            }
        ]
    }
]

const textOptions = stringOptions

export const generate = (lang, val) => {
    const f = {
        '': faker,
        'ZH_CN': fakerZH_CN
    }[lang]
    const parts = val.split('.')
    let v = f[parts[0]][parts[1]]()

    if (typeof v === 'bigint') {
        v = v.toString()
    } else if (typeof v === 'object') {
        if (v instanceof Date) {
            v = v.toJSON()
        } else {
            v = Object.values(v).join(', ')
        }
    }

    return v
}

export const options = {
    integerOptions,
    bigIntOptions,
    floatOptions,
    doubleOptions,
    decimalOptions,
    booleanOptions,
    dateOptions,
    dateOnlyOptions,
    uuidOptions,
    stringOptions,
    textOptions,
    generate
}

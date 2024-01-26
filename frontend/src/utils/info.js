export const info = {
    rule: {
        filter: "The filter function enables you to determine whether the proxy rule should be applied. This function takes the request object as input and returns a boolean value.<br>Example:<br>return true;<br>return req.method === 'GET'.<br>return req.originalUrl.startsWith('/api/')<br>return req.headers['accept'].includes('application/json')",
        path: "The path function determines the proxy request path. It accepts the request object as input and returns a string value. There is no need to include the host name in the returned string.<br>Example:<br>return req.originalUrl<br>return '/api/moduleName/funcName'<br>return req.originalUrl.replace(/^/app//, '/')",
        req: "The request function determines the proxy request (except the path). It accepts the request object as input and returns the modified proxy request. Generally, you can modify the headers.<br>Example:<br>req.headers['app'] = 'my first app'<br>return req",
        reqBody:
            "The request body function determines the content of the proxy request body. It takes the original request body as input and returns the corresponding proxy request body. Please note that if \"Parse request body\" is set to true, the \"body\" parameter will be of the Node Buffer type; otherwise, it will always be null.<br>Example:<br> let b = body.toString('utf-8')<br>try {<br>&nbsp;&nbsp;b = JSON.parse(b)<br>} catch {<br>&nbsp;&nbsp;return body<br>}<br>b['app'] = 'myapp'<br>return Buffer.from(JSON.stringify(b), 'utf-8')",
        resHeader:
            "The response header function allows you to modify the proxy response header. It accepts the response header object as input and returns the modified object. You can simply add or remove headers.<br>Example:<br>headers['app'] = 'myapp'<br>return headers",
        resBody:
            "The response body function determines the content of the proxy response body. It takes the original response body as input and returns the final response body. Please note that the \"body\" parameter is of the Node Buffer type.<br>Example:<br> let b = body.toString('utf-8')<br>try {<br>&nbsp;&nbsp;b = JSON.parse(b)<br>} catch {<br>&nbsp;&nbsp;return body<br>}<br>b['app'] = 'myapp'<br>return Buffer.from(JSON.stringify(b), 'utf-8')"
    },
    stat: {
        filter: `To analyze only the data that interests you, specify the filter here. The filter object is a JSON5 string, which is a superset of JSON and expands the syntax. You can utilize built-in operators like "$eq", "$gte", "$between", and logic operators "$and", "$or", "$not". Here is an example.<br>$and: [{ prop1: 5 }, { prop2: 'hello' }],<br>$or: [{ prop1: 5 }, { prop2: 'hello' }].<br>For some property, you can specify the object property by using the operators:<br> $eq: 3, $ne: 20,<br>$is: null, $not: true,<br>$or: [5, 6],<br>$gt: 6, $gte: 6, $lt: 10, $lte: 10,<br>$between: [6, 10], $notBetween: [11, 15],<br>$in: [1, 2], $notIn: [1, 2],<br>$like: '%hat', $notLike: '%hat',<br>$startsWith: 'hat', $endsWith: 'hat', $substring: 'hat',<br>$iLike: '%hat', $notILike: '%hat',<br>$regexp: '^[h|a|t]', $notRegexp: '^[h|a|t]',<br>$iRegexp: '^[h|a|t]', $notIRegexp: '^[h|a|t]'<br>You can use the following properties to filter the results:<br>"id", "url", "method", "status", "transaction", "duration", "reqLength", "resLength", "ruleName", "ruleId", "createdAt", "updatedAt"`
    },
    property: {
        validate: `To validate the property during creation or update, specify a JSON5 object here, which is a superset of JSON and expands the syntax. Here are examples:<br>is: ["^[a-z]+$",'i'],<br>not: ["^[a-z]+$",'i'],<br>isEmail: true,<br>isUrl: true,<br>isIP: true,<br>isIPv4: true,<br>isIPv6: true,<br>isAlpha: true,<br>isAlphanumeric: true,<br>isNumeric: true,<br>isInt: true,<br>isFloat: true,<br>isDecimal: true,<br>isLowercase: true,<br>isUppercase: true,<br>notNull: true,<br>isNull: true,<br>notEmpty: true,<br>equals: 'specific value',<br>contains: 'foo',<br>notIn: [['foo', 'bar']],<br>isIn: [['foo', 'bar']],<br>notContains: 'bar',<br>len: [2,10],<br>isUUID: 4,<br>isDate: true,<br>isAfter: "2011-11-05",<br>isBefore: "2011-11-05",<br>max: 23,<br>min: 23,<br>isCreditCard: true,`
    },
    project: {
        branch: 'The branch to deploy to. If not specified, the default branch will be used.',
        type: 'For the project type "static", CI/CD treats it as static web pages and deploys it as a static web server. For the project type "node server", CI/CD considers it as a Node.js server and runs "npm install" after initialization or synchronization.',
        repo: 'To enable automatic deployment using the git push hook of git servers, such as GitHub, please provide the request URL "https://[your-server]:[port]/api/cicd/hook". This will ensure that any submitted code triggers the necessary actions for deployment.'
    },
    job: {
        script: `You can easily create your job by writing JavaScript code in the "run" function. The "utils" parameter contains properties that make your script easier to work with. "require" is equivalent to Node.js require and is used to include third-party tools. "join" is used to combine file paths. "folder" is a string path where the "runtime/jobs/{name}" is located, which is a recommended location to save your file. "download" is a function that can be used with the syntax "async download(url, path)". "v4" is a function used to generate a v4 UUID, and you can simply call it as "v4()". The returned value or any errors thrown during the function call will be logged.<br>
        Here is an example:<br>
        <pre><code>const url = 'https://api.waifu.pics/sfw/waifu'
const json = await (await fetch(url)).json()
const { download, join, v4, folder } = utils
await download(json.url,
    join(folder, v4() + '.jpg'))
return {
    component: 'img',
    src: json.url
}</code></pre>`
    },
    demo: {
        intro: `You are currently in the demo mode of the Neko Proxy App. This is a static hosted web page designed to provide you with an opportunity to explore and test the app's features and configuration options. It is important to note that none of your actions or operations will be recorded. Additionally, please be aware that any changes or modifications you make will be lost upon refreshing the browser.`
    }
}

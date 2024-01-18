const pm2 = require('pm2')

pm2.start(
    {
        name: 'neko-proxy-app',
        script: 'main.js',
        args: '',
        cwd: '.',
        log_file: 'runtime/repologs/neko-proxy-app.log'
    },
    (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('started successfully.')
        process.exit(0)
    }
)

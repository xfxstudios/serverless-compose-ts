var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')
var os = require('os')

// This is stolen from some website
// Modified by Zee to work for our purposes

// get library path
const main = resolve(__dirname, './')
const services = resolve(__dirname, './backend')
const layers = resolve(__dirname, './layers')
const infra = resolve(__dirname, './infra')

installDeps(main)
installDeps(infra)
installDepsRecursively(services)
installDeps(layers)
installDepsRecursively(layers)

function installDepsRecursively(path) {
    if (!fs.existsSync(path))
    {
        console.log("Path does not exists " + path)
        return
    }

    fs.readdirSync(path)
        .forEach(function (module) {
            const modulePath = join(path, module)
            installDeps(modulePath)
        })
}

function installDeps(path) {
    // ensure path has package.json
    if (!fs.existsSync(join(path, 'package.json'))) return
    
    // npm binary based on OS
    const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'

    // install folder

    console.log("------- Auditing and fixing dependencies for " + path)
    cp.spawn(npmCmd, ['-force'], { env: process.env, argv0: 'audit fix' })

    console.log("------- Installing dependencies for " + path)
    cp.spawn(npmCmd, ['i'], { env: process.env, cwd: path, stdio: 'inherit' })
}

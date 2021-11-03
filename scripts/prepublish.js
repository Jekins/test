const fs = require('fs')
const path = require('path')

const packagesDir = path.resolve(__dirname, '../packages')

const preparePackageJSON = (packageName) => {
    const packageJSONPath = path.resolve(packagesDir, packageName, 'package.json')
    const source = fs.readFileSync(packageJSONPath).toString('utf-8');
    const packageJSON = JSON.parse(source);

    if (packageJSON) {
        const packageJSONPublishPath = path.resolve(packagesDir, packageName, packageJSON.publishConfig.directory, 'package.json')

        packageJSON.scripts = {};
        packageJSON.main = 'lib/utils.js';
        packageJSON.files = ['lib'];

        delete packageJSON.publishConfig;
        delete packageJSON.devDependencies;


        fs.writeFileSync(packageJSONPublishPath, Buffer.from(JSON.stringify(packageJSON, null, 2), 'utf-8') );
    }

}

fs.readdir(packagesDir, (err, packagesNames) => {
    if (err) console.log(err);

    packagesNames.forEach(preparePackageJSON)
})
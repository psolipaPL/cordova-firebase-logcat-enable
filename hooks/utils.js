const fs = require('fs'),
    xml2js = require('xml2js');
    
//Initial configs
const configs = {
    androidMainPath: "/platforms/android/app/src/main/",
    androidManifest: "AndroidManifest.xml",
};

function getConfigs() {
    return configs;
}

function readFile(filePath) {
    return fs.readFileSync(filePath, "utf-8");
}

function performanceLogcatAdd(androidManifestPath) {
    const parseString = xml2js.parseString;
    const builder = new xml2js.Builder();
    const filePath = androidManifestPath;
    const androidManifest = fs.readFileSync(filePath).toString();
    let manifestRoot;

    if (androidManifest) {
        parseString(androidManifest, (err, manifest) => {
            if (err) return console.error(err);

            manifestRoot = manifest['manifest'];

            if (!manifestRoot['application'][0]['meta-data']) {
                manifestRoot['application'][0]['meta-data'] = [];
            }


            manifestRoot['application'][0]['meta-data'].push({ '$': { 'android:name': 'firebase_performance_logcat_enabled', 'android:value': 'true' } });
            fs.writeFileSync(androidManifestPath, builder.buildObject(manifest));
        }
        )
    }
}

module.exports = {
    getConfigs,
    readFile,
    performanceLogcatAdd
}
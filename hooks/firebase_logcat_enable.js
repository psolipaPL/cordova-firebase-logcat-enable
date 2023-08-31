const utils = require("./utils");

module.exports = function (context) {
    const confs = utils.getConfigs();

    //Firebase Performance Logcat Addition
    utils.performanceLogcatAdd(context.opts.projectRoot + confs.androidMainPath + confs.androidManifest);
}
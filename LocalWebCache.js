const path = require("path");
const fs = require("fs");
const WebCache = require("./webcache");
const VersionResolveError = require("./versionResolveError");

class LocalWebCache extends WebCache {
    constructor(options = {}) {
        super();
        this.path = options.path || '.wwebjs_cache/';
        this.strict = options.strict || false;
    }

    async resolve(version) {
        const filePath = path.join(this.path, `${version}.html`);

        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (err) {
            if (this.strict) throw new VersionResolveError("Couldn't load version from local cache.");
            return null;
        }
    }

    async persist(indexHtml) {
        const match = indexHtml.match(/manifest-([\d.]+)\.json/);
        if (!match) return;

        const version = match[1];
        const filePath = path.join(this.path, `${version}.html`);
        fs.mkdirSync(this.path, { recursive: true });
        fs.writeFileSync(filePath, indexHtml);
    }
}

module.exports = LocalWebCache;

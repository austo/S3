import config from '../../Config';

const backend = {
    put: function putK(request, size, keyContext, reqUids, callback, k,
        path) {
        // console.log(util.inspect(config, {showHidden: false, depth: null}));
        const value = [];
        const testKinetic = config.kinetic.instance;
        request.on('data', data => {
            value.push(data);
        }).on('end', err => {
            if (err) {
                return callback(err);
            }
            testKinetic.put(Number(path), value, {}, callback);
            return undefined;
        });
    },

    get: function getK(key, range, reqUids, callback, path) {
        const testKinetic = config.kinetic.instance;
        return testKinetic.get(Number(path), Buffer.from(key), range, callback);
    },

    delete: function delK(keyValue, reqUids, callback, path) {
        const testKinetic = config.kinetic.instance;
        const key = Buffer.from(keyValue);
        return testKinetic.delete(Number(path), key, {}, callback);
    },
};

export default backend;

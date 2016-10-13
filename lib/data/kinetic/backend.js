import config from '../../Config';

const backend = {
    put: function putK(request, size, keyContext, reqUids, callback) {
        const value = [];
        const kinetic = config.kinetic.instance;
        request.on('data', data => {
            value.push(data);
        }).on('end', err => {
            if (err) {
                return callback(err);
            }
            kinetic.put(0, value, {}, callback);
            return undefined;
        });
    },

    get: function getK(key, range, reqUids, callback) {
        const kinetic = config.kinetic.instance;
        return kinetic.get(0, Buffer.from(key), range, callback);
    },

    delete: function delK(keyValue, reqUids, callback) {
        const kinetic = config.kinetic.instance;
        const key = Buffer.from(keyValue);
        return kinetic.delete(0, key, {}, callback);
    },
};

export default backend;

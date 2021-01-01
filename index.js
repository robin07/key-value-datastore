const l = {};

var create = (key, value, timelive) => {
    if (key in l) {
        console.log("Error,key already exists");
    }
    else {
        if (typeof key === 'string') {
            if (Object.keys(l).length < 1024 * 1024 * 1024 && value <= (16 * 1024 * 1024)) {
                const arr = [];
                if (timelive == 0) {
                    arr[0] = value;
                    arr[1] = timelive;
                } else {
                    arr[0] = value;
                    arr[1] = new Date().getDate() + timelive;
                }
                if (key.length <= 32) {
                    l[key] = arr;
                }
            } else {
                console.log('memory exceeded')
            }
        } else {
            console.log('Invalid key name');
        }
    }
}
var read = (key) => {
    if (!(key in l)) {
        console.log('error key not exist');
    } else {
        var b = [l[key]];
        if (b[1] != 0) {
            if (new Date().getDate() < b[1]) {
                var stra = String(key) + ":" + String(b[0]);
                return stra;
            } else {
                console.log("time to live expired");
            }
        } else {
            var stra = String(key) + ":" + String(b[0]);
            return stra;
        }
    }
}

const del = (key) => {
    if (!(key in l)) {
        console.log('error key not exist');
    } else {
        var b = [l[key]];
        if (b[1] != 0) {
            if (new Date().getDate() < b[1]) {
                delete l[key];
                console.log('key is deleted')
            } else {
                console.log("time to live expired");
            }
        } else {
            delete l[key];
            console.log('key is deleted')
        }
    }
}

module.exports ={
    create,
    read,
    del
}
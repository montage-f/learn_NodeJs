/**
 * Created by montage_fz on 2019-06-28
 */

class baseInfo {
    constructor(data, message) {
        const isString = typeof data === 'string';
        if (isString) {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
    
}

class SuccessInfo extends baseInfo {
    constructor(data, message) {
        super(data, message);
        this.status = 200;
    }
}

class ErrorInfo extends baseInfo {
    constructor(data, message, status) {
        super(data, message);
        this.status = status || 400;
    }
}

module.exports = {
    SuccessInfo,
    ErrorInfo
};

/**
 * Created by montage_fz on 2019-07-08
 */
class BaseInfo {
    msg: string;
    data: object;

    constructor(data: any, msg?: string) {
        if (typeof data === 'string') {
            this.msg = data;
            data = null;
            msg = null;
        }
        if (data) {
            this.data = data;
        }
        if (msg) {
            this.msg = msg;
        }
    }
}

class SuccessInfo extends BaseInfo {
    status: number;

    constructor(data: any, msg?: string, status?: number) {
        super(data, msg);
        this.status = status || 200;
    }
}

class ErrorInfo extends BaseInfo {
    status: number;

    constructor(data: any, msg?: string, status?: number) {
        super(data, msg);
        this.status = status || 400;
    }
}

export {
    SuccessInfo,
    ErrorInfo
};

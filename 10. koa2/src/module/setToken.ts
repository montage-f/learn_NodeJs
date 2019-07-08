/**
 * Created by montage_fz on 2019-07-08
 */
import * as jwt from 'jsonwebtoken';

interface IUserInfo {
    username: string

}

// 密匙
const key: string = 'token';

export const addToken = (userInfo: IUserInfo) => {
    const {username} = userInfo;
    const token = jwt.sign({
            username,
        },
        key,
        // 10分钟后过期
        {expiresIn: 10 * 60}
    );
    return token;
};

export const decodeToken = (token: string): any => {
    return jwt.decode(token);
};

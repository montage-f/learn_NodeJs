/**
 * Created by montage_fz on 2019-06-28
 */
export default function (formName) {
    return new Promise(resolve => {
        this.$refs[formName].validate((valid) => {
            resolve(valid);
        });
    });
}

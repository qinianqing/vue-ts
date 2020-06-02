/**
 *
 *  读取.env配置的环境信息，
 *  比如配置的Key为： VUE_APP_API_URL,则转换到config对象上的key为：apiUrl ；
 *  注意：所有apiUrl地址的配置都需要以apiurl结尾，比如：homeApiUrl，然后在api的option里面配置 apiType为home，
 *       则该接口的请求将以home的api地址发送。
 *
 *  @author qinianqing@jiagouyun.com
 */
const getConfig = (): any => {
    const ConfigObj: any = {};
    const processEnv = process.env;
    for (const envKey in processEnv) {
        if (envKey.toLowerCase().startsWith('vue_app')) {
            let key: string = '';
            const keys: any = envKey.substr('vue_app_'.length).split('_');
            keys &&
                keys.forEach((str: string, index: number) => {
                    key += index === 0 ? str.toLowerCase() : str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
                });
            ConfigObj[key] = processEnv[envKey];
        }
    }
    return ConfigObj;
};
export const Config = getConfig();


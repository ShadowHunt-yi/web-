export function ajax(options) {
    // 默认配置
    var defaults = {
        //请求的方法
        method: 'GET',
        //请求的地址
        url: '',
        //发送的数据
        data: null,
        //是否异步
        async: true,
        //是否缓存
        cache: true,
        //请求头的 Content-Type
        contentType: 'application/x-www-form-urlencoded',
        //请求头的其他属性
        headers: {},
        //超时时间，单位为毫秒
        timeout: 0,
        //是否跨域请求时发送凭据
        withCredentials: true,
        //响应类型
        responseType: '',
        //发送请求前的回调函数
        beforeSend: null,
        //请求成功时的回调函数
        success: null,
        //请求失败时的回调函数
        error: null,
        //请求完成时的回调函数
        complete: null

    };

    // 合并配置
    var settings = Object.assign({}, defaults, options);

    // 创建 XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();

    // 请求方法和地址
    xhr.open(settings.method, settings.url, settings.async);

    // 设置请求头
    if (settings.contentType) {
        xhr.setRequestHeader('Content-Type', settings.contentType);
    }
    Object.keys(settings.headers).forEach(function(key) {
        xhr.setRequestHeader(key, settings.headers[key]);
    });

    // 跨域请求
    if (settings.withCredentials) {
        xhr.withCredentials = true;
    }

    // 设置响应类型
    if (settings.responseType) {
        xhr.responseType = settings.responseType;
    }

    // 超时
    if (settings.timeout) {
        xhr.timeout = settings.timeout;
    }

    // 发送请求前的回调函数
    if (typeof settings.beforeSend === 'function') {
        settings.beforeSend(xhr);
    }

    // 监听状态变化
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 请求成功的回调函数
                if (typeof settings.success === 'function') {
                    var response = xhr.responseType === 'text' ? xhr.responseText : xhr.response;
                    settings.success(response, xhr);
                }
            } else {
                // 请求失败的回调函数
                if (typeof settings.error === 'function') {
                    settings.error(xhr.statusText, xhr);
                }
            }

            // 请求完成的回调函数
            if (typeof settings.complete === 'function') {
                settings.complete(xhr);
            }
        }
    };

    // 发送请求
    var data = null;
    if (settings.data) {
        if (settings.contentType === 'application/json') {
            data = JSON.stringify(settings.data);
        } else {
            data = new FormData();
            Object.keys(settings.data).forEach(function(key) {
                data.append(key, settings.data[key]);
            });
        }
    }
    xhr.send(data);
}
export const baseUrl = 'https://api.apiopen.top'
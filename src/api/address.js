import request from '@/utils/request'


export function page(data) {
    return request({
        url:'address/page',
        method:'post',
        data
    })
}

export function delete1(data) {
    return request({
        url:'address/delete',
        method:'post',
        data
    })
}

export function update(data) {
    return request({
        url:'address/update',
        method:'post',
        data
    })
}

export function insert(data) {
    return request({
        url:'address/insert',
        method:'post',
        data
    })
}


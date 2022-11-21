import request from '@/utils/request'


export function page(data) {
    return request({
        url:'repo/page',
        method:'post',
        data
    })
}

export function delete2(data) {
    return request({
        url:'repo/delete',
        method:'post',
        data
    })
}

export function update(data) {
    return request({
        url:'repo/update',
        method:'post',
        data
    })
}

export function add(data) {
    return request({
        url:'repo/add',
        method:'post',
        data
    })
}




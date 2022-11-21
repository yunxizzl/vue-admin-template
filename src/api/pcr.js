import request from '@/utils/request'
export function cascader() {
    return request({
        url:'address/pcr',
        method:'post'
        
    })
    
}
exports.response = (status_code,data)=>{
    if(status_code>199 && status_code <300){
        return success_response(status_code,data);
    }
    return failed_response(status_code,data);
}

const failed_response = (status_code,error)=>{
    if(typeof error === 'string'){
        return  {
            status_code,
            error:error
        }
    }
    return  {
        status_code,
        ...error
    }
}
const success_response = (status_code,data)=>{
    return  {
        status_code,
        result:data
    }
}
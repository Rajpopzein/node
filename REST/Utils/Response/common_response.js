const commonResponse = ({message, status, statuscode, data}) =>{
    if(data){
        return(
            {
                "status" : status,
                "statuscode":statuscode,
                "message":message,
                "data":data
            }
        )
    }
    return(
        {
            "status" : status,
            "statuscode":statuscode,
            "message":message
        }
    )
}


export {
    commonResponse
}
module.exports.sucessResponse = (status , error , msg, result  )=>{
    return {status , error  , msg , result }
}
module.exports.errorResponse = (status = 500 , error , msg)=>{
        return{status , error , msg}
}
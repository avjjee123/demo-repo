class expressError extends Error{
    constructor(statusCOde,message){
        super();
        this.statusCode=statusCode; 
        this.message=message; 
    }
}

module.exports=expressError; 
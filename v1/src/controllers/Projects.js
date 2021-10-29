const {insert} = require("../services/Projects");
const httpStatus = require("http-status");

const create = (req,res) => {
    insert({name:"Test Project"})
    .then(response=>{
        res.status(httpStatus.CREATED).send(response);
    })
    .catch((e)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })
}
const index = (req,res) => {
    list().then((response)=>{
        res.status(httpStatus.OK).send(response);
    }).catch(e=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

module.exports = {
    create,
    index
}
const {insert,modify,list,remove} = require("../services/Tasks");
const httpStatus = require("http-status");

const index = (req,res) => {
    if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({error: "Proje Bilgisi Eksik.."})
    list({project_id: req.params.projectId})
        .then(response=>{
            res.status(httpStatus.OK).send(response);
        }).catch(e=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const create = (req,res) => {
    req.body.user_id = req.user;
    insert(req.body)
    .then(response=>{
        res.status(httpStatus.CREATED).send(response);
    })
    .catch((e)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })
}

const update = (req,res) => {
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "ID Bilgisi Eksik."
        })
    }
    modify(req.body,req.params?.id)
        .then((updatedDoc)=>{
        res.status(httpStatus.OK).send(updatedDoc)
    })
    .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
}

const deleteTask = (req,res) =>{
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
             message: "ID Bilgisi Eksik."
        })
    }
    remove(req.params?.id)
        .then((deletedDoc)=>{
            if(!deletedDoc){
                return res.status(httpStatus.NOT_FOUND).send({
                    message:"Böyle bir kayıt bulunmamaktadır."
                })
            }
            res.status(httpStatus.OK).send({
                message:"Task silinmiştir."
            }
         )
    })
    .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Silme işlemi sırasında bir problem oluştu."}))
}

const makeComment = (req,res) => {
    req.body.user_id = req.user;
    req.body.commented_at = new Date();
    modify(req.body,req.params?.id)
        .then((updatedDoc)=>{
        res.status(httpStatus.OK).send(updatedDoc)
    })
    .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
}

module.exports = {
    index,
    create,
    update,
    deleteTask,
    makeComment
}
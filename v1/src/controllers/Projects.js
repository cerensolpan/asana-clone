const {insert,modify,list,remove} = require("../services/Projects_");
const httpStatus = require("http-status");
const Service = require("../services/Projects")
const projectService = new Service();

const index = (req,res) => {
    //    const projects= list().then(x => {return x});
    //    console.log(projects);
    projectService
        .list()
        .then(response=>{
            res.status(httpStatus.OK).send(response);
        }).catch(e=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
        // res.status(httpStatus.OK).send('ok');
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
        .then((updatedProject)=>{
        res.status(httpStatus.OK).send(updatedProject)
    })
    .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
}

const deleteProject = (req,res) =>{
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
             message: "ID Bilgisi Eksik."
        })
    }
    remove(req.params?.id)
        .then((deletedProject)=>{
            if(!deletedProject){
                return res.status(httpStatus.NOT_FOUND).send({
                    message:"Böyle bir kayıt bulunmamaktadır."
                })
            }
            res.status(httpStatus.OK).send({
                message:"Proje silinmiştir."
            }
         )
    })
    .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Silme işlemi sırasında bir problem oluştu."}))
}

module.exports = {
    index,
    create,
    update,
    deleteProject
}
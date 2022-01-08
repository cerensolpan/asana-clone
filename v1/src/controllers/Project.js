const httpStatus = require("http-status");
const ProjectService = require("../services/ProjectService");
const ApiError = require("../errors/ApiError");
class Project {

    index(req,res) {
        //    const projects= list().then(x => {return x});
        //    console.log(projects);
        ProjectService.list()
            .then(response=>{
                res.status(httpStatus.OK).send(response);
            }).catch(e=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
            // res.status(httpStatus.OK).send('ok');
    }

    create(req,res) {
        req.body.user_id = req.user;
        ProjectService.create(req.body)
        .then(response=>{
            res.status(httpStatus.CREATED).send(response);
        })
        .catch((e)=>{
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
    }

    update(req,res,next) {
        if(!req.params?.id){
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "ID Bilgisi Eksik."
            })
        }
        ProjectService.update(req.params?.id,req.body)
            .then((updatedProject)=>{
                if(!updatedProject) return next(new ApiError("Böyle bir kayıt bulunmamaktadır",404));
                res.status(httpStatus.OK).send(updatedProject)
            })
            .catch((e)=> next(new ApiError(e?.message)));
    }

    deleteProject(req,res) {
        if(!req.params?.id){
            return res.status(httpStatus.BAD_REQUEST).send({ 
                message: "ID Bilgisi Eksik."
            })
        }
        ProjectService.delete(req.params?.id)
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

}

module.exports = new Project();
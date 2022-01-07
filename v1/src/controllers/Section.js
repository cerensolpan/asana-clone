const httpStatus = require("http-status");
const SectionService = require("../services/SectionService");

class Section {
    index(req,res) {
        if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({error: "Proje Bilgisi Eksik.."})
        SectionService.list({project_id: req.params.projectId})
            .then(response=>{
                res.status(httpStatus.OK).send(response);
            }).catch(e=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
    }
    
    create(req,res) {
        req.body.user_id = req.user;
        SectionService.create(req.body)
        .then(response=>{
            res.status(httpStatus.CREATED).send(response);
        })
        .catch((e)=>{
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
    }
    
    update(req,res) {
        if(!req.params?.id){
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "ID Bilgisi Eksik."
            })
        }
        SectionService.update(req.params?.id,req.body)
            .then((updatedDoc)=>{
            res.status(httpStatus.OK).send(updatedDoc)
        })
        .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
    }
    
    deleteSection(req,res) {
        if(!req.params?.id){
            return res.status(httpStatus.BAD_REQUEST).send({
                 message: "ID Bilgisi Eksik."
            })
        }
        SectionService.delete(req.params?.id)
            .then((deletedDoc)=>{
                if(!deletedDoc){
                    return res.status(httpStatus.NOT_FOUND).send({
                        message:"Böyle bir kayıt bulunmamaktadır."
                    })
                }
                res.status(httpStatus.OK).send({
                    message:"Section silinmiştir."
                }
             )
        })
        .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Silme işlemi sırasında bir problem oluştu."}))
    }
}

module.exports = new Section();

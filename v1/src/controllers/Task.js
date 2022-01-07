const httpStatus = require("http-status");
const TaskService = require("../services/TaskService");

class Task {
    index(req,res) {
        if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({error: "Proje Bilgisi Eksik.."})
        TaskService.list({project_id: req.params.projectId})
            .then(response=>{
                res.status(httpStatus.OK).send(response);
            }).catch(e=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
    }
    
    create(req,res) {
        req.body.user_id = req.user;
        TaskService.create(req.body)
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
        TaskService.update(req.params?.id,req.body)
            .then((updatedDoc)=>{
            res.status(httpStatus.OK).send(updatedDoc)
        })
        .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
    }
    
    deleteTask(req,res) {
        if(!req.params?.id){
            return res.status(httpStatus.BAD_REQUEST).send({
                 message: "ID Bilgisi Eksik."
            })
        }
        TaskService.delete(req.params?.id)
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
    
    makeComment(req,res) {
        TaskService.findOne({_id: req.params.id}).then(mainTask=>{
            if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır."})
            const comment = {
                ...req.body,
                commented_at: new Date(),
                user_id: req.user,
            };
            mainTask.comments.push(comment);
            mainTask
                .save()
                .then(updatedDoc => {
                    res.status(httpStatus.OK).send(updatedDoc)
                })
                .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
        })
        .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
    }
    
    deleteComment(req,res) {
        TaskService.findOne({ _id: req.params.id}).then(mainTask=>{
            if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır."})
            mainTask.comments = mainTask.comments.filter((c)=> c._id?.toString() !== req.params.commentId)
            mainTask
                .save()
                .then(updatedDoc => {
                    res.status(httpStatus.OK).send(updatedDoc)
                })
                .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
        })
        .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
    }
    
    addSubTask(req,res) {
        //Get MainTask
        if(!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({message: "ID bilgisi gerekli."})
        TaskService.findOne({ _id: req.params.id}).then(mainTask=>{
            if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır."})
            //Create subtask
            TaskService.create({...req.body, user_id:req.user})
            .then(subTask=>{
                //Subtask controlled on MainTask and update
                mainTask.sub_tasks.push(subTask)
                mainTask
                .save()
                .then(updatedDoc => {
                    //Send User
                    res.status(httpStatus.OK).send(updatedDoc)
                })
                .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
            })
            .catch((e)=>{
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
            })
        })
        .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
    }
    
    fetchTask(req,res) {
        if(!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({message: "ID bilgisi gerekli."})
        TaskService.findOne({ _id: req.params.id},true).then(task=>{
            if(!task) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kayıt bulunmamaktadır."})
            res.status(httpStatus.OK).send(task)
        })
        .catch((e)=> res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Kayıt sırasında bir problem oluştu."}))
    }
}

module.exports = new Task();


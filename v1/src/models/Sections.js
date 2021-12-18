const Mongoose = require("mongoose");
const logger = require("../scripts/logger/Sections")

const SectionSchema = new Mongoose.Schema({
    name:String,
    user_id:{
        type: Mongoose.Types.ObjectId,
        ref: "user"
    },
    project_id:{
        type: Mongoose.Types.ObjectId,
        ref:"project",
    },
    order: Number,
},
{timestamps: true, versionKey: false}
);

// ProjectSchema.pre("save",(next,doc)=>{
//     console.log("Öncesi", doc);
//     next();
// })
SectionSchema.post("save",(doc)=>{
    // console.log("Sonrası", doc);
    // ...Kayıt Edilmiştir... Loglama ..
    logger.log({
        level:"info",
        message:doc,
    })
})

module.exports = Mongoose.model("section", SectionSchema)
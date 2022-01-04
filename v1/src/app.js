const express = require("express");
const fileUpload = require("express-fileupload")
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events")
const {ProjectRoutes, UserRoutes, SectionRoutes, TaskRoutes} = require("./api-routes");
const path = require("path");

config();
loaders();
events();

const app = express();
app.use("/uploads", express.static(path.join(__dirname,"./","uploads")));
app.use(express.json());
app.use(fileUpload())
app.use(helmet());

app.listen(process.env.APP_PORT, ()=>{
    console.log("Start..");
    app.use("/projects",ProjectRoutes)
    app.use("/users",UserRoutes)
    app.use("/sections",SectionRoutes)
    app.use("/tasks",TaskRoutes)

    // const baseService = new BaseService("DEneme");
    // baseService.getService();
})
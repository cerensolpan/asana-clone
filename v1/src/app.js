const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const {ProjectRoutes} = require("./api-routes");

config();

const app = express();
app.use(express.json())
app.use(helmet());

app.listen(process.env.APP_PORT, ()=>{
    console.log("Start..");
    app.use("/projects",ProjectRoutes)
})
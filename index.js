const Application = require("./app/server");
const DB_URL = "mongodb://0.0.0.0:27017/project-managment"
new Application(3000, DB_URL ) 
const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        title: "Products API",
        description: "Products API"
    },
    host: "localhost:3080",
    schemes: ["https"]
}

const outputFile = "./swagger.json"
const endpointsFiles = ["./routes/index.js"]

swaggerAutogen(outputFile, endpointsFiles, doc)
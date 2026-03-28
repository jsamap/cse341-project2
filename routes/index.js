const router = require("express").Router()

router.get("/", (req, res) => {
    //#swagger.tags=["INDEX"]
    res.send("PROOJECT 2 INDEX")
})

router.use("/categories", require("./categories"))

router.use("/products", require("./products"))

module.exports = router
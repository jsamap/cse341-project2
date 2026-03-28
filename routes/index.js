const router = require("express").Router()

router.use("/", require("./swagger"))

router.get("/", (req, res) => {
    //#swagger.tags=["Index"]
    res.send("PROOJECT 2 INDEX")
})

router.use("/categories", require("./categories"))

router.use("/products", require("./products"))

module.exports = router
const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));

// router.get("/", (req, res) => {
//     //#swagger.tags=["Index"]
//     res.send("PROOJECT 2 INDEX");
// });

router.use("/categories", require("./categories"));

router.use("/products", require("./products"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;

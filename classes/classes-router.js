const router = require("express").Router();

const Classes = require("./classes-model");
const authenticate = require('../auth/authenticate-middleware');


router.get("/", (req, res) => {
  Classes.find()
      .then((classes) => {
        res.status(200).json(classes);
      })
      .catch((err) => {
          res.status(400).json({message: err})
      });
  });

  router.post("/", authenticate, (req, res) => {
    Classes.add(req.body)
        .then(classes => {
            res.status(201).json(classes);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});


router.delete("/:id", authenticate, (req, res) => {
    const { id } = req.params;
    Classes.remove(id)
    .then((classes) => {
        if (!classes) {
          res.status(404).json({
            message: "The user with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(classes);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        res.status(500).json({ errorMessage: "The user could not be removed" });
      });
  });

  router.put("/:id", authenticate, (req, res) => {
    Classes.update(req.params.id, req.body)
      .then(classes => {
        if (classes) {
          res.status(200).json(classes);
        } else {
          res.status(404).json({ message: "There was an issue getting classes" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error updating the hub",
        });
      });
  });

module.exports = router;
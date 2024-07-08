var mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.c18jqog.mongodb.net/sample")
  .then(() => {
    console.log("Mongoose Connect");
  });

var Schema = mongoose.Schema;

var addmissionSchema = new Schema({
  name: String,
  addr: String,
  stream: String,
  year: Number
});

var Mymodel = mongoose.model("addmissions", addmissionSchema);

var express = require("express");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());

app.get("/addmission/all", async (req, res) => {
  try {
    var getLogin = await Mymodel.find();
    if (!getLogin) {
      return res.status(404).send("No Data Found");
    }
    res.send(getLogin);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/addmission/id/:id", async (req, res) => {
  try {
    var getbyId = await Mymodel.findById(req.params.id);
    if (!getbyId) {
      return res.status(404).send("Not Found");
    }
    res.send(getbyId);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/addmission/add", async (req, res) => {
  try {
    var addLogin = await Mymodel.create(req.body);
    if (!addLogin) {
      return res.status(400).send("Invalid Data");
    }
    res.status(201).send(addLogin);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/admission/update/:id", async (req, res) => {
  try {
    var update = await Mymodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!update) {
      return res.status(404).send("Invalis data");
    }
    res.status(200).send(update);
  } catch (error) {
    res.status(403).send("update failed...");
  }
});


app.listen(8000);

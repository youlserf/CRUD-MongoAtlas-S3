const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ImageRepository = require("../repository/imageRepository");
const imageRepository = new ImageRepository();
const Producto = require("../models/producto");

router.get("/", async (req, res) => {
  try {
    const arrayProductos = await Producto.find();
    res.render("productos", {
      arrayProductos,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/crear", (req, res) => {
  res.render("crear");
});

router.post("/", upload.single("avatar"), async (req, res) => {
  const body = req.body;
  body.cantidad = parseInt(body.cantidad);
  body.precio = parseInt(body.precio);
  const image = req.file.buffer;
  const type = req.file.mimetype;
  const imageURL = await imageRepository.uploadImage(body.nombre, image, type);
  body.image = imageURL;
  try {
    const productoDB = new Producto(body);
    await productoDB.save();
    res.redirect("/productos");
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const productoDB = await Producto.findOne({ _id: id });
    console.log(productoDB);
    res.render("detalle", {
      producto: productoDB,
      error: false,
    });
  } catch (error) {
    console.log("erroooooooooorrr", error);
    res.render("detalle", {
      error: true,
      mensaje: "No se encuentra el documento...",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id desde backend", id);
  try {
    const productoDB = await Producto.findByIdAndDelete({ _id: id });
    console.log(productoDB);

    // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
    // res.redirect('/productos')
    if (!productoDB) {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar",
      });
    } else {
      res.json({
        estado: true,
        mensaje: "eliminado!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  body.cantidad = parseInt(body.cantidad);
  body.precio = parseInt(body.precio);
  console.log(id);

  try {
    const productoDB = await Producto.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
    console.log(productoDB);
    res.json({
      estado: true,
      mensaje: "producto editada",
    });
  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: "producto falla",
    });
  }
});

module.exports = router;

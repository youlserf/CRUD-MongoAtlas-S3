const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  nombre: String,
  marca: String,
  descripcion: String,
  image: String,
  cantidad: Number,
  precio: Number,
});

// Crear el modelo
const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;

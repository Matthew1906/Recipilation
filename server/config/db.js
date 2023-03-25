import mongoose from "mongoose";

export default function (connectionString) {
  mongoose.connect(connectionString, { useNewUrlParser: true , useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
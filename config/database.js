const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
console.log(MONGO_URI)

// exports.connect = () => {
  // Connecting to the database
//   mongoose
//     .connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     //   useCreateIndex: true,
//     //   useFindAndModify: false,
//     })
//     .then(() => {
//       console.log("Successfully connected to database");
//     })
//     .catch((error) => {
//       console.log("database connection failed. exiting now...");
//       console.error(error);
//       process.exit(1);
//     });
mongoose
  .connect(
    `mongodb+srv://moni07:moni07@firstproject.jvubt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));
// };
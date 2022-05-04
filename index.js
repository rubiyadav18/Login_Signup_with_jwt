const mongoose = require("mongoose");
const express = require('express')
const app = express()
const bcrypt = require("bcrypt")
const User = require("./modle/user") 
const jwt = require("jsonwebtoken");
const JWTkey = 'rubi'
// const auth = require("./middleware/auth");



app.use(express.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.post("/register", async (req, res) => {
    
    try {
         const { first_name, last_name, email, password } = req.body;
         // Get user input
       
      // Validate user input
      if (!(first_name && last_name && password  && email)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email }); 
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      // const token = jwt.sign(
      //   { user_id: user._id, email },
      //   JWTkey,
      //   // process.env.TOKEN_KEY,
      //   {
      //     expiresIn: "2h",
      //   }
      // );
      // // save user token
      // user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });




  app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          // "hello",
          process.env.TOKEN_KEY,
          {
            expiresIn: "8h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  
  const auth = require("./middleware/auth");

  app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

mongoose
  .connect(
    `mongodb+srv://rubi:rubi@cluster0.264g2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// Import required modules
import express from "express";
import userRouter from "./routes/api.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
// Initialize Express app
const app = express();
dotenv.config();
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET"],
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/api", userRouter);
app.get('/dashboard',(req,res) => {
  if(req.session.username){
    return res.json({valid:true,username : req.session.username});
  }else{
    return res.json({valid:false});

  }
})
// app.use("/routes", userRouter);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { connectToMongoDB } from "../db.js";
import InsertMsgDB from "../models/insertMsgModel.js";
import Registration from "../models/registrationModel.js";
import session from "express-session";

// import multer from "multer";

// const upload = multer();

export const insertData = async (req, res) => {
  // console.log("🚀 ~ file: data.js:8 ~ insertData ~ req:", req)

  // try {
  const { name, email_id, username, password, profile } = req.body.data;
  console.log(
    "🚀 ~ file: data.js:12 ~ insertData ~ name, email_id, username, password, profile :",
    name,
    email_id,
    username,
    password,
    profile
  );

  await connectToMongoDB();

  try {
    const newUser = new Registration({
      name,
      email_id,
      username,
      password,
      profile,
    });

    // Save the new user to the database
    const result = await newUser.save();

    if (result) {
      res.status(201).json({ message: "Data saved successfully" });
    } else {
      throw new Error("Failed to insert data");
    }
    // } finally {
    //   await closeMongoDBConnection();
    // }
    // });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const LoginData = async (req, res) => {
  const { username, password } = req.body.data;
  console.log(
    "🚀 ~ file: data.js:12 ~ insertData ~ name, email_id, username, password, profile :",
    username,
    password
  );

  await connectToMongoDB();

  try {
    const user = await Registration.findOne({
      username,
      password,
    });
    if (user) {
      req.session.username = user.username;
      console.log("🚀 ~ file: data.js:70 ~ LoginData ~ req.session.username:", req.session.username)
      res.status(200).json({ message: "Login successfully" });
    } else {
      throw new Error("Failed to search data");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const insertMsg = async (req, res) => {
  // console.log("🚀 ~ file: data.js:8 ~ insertData ~ req:", req)

  // try {
  const { text, timestamp, sender, receiver } = req.body.data;
  console.log(
    "🚀 ~ file: data.js:12 ~ insertData ~ text, timestamp, sender, receiver :",
    text,
    timestamp,
    sender,
    receiver
  );

  await connectToMongoDB();

  try {
    const newText = new InsertMsgDB({
      text,
      timestamp,
      sender,
      receiver,
    });

    // Save the new user to the database
    const result = await newText.save();

    if (result) {
      res.status(201).json({ message: "Messsage saved successfully" });
    } else {
      throw new Error("Failed to insert data");
    }
    // } finally {
    //   await closeMongoDBConnection();
    // }
    // });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const FetchMsg = async (req, res) => {
  const  receiver  = req.body.data;
  console.log("🚀 ~ file: data.js:121 ~ FetchMsg ~ receiver:", req.body.data)


  await connectToMongoDB();

  try {
    // const messages = await InsertMsgDB.find({ receiver });
    const messages = await InsertMsgDB.find({
      $or: [
          { receiver: receiver },
          { sender: receiver }
      ]
  });
    console.log("🚀 ~ file: data.js:120 ~ FetchMsg ~ messages:", messages);

    if (messages) {
      res.status(200).json({ messages });
    } else {
      throw new Error("Failed to fetch messages");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getContacts = async (req, res) => {
  const user = req.body.data;
  console.log("🚀 ~ file: data.js:153 ~ getContacts ~ user:", req.body.name)


  try {
    await connectToMongoDB();

    // Assuming you have a model named 'InsertMsgDB' for your MongoDB collection
    const contacts = await InsertMsgDB.find({
      $or: [
        { receiver: user },
        { sender: user }
      ]
    });
//test
    console.log("Fetched contacts:", contacts);

    if (contacts) {
      res.status(200).json({ contacts });
    } else {
      throw new Error("Failed to fetch contacts");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const SubjectModel = require("./models/Subject");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const BoardModel = require("./models/Board");
const ListModel = require("./models/List");
const predefinedList = require("./seeders/list");
const { verify } = require("crypto");
const TaskModel = require("./models/Task");
const SubtaskModel = require("./models/Subtask");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());

const uri =
  "mongodb+srv://dtrejoher:JndqVhqyVTo6VFlz@projectcluster.74xo1an.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}
connect();

const createBoard = (title, subjects, userId) => {
  return BoardModel.create({ title, subjects, userId });
};

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  bcrypt
    .hash(password, 2)
    .then((hash) => {
      const userId = new mongoose.Types.ObjectId();
      UserModel.create({ username, email, password: hash, userId })
        .then((user) => {
          //create a board when a user signs up
          const subjects = [];
          const boardTitle = "Workspace";

          createBoard(boardTitle, subjects, userId)
            .then((board) => {
              res.json({ user, board });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username: username }).then((user) => {
    if (user) {
      //does the user exist??
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, username: user.username, userId: user.userId },
            "noms",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      });
    } else {
      res.json("User doesn't exist");
    }
  });
});

//used to ensure user's request has a valid token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "noms", (err, decoded) => {
      if (err) {
        return res.json("Token is wrong");
      } else {
        req.username = decoded.username;
        req.email = decoded.email;
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

//Get the user infomration
app.get("/getUser", verifyUser, (req, res) => {
  return res.json({
    username: req.username,
    email: req.email,
    userId: req.userId,
  });
});

app.get("/getBoard", verifyUser, (req, res) => {
  BoardModel.findOne({ userId: req.userId })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/createSubject", verifyUser, (req, res) => {
  const { subjectTitle } = req.body;
  const { userId } = req;

  BoardModel.findOne({ userId: userId })
    .then((defaultBoard) => {
      const boardId = defaultBoard._id;
      const list = [];

      //Add in the predefined list when we create a subject
      SubjectModel.create({ subjectTitle, list, boardId })
        .then((newSubject) => {
          const createList = predefinedList.map((predefinedItem) => {
            return ListModel.create({
              listTitle: predefinedItem.title,
              //task: predefinedItem.tasks,
              task: [],
              subjectId: newSubject._id,
            });
          });
          Promise.all(createList)
            .then((newList) => {
              newSubject.list = newList;
              return newSubject.save();
            })
            .then((updatedSubject) => {
              res.json(updatedSubject);
            });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//Get subjects, which is just getting the array in the board
app.get("/getSubject", verifyUser, (req, res) => {
  BoardModel.findOne({ userId: req.userId })
    .then((board) => {
        SubjectModel.find({boardId: board._id})
        .then(subjects => {
            res.json(subjects);
        })
    })
    .catch((err) => res.json(err));
});

//Get lists
app.get("/getLists/:subjectId", verifyUser, (req, res) => {
  const subjectId = req.params.subjectId;

  ListModel.find({ subjectId: subjectId })
    .then((lists) => {
      res.json(lists);
    })
    .catch((err) => console.log(err));
});

app.post("/updateList/:subjectId", verifyUser, (req, res) => {
  const subjectId = req.params.subjectId;
  const { listTitle } = req.body;
  const task = [];

  ListModel.create({ listTitle, task, subjectId })
    .then((newList) => {
      SubjectModel.findOne({ _id: subjectId })
        .then((subject) => {
          subject.list.push(newList);
          subject.save();
          res.json(newList);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.post("/createTask/:listId", verifyUser, (req, res) => {
  const listId = req.params.listId;
  const { taskTitle } = req.body;
  const subtask = [];

  TaskModel.create({
    title: taskTitle,
    subtask: subtask,
    listId: listId,
  })
    .then((newTask) => {
      ListModel.findOne({ _id: listId })
        .then((list) => {
          list.task.push(newTask);
          list
            .save()
            .then((updatedList) => {
              res.json(updatedList);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
//Update the task description and update the list with the new task
app.post("/task/updateDescription/:taskId", verifyUser, (req, res) => {
  const taskId = req.params.taskId;
  const { description } = req.body;

  TaskModel.findByIdAndUpdate(taskId, { description }, { new: true })
    .then((updatedTask) => {
      const listTaskId = taskId;
      ListModel.findOneAndUpdate(
        { "task._id": listTaskId },
        { $set: { "task.$.description": description } },
        { new: true }
      )
        res.json(updatedTask)
    })
    .catch((err) => console.log(err));
});

app.post("/createSubtask/:taskId", verifyUser, (req, res) => {
    const taskId = req.params.taskId;
    const {subtaskTitle} = req.body;
    const subtask = []

    SubtaskModel.create({subtaskTitle, taskId, subtask})
    .then(newSubtask => {
        TaskModel.findOne({_id: taskId})
        .then(task => {
            task.subtask.push(newSubtask);
            task.save()
            .then(task => {
                res.json(newSubtask)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

//Get task information
app.get("/task/getTask/:taskId", verifyUser, (req, res) => {
    const taskId = req.params.taskId;

    TaskModel.findOne({_id: taskId})
    .then(task => {
        res.json(task);
    })
    .catch(err => console.log(err))
})

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

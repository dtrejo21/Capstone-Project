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
const TaskModel = require("./models/Task");
const SubtaskModel = require("./models/Subtask");
const { preview } = require("vite");

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
      SubjectModel.find({ boardId: board._id }).then((subjects) => {
        res.json(subjects);
      });
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
app.post(
  "/task/updateDescription/:taskId/:subtaskType",
  verifyUser,
  (req, res) => {
    const taskId = req.params.taskId;
    const subTaskType = req.params.subtaskType;
    const { description } = req.body;

    //Determines if we're updating the task or a subtask
    if (subTaskType === "subtask") {
      SubtaskModel.findByIdAndUpdate(
        taskId,
        { description },
        { new: true }
      ).then((updatedSubtask) => {
        const taskSubtaskId = taskId;
        TaskModel.findOneAndUpdate(
          { "subtask._id": taskSubtaskId },
          { $set: { "subtask.$.description": description } },
          { new: true }
        ).then((updatedTask) => {
          //console.log(updatedSubtask);
          res.json(updatedSubtask);
        });
      });
    } else {
      TaskModel.findByIdAndUpdate(taskId, { description }, { new: true })
        .then((updatedTask) => {
          const listTaskId = taskId;
          ListModel.findOneAndUpdate(
            { "task._id": listTaskId },
            { $set: { "task.$.description": description } },
            { new: true }
          );
          res.json(updatedTask);
        })
        .catch((err) => console.log(err));
    }
  }
);

app.post("/createSubtask/:taskId/:subtaskType", verifyUser, (req, res) => {
  const taskId = req.params.taskId;
  const subTaskType = req.params.subtaskType;
  const { subtaskTitle } = req.body;
  const subtask = [];

  SubtaskModel.create({ subtaskTitle, taskId, subtask })
    .then((newSubtask) => {
      if (subTaskType === "subtask") {
        SubtaskModel.find({ taskId: taskId }).then((subtasks) => {
          //console.log(subtasks);
          res.json(subtasks);
        });
      } else {
        TaskModel.findOne({ _id: taskId })
          .then((task) => {
            task.subtask.push(newSubtask);
            task
              .save()
              .then((task) => {
                res.json(newSubtask);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

//Get task information
app.get("/task/getTask/:taskId", verifyUser, (req, res) => {
  const taskId = req.params.taskId;

  TaskModel.findOne({ _id: taskId })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => console.log(err));
});

//Add a subtask due date
app.post("/task/addSubtaskDueDate/:subtaskId", verifyUser, (req, res) => {
  const subtaskId = req.params.subtaskId;
  const dueDate = req.body.dueDate;

  //update the new subtask to add to the Task collection
  SubtaskModel.findByIdAndUpdate(subtaskId, { dueDate }, { new: true })
    .then((updatedSubtask) => {
      const taskSubtaskId = subtaskId;
      TaskModel.findOneAndUpdate(
        { "subtask._id": taskSubtaskId },
        { $set: { "subtask.$.dueDate": dueDate } },
        { new: true }
      ).then((updatedTask) => {
        res.json(updatedSubtask);
      });
    })
    .catch((err) => console.log(err));
});

//Add a due date to a task
app.post(
  "/task/addTaskDueDate/:taskId/:subtaskType",
  verifyUser,
  (req, res) => {
    const taskId = req.params.taskId;
    const subTaskType = req.params.subtaskType;
    const dueDate = req.body.dueDate;

    if (subTaskType === "subtask") {
      SubtaskModel.findByIdAndUpdate(taskId, { dueDate }, { new: true }).then(
        (updatedSubtask) => {
          const taskSubtaskId = taskId;
          TaskModel.findOneAndUpdate(
            { "subtask._id": taskSubtaskId },
            { $set: { "subtask.$.dueDate": dueDate } },
            { new: true }
          ).then((updatedTask) => {
            res.json(updatedSubtask);
          });
        }
      );
    } else {
      TaskModel.findByIdAndUpdate(taskId, { dueDate }, { new: true })
        .then((updatedTask) => {
          const listTaskId = taskId;
          ListModel.findOneAndUpdate(
            { "task._id": listTaskId },
            { $set: { "task.$.dueDate": dueDate } },
            { new: true }
          );
          res.json(updatedTask);
        })
        .catch((err) => console.log(err));
    }
  }
);

app.get("/getSubtask/:subtaskId", verifyUser, (req, res) => {
  const subtaskId = req.params.subtaskId;

  SubtaskModel.find({ _id: subtaskId })
    .then((subtasks) => {
      SubtaskModel.find({ taskId: subtaskId })
        .then((children) => {
          res.json({ ...subtasks, type: "subtask", children: children });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

async function deleteSubtaskAndChildren(taskId) {
  const subtask = await SubtaskModel.findById(taskId);
  //console.log("Subtask being passed in:", subtask);

  if (!subtask) {
    return;
  }
  //exclude current subtask
  const childSubtasks = await SubtaskModel.find({ taskId: subtask._id });
  for (const childSubtask of childSubtasks) {
    //console.log("Child: ", childSubtask);
    await deleteSubtaskAndChildren(childSubtask._id);
  }
  await SubtaskModel.deleteOne({ _id: taskId });
}

//Delete subtask and any children nodes
app.delete(
  "/deleteSubtask/:taskId/:subtaskType",
  verifyUser,
  async (req, res) => {
    const taskId = req.params.taskId;
    const subTaskType = req.params.subtaskType;

    if (subTaskType === "subtask") {
      //subtask is a parent
      await deleteSubtaskAndChildren(taskId);
      res.json("Deleted");
    } else {
      //subtask is not a parent
      const subtask = await SubtaskModel.findById({ _id: taskId });

      //pass any subtask to check if there are any children
      await deleteSubtaskAndChildren(taskId);

      //Update the task by removing the subtask
      await TaskModel.findOneAndUpdate(
        { "subtask._id": taskId },
        { $pull: { subtask: { _id: subtask._id } } },
        { new: true }
      );
      res.json("delete a subtask that is not a parent");
    }
  }
);

app.post("/subtask/updateComplete/:subtaskId", verifyUser, (req, res) => {
  const subtaskId = req.params.subtaskId;
  const isCompleted = req.body.isCompleted;

  SubtaskModel.findByIdAndUpdate(
    subtaskId,
    { isCompleted },
    { new: true }
  ).then((updatedSubtask) => {
    const taskSubtaskId = subtaskId;
    TaskModel.findOneAndUpdate(
      { "subtask._id": taskSubtaskId },
      { $set: { "subtask.$.isCompleted": isCompleted } },
      { new: true }
    ).then((updatedTask) => {
      res.json(updatedSubtask);
    });
  });
});
//matrix
function editDistance(string1, string2){
  //Filling up our array with the length of the string1, going to be rolling method
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();
  //console.log("s1: ", string1);
  //console.log("s2: ", string2);

  if(string1 === string2){
    return 0;
  }

  let matrix = [];
  /*for(let i = 0; i < string1.length; i++){
    prevRow.push(i);
  }*/

  for(let i = 0; i <= string1.length; i++){
    matrix[i] = [i];

    for(let k = 1; k <= string2.length; k++){
      if(i === 0){
        matrix[i][k] = k;
      }
      else{
        const cost = string1.charAt(i - 1) !== string2.charAt(k -1) ?  1 : 0;
        matrix[i][k] = Math.min(matrix[i - 1][k] + 1, matrix[i][k - 1], matrix[i - 1][k -1] + cost);
      }
    }
  }
  console.log("matrix: ", matrix[string1.length][string2.length]);
  return matrix[string1.length][string2.length];
}

function compareTitles(title, comparedTitle){
  //determine which string is the longer string and the shorter string
  let longerString = title.length >= comparedTitle.length ? title : comparedTitle;
  let shorterString = title.length < comparedTitle.length ? title : comparedTitle;

  longerString = longerString.replace(/\s/g, "");
  shorterString = shorterString.replace(/\s/g, "");

  //console.log("Longer String: ", longerString);
  //console.log("Shorter String: ", shorterString);

  return (longerString.length - editDistance(longerString, shorterString)) / parseFloat(longerString.length);
}

app.post("/suggestedTime", verifyUser, async (req, res) => {
  //beginnings of an algorithm for tech challenge 1
  try{
    const scoredTitle = [];
    const totalTime = [];
    let result = 0, timeDifference = 0;
    let days = 0, sum = 0, avg = 0;

    //const allTasks = await TaskModel.find({});
    const completedSubtasks = await SubtaskModel.find({isCompleted: true});
    //console.log(completedSubtasks);
    //console.log(allTasks);

    //Score all of the titles 
    for(let i = 0; i < completedSubtasks.length; i++){
      result = compareTitles("chapter", completedSubtasks[i].subtaskTitle);
      console.log("Result: ", result);
      console.log(completedSubtasks[i].subtaskTitle)
      //if good enough score, push into a new array
      if(result >= 0.85){
        scoredTitle.push(completedSubtasks[i]);
      }
    }

    if(scoredTitle.length !== 0){
      //Once we get all of the titles, time to do some math
    for(let i = 0; i < scoredTitle.length; i++){
      const createdDate = scoredTitle[i].createdAt;
      const completedDate = scoredTitle[i].updatedAt;

      //Calculate how long it took a subtask to be completed in days
      timeDifference = completedDate - createdDate;
      days = timeDifference/ (1000 * 60 * 60 * 24);

      //Add the time to an array
      totalTime.push(days);
    }

    sum = totalTime.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    avg = sum/ totalTime.length;
    console.log("this is the average", avg);
    res.json(avg);
    }
    else{
      res.json("did not find a match");
    }  
  }
  catch(error){
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

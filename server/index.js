const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { descriptions } = req.body;
    const newtodo = await pool.query(
      "INSERT INTO todo (descriptions) VALUES ($1) RETURNING *;",
      [descriptions]
    );

    res.json(newtodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todo

app.get("/todos", async (req, res) => {
  try {
    const alltodo = await pool.query("SELECT * FROM todo");
    res.json(alltodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { descriptions } = req.body;
    const updatetodo = await pool.query(
      "UPDATE todo SET descriptions = $1 WHERE todo_id = $2",
      [descriptions, id]
    );
    res.json("todo updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//dalete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("app has started on port 5000");
});

import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [descriptions, setDescriptions] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { descriptions };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "./";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">PERN TODO LIST</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={descriptions}
          onChange={(e) => setDescriptions(e.target.value)}
        />
        <button className="btn btn-primary">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;

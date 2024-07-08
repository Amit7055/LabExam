import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [name, SetName] = useState("");
  const [year, SetYear] = useState(0);
  const [stream, SetStream] = useState("");
  const [addr, SetAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !stream || isNaN(year)) {
        alert("Please fill all the fields / Correct Data");
        return;
      }
    try {
      await axios.post("http://localhost:8000/addmission/add", {name ,addr ,stream , year}).then((response) => console.log(response))
      .catch((error) => console.error(error));
        alert("Create Successfully");
        navigate("/");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">Add student Details</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              NAme
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              onChange={(e) => SetName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Stream
            </label>
            <input
              type="text"
              class="form-control"
              id="stream"
              onChange={(e) => SetStream(e.target.value)}
              placeholder="Enter Stream"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Year
            </label>
            <input
              type="text"
              class="form-control"
              id="stream"
              onChange={(e) => SetYear(e.target.value)}
              placeholder="Enter Year"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="address"
              onChange={(e) => SetAddress(e.target.value)}
              placeholder="Enter Address"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

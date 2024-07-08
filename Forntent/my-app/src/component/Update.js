import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Update() {
  const [search] = useSearchParams();
  const [name, SetName] = useState("");
  const [year, SetYear] = useState(0);
  const [stream, SetStream] = useState("");
  const [addr, SetAddress] = useState("");
  const id = search.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      try {
        console.log(id);
        const res = await axios.get(
          `http://localhost:8000/addmission/id/${id}`
        );
        SetName(res.data.name);
        SetYear(res.data.year);
        SetStream(res.data.stream);
        SetAddress(res.data.addr);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !stream || isNaN(year)) {
        alert("Please fill all the fields");
        return;
      }
    try {
      await axios.put(`http://localhost:8000/admission/update/${id}`, {name ,addr ,stream , year}).then((response) => console.log(response))
      .catch((error) => console.error(error));
        alert("Updated Successfully");
        navigate("/");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">Update Student Details</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              NAme
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              value={name}
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
              value={stream}
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
              value={year}
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
              value={addr}
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

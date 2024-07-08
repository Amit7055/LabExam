import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [addmission, setAddmission] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/addmission/all");
        setAddmission(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);

  const handleUpdate = (id)=>{
    console.log("update "+ id);
    navigate(`/update?id=${id}`)
  }

  return (
    <div>
      <>
        <div className="container">
        <h1 className="text-center">List of Addmission</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">NAme</th>
                <th scope="col">Stream</th>
                <th scope="col">Year</th>
                <th scope="col">Address</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              {addmission.map((item) => (
                <>
                <tr>
                    <th scope="row">{item._id}</th>
                    <td>{item.name}</td>
                    <td>{item.stream}</td>
                    <td>{item.year}</td>
                    <td>{item.addr}</td>
                    <td>
                        <button type="button" class="btn btn-info"onClick={()=>{handleUpdate(item._id)}} >Update</button>
                    </td>
                </tr>
                </>
              ))}
            </tbody>
          </table>
          <Link to={"/create"}>To Add student Details</Link>
        </div>
      </>
    </div>
  );
}

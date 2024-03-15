import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SecretPage() {
  const [response, setResponse] = useState("");
  const token = localStorage.getItem("jwtToken");
  const [image,setImage] = useState(null);
  const [pfp,setPfp] = useState("");

  const getMe = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/me", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        console.log(res)
        setResponse(res.data);
        setPfp(res.data.pfp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  },[]);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        localStorage.removeItem("jwtToken");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image);
    if(formData===null){
      alert("No file selected");
      console.log("No file selected");
      return;
    }
    try{
      const res = await axios.put("http://localhost:4000/api/upload",formData,{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res);
    }catch(error){
      console.log(error);
    }
  }

  const onInput=(e)=>{
    e.preventDefault();
    console.log("file:",e.target.files[0]);
    setImage(e.target.files[0]);
  };
    

  return (
    <>
      {response ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">You're signed in as:&nbsp;</h1>
            <div className="mt-3 text-3xl text-gray-500">{response.username}</div>
            <img src={`http://localhost:4000/uploads/${pfp}`} alt="pfp" className="w-32 h-32 mt-5 rounded-full"/>
            <form onSubmit={handleUpload}> 
              <input type="file" accept="image/*" onChange={onInput}/>
              <button
                type="submit"
                className="w-32 p-3 mt-5 text-white rounded-full bg-sky-500"  
                disabled={!image}
              >
                Upload
              </button>
            </form>
            <div className="mt-3 text-3xl text-gray-500">{response.username}</div>
            <button
              onClick={handleLogout}
              
              className="w-32 p-3 mt-5 text-white rounded-full bg-sky-500"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-3xl">
            This is a protected route, only <br />
            accessible if you're logged in...
            <Link to="/" className="flex justify-center mt-5">
              <span className="text-sky-600">Click here to login.</span>
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

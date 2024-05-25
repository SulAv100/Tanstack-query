// Detail understaing of TanStack and react-form-hook
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./State.css";
function State() {
  const style = {
    color: "red",
  };
  const [name, setName] = useState("");

  const extractData = (event) => {
    console.log(name);
    fetch(`http://localhost:3000/users?username=${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("AN error has occured");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("An error has occured");
      } else {
        return response.json();
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: (newData) =>
      fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(newData),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("An error has occured", error);
        } else {
          return response.json();
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    //   to force the server to fetch the data again we neeed to use invalidate queery and if we want some specific data then we need to use the query key that we defined previoulsy
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // register basically contains the data that we get from input
  // handleSubmit helps to retrieve the formData
  // formState is an object that contains different types of error
  // so this is the first initialization method of the useForm()

  // this formData is returnd by the function we got from the useForm that is handleSubmit
  const handleSubmission = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("An error has occurred");
      }
      console.log("Successfully sent");
    } catch (error) {
      console.log("An error has occurred", error);
    }
  };

  return (
    <>
      <div className="form-container">
        {/* so we need this handleSubmit compulsarily because this is used to initialize the data to the useForm this is inbuilt in useForm */}
        <form onSubmit={handleSubmit(handleSubmission)}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              {...register("username", { required: true })}
              // this spread operator is used to get the initalstate of the resgiter as this is for single form so it will be empty this is used to upadte the state of the var
              type="text"
              id="username"
            />
            {/* This is the error to be displayed if the input field is empty similarly we can add multiple conditions */}
            {errors.username && <span style={style}>An error has occured</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
            />
            {errors.password && <span style={style}>An error has occured</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="user-info">
        {data?.map((item, index) => {
          return (
            <>
              <div key={index}>
                <span>{item.username}</span>
                <span>{item.password}</span>
              </div>
            </>
          );
        })}
      </div>

      <button
        onClick={() =>
          mutate({
            id: "esg2",
            username: "asdasername",
            password: "mutatdsdson123",
          })
        }
      >
        Add New Data
      </button>

      <div className="get-data">
        <input type="text" onChange={(event) => setName(event.target.value)} />
        <span>Enter your username to get the password</span>
      </div>
      <button onClick={extractData}>Get the data back</button>
    </>
  );
}

export default State;

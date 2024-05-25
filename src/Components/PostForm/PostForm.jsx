// LoginForm.js
import React from "react";
import "./PostForm.css"; // Import the CSS file
import { useForm } from "react-hook-form";
import { useQuery, useMutation , useQueryClient} from "@tanstack/react-query";

const PostForm = () => {

    const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["item"],
    queryFn: () => {
      return fetch("http://localhost:3001/users").then((res) => res.json());
    },
  });

  const {mutate,isPendingm, isError, isSuccess} = useMutation({
    mutationFn: (newData)=>{
        fetch("http://localhost:3001/users",{
            method: 'POST',
            body: JSON.stringify(newData)
        }).then(response=>response.json());
       
       
    }
    
  })

  const style = {
    color: "red",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmission = async (formKoData) => {
    const url = "http://localhost:3001/users";
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formKoData),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okat");
        } else {
          console.log("Data sent successfully");
        }
      });
    } catch (error) {
      console.log("An error has occured", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(handleSubmission)}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            {...register("username", { required: true })}
            type="text"
            id="username"
          />
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
      {error && <span>An error has occurred</span>}
      {isLoading ? (
        <span>Data is loading</span>
      ) : (
        data?.map((todo, index) => (
          <div className="fetched-data" key={index}>
            <span>
              {" "}
              Username : <p>{todo.username}</p>
            </span>
            <span>
              Password: <p>{todo.password}</p>
            </span>
          </div>
        ))
      )}
      <button onClick={()=> mutate(
        {
            "id": "esg2",
            "username": "asdasername",
            "password": "mutatdsdson123"
          }
      )} >Add New Data</button>
    </div>
  );
};

export default PostForm;

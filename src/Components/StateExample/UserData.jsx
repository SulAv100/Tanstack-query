import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


function UserData() {

    const newName = useSelector(state=> state.username.value);
  return (
    <>
        <span>
            {newName}
        </span>
    </>
)
}

export default UserData
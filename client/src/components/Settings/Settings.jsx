import React, { useContext } from 'react'
import {AuthContext} from '../../context/user/UserContext'

function Settings() {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div className="update-form">
      
    </div>
  )
}

export default Settings

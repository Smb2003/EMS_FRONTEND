
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [department,setDepartment] = useState([]);
  const [employees,setEmployees] = useState([]);

  const login = (data) => {
    setUser(data);
  };

  const logout = async () => {
    return axios.get("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/logOut", {
      withCredentials: true
    }).then(() => {
      setUser(null);
    });
  };

  const addDepartment = (data) => {
    setDepartment([...department,...data]);
  }
  const addEmployees = (data) => {
    setEmployees([...employees, ...data])
  }
  useEffect(() => {
    axios.get("https://employeemanagementsystem-backend-iota.vercel.app/api/v1/users/check", {
      withCredentials: true
    })
    .then((res) => {
      setUser(res?.data?.user);
    })
    .catch(() => {
      setUser(null);
    });
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout, addDepartment, department,addEmployees,employees}}>
      {children}
    </authContext.Provider>
  );
};

export const getAuth = () => useContext(authContext);
export default AuthProvider;

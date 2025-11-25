"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function Employees() {
  const [employees, setEmployees] = useState<any[]>([]);
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/employees");
        setEmployees(res.data);
      } catch (error) {
        console.error("employees error", error);
      }
    };
    getEmployees();
  }, []);
  return (
    <div>
      {employees.map((employee, i) => {
        return (
          <div key={i} className="flex gap-10">
            <h1>{employee.firstname}</h1>
            <p>{employee.lastname}</p>
            <p>{employee.age}</p>
            <p>{employee.gender}</p>
            <p>{employee.position}</p>
          </div>
        );
      })}
    </div>
  );
}

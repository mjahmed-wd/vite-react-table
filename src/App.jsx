import { useState } from "react";
import logo from "./logo.svg";
import { employeeData } from "./data/employeeData";
import "./App.css";

function App() {
  const [gridData, setGridData] = useState(employeeData);
  const [searchValue, setSearchValue] = useState("");
  const searchHandler = (e) => {
    const searchedValue = gridData.map((employee) =>
      employee.EmployeeName.toLowerCase().includes(
        e.target.value.toLowerCase()
      ) ||
      employee.EmployeeId.toString().includes(e.target.value) ||
      employee.DepartmentName.toLowerCase().includes(
        e.target.value.toLowerCase()
      )
        ? { ...employee, isActive: true }
        : { ...employee, isActive: false }
    );
    setGridData(searchedValue);
    setSearchValue(e.target.value);
  };

  const sortHandler = (e, fieldName, type) => {
    setGridData((prev) =>
      [...prev].sort(function (a, b) {
        const nameA = a[fieldName].toString().toLowerCase();
        const nameB = b[fieldName].toString().toLowerCase();
        if (nameA < nameB || type === "asc") {
          return -1;
        }
        if (nameA > nameB || type === "desc") {
          return 1;
        }
        return 0; //default return value (no sorting)
      })
    );
  };

  return (
    <div className="App">
      <input
        type="text"
        name="search"
        id="search"
        value={searchValue}
        onChange={(e) => {
          searchHandler(e);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>
              {" "}
              <span
                onClick={(e) => {
                  sortHandler(e, "EmployeeName", "asc");
                }}
              >
                {" "}
                -
              </span>{" "}
              Name{" "}
              <span
                onClick={(e) => {
                  sortHandler(e, "EmployeeName", "desc");
                }}
              >
                +
              </span>{" "}
            </th>
            <th>Id</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Mobile</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {[...gridData]
            .filter((item) => item?.isActive)
            .map((employee) => (
              <tr key={employee.EmployeeId}>
                <td>{employee?.EmployeeName}</td>
                <td>{employee?.EmployeeId}</td>
                <td>{employee?.DepartmentName}</td>
                <td>{employee?.DesignationName}</td>
                <td>{employee?.Phone}</td>
                <td>{employee?.Email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

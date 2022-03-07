import { useState } from "react";
import logo from "./logo.svg";
import { employeeData } from "./data/employeeData";
import "./App.css";

function App() {
  const [gridData, setGridData] = useState(employeeData);
  const [searchValue, setSearchValue] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    pageSize: 0,
  });
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

  const setPaginationHandler = (e) => {
    setPaginationInfo({
      pageSize: e.target.value,
    });
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
      <select
        name="page"
        id="page"
        value={paginationInfo?.pageSize}
        onChange={(e) => {
          setPaginationHandler(e);
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
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
            .filter((item, i, array) => {
              const paginatedArray = array.length / paginationInfo?.pageSize;
              return item?.isActive && i < paginationInfo?.pageSize;
            })
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

import { useState } from "react";
import logo from "./logo.svg";
import { employeeData } from "./data/employeeData";
import "./App.css";

function App() {
  const [gridData, setGridData] = useState(employeeData);
  const [searchValue, setSearchValue] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    pageSize: 10,
    currentPage: 1,
    pageNumbers : [1]
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
    const pageSize = +e?.target?.value;
    const pageData = [...gridData].map((item, index, array) => {
      const isActive =
        index >= (paginationInfo?.currentPage - 1) * pageSize &&
        index <= (paginationInfo?.currentPage - 1) * pageSize + pageSize - 1;
      return isActive
        ? { ...item, isActive: true }
        : { ...item, isActive: false };
    });
    setGridData(pageData);
    setPaginationInfo((prev) => ({ ...prev, pageSize }));
  };

  const setPageHandler = (e) => {
    const currentPage = +e?.target?.value;
    const pageData = [...gridData].map((item, index, array) => {
      const isActive =
        index >= (currentPage - 1) * paginationInfo?.pageSize &&
        index <=
          (currentPage - 1) * paginationInfo?.pageSize +
            paginationInfo?.pageSize -
            1;
      return isActive
        ? { ...item, isActive: true }
        : { ...item, isActive: false };
    });
    setGridData(pageData);
    setPaginationInfo((prev) => ({ ...prev, currentPage }));
  };

  const paginationHandler = (pageSize, currentPage) => {
    const pageData = [...gridData].map((item, index, array) => {
      const isActive =
        index >= (+currentPage - 1) * +pageSize &&
        index <= (+currentPage - 1) * +pageSize + +pageSize - 1;
      return isActive
        ? { ...item, isActive: true }
        : { ...item, isActive: false };
    });
    console.log((+currentPage - 1) * +pageSize,(+currentPage - 1) * +pageSize + +pageSize - 1)
    setGridData(pageData);
    setPaginationInfo((prev) => ({ ...prev, pageSize, currentPage }));
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
      <div>
        <label htmlFor="pageSize">Page Size</label>
        <select
          name="pageSize"
          id="pageSize"
          value={paginationInfo?.pageSize}
          onChange={(e) => {
            // setPaginationHandler(e);
            paginationHandler(e?.target?.value, paginationInfo?.currentPage)
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <label htmlFor="currentPage">Current Page</label>
        <select
          name="currentPage"
          id="currentPage"
          value={paginationInfo?.currentPage}
          onChange={(e) => {
            paginationHandler(paginationInfo?.pageSize, e?.target?.value)
          }}
        >
          {}
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
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
            .filter((item, i, array) => item?.isActive)
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

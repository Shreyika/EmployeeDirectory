
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Employee } from './types/Employee';
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from './services/employeeService';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
const employeesPerPage = 5;

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error(error);
      setMessage('Unable to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const employee = { name, email, role };

    try {
      if (editingId !== null) {
        await updateEmployee(editingId, employee);
        setMessage('Employee updated successfully');
      } else {
        await addEmployee(employee);
        setMessage('Employee added successfully');
      }

      setName('');
      setEmail('');
      setRole('');
      setEditingId(null);

      await loadEmployees();
    } catch (error) {
      console.error(error);
      setMessage('Unable to save employee. Check the email and try again.');
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);
    setName(employee.name);
    setEmail(employee.email);
    setRole(employee.role);
    setMessage('');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await deleteEmployee(id);
      setMessage('Employee deleted successfully');
      await loadEmployees();
    } catch (error) {
      console.error(error);
      setMessage('Unable to delete employee');
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

const currentEmployees = filteredEmployees.slice(
  indexOfFirstEmployee,
  indexOfLastEmployee
);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Employee Directory</h2>
          <p className="text-muted">Manage your employee records</p>
        </div>
        <span className="badge bg-primary fs-6">
          Total: {employees.length}
        </span>
      </div>

      {message && (
        <div className="alert alert-info">{message}</div>
      )}

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            {editingId !== null ? 'Edit Employee' : 'Add Employee'}
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter employee name"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Role</label>
                <input
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Enter employee role"
                  required
                />
              </div>
            </div>

            <div className="mt-3">
              <button className="btn btn-primary me-2" type="submit">
                {editingId !== null ? 'Update Employee' : 'Add Employee'}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setName('');
                    setEmail('');
                    setRole('');
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Employees</h5>
            <input
              className="form-control"
              style={{ maxWidth: '280px' }}
              placeholder="Search employees..."
              value={search}
              onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No employees found
                  </td>
                </tr>
              ) : (
                currentEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {employee.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(employee)}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
                    </table>
        </div>

        {/* Pagination */}
        <div className="card-footer bg-white">
          <div className="d-flex justify-content-between align-items-center">

            <span className="text-muted">
              Showing {filteredEmployees.length === 0 ? 0 : indexOfFirstEmployee + 1}
              {' - '}
              {Math.min(indexOfLastEmployee, filteredEmployees.length)}
              {' '}of {filteredEmployees.length} employees
            </span>

            <div>
              <button
                className="btn btn-outline-primary btn-sm me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              <span className="mx-2">
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                className="btn btn-outline-primary btn-sm ms-2"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

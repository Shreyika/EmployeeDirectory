import type { Employee } from '../types/Employee';

interface EmployeeListProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
}

function EmployeeList({
    employees,
    onEdit,
    onDelete
}: EmployeeListProps) {

    return (
        <div className="card shadow-sm">

            <div className="card-body">

                <h5 className="card-title mb-3">
                    Employee Directory
                </h5>

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

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

                            {employees.length === 0 ? (

                                <tr>
                                    <td colSpan={5} className="text-center">
                                        No employees found
                                    </td>
                                </tr>

                            ) : (

                                employees.map(employee => (

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
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() => onEdit(employee)}
                                            >
                                                <i className="bi bi-pencil"></i> Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => onDelete(employee.id)}
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

            </div>

        </div>
    );
}

export default EmployeeList;
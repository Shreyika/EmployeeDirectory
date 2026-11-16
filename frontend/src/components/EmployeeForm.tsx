import { useEffect, useState } from 'react';
import type { EmployeeFormData } from '../types/Employee';

interface EmployeeFormProps {
    onSubmit: (data: EmployeeFormData) => void;
    editingEmployee: (EmployeeFormData & { id: number }) | null;
    onCancel: () => void;
}

function EmployeeForm({
    onSubmit,
    editingEmployee,
    onCancel
}: EmployeeFormProps) {

    const [formData, setFormData] = useState<EmployeeFormData>({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        if (editingEmployee) {
            setFormData({
                name: editingEmployee.name,
                email: editingEmployee.email,
                role: editingEmployee.role
            });
        } else {
            setFormData({
                name: '',
                email: '',
                role: ''
            });
        }
    }, [editingEmployee]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name.trim() ||
            !formData.email.trim() ||
            !formData.role) {
            alert('Please fill in all fields');
            return;
        }

        onSubmit({
            name: formData.name.trim(),
            email: formData.email.trim(),
            role: formData.role
        });
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">

                <h5 className="card-title mb-3">
                    {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h5>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                                Employee Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter employee name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                                Job Role
                            </label>

                            <select
                                name="role"
                                className="form-select"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="Developer">Developer</option>
                                <option value="Tester">Tester</option>
                                <option value="Designer">Designer</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Analyst">Analyst</option>
                            </select>
                        </div>

                    </div>

                    <button type="submit" className="btn btn-primary me-2">
                        {editingEmployee ? 'Update Employee' : 'Add Employee'}
                    </button>

                    {editingEmployee && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;
import React from 'react';
import './DataTable.css';
import { Edit, Trash2 } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx}>{col.header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={row._id || rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                                    </td>
                                ))}
                                <td className="actions-cell">
                                    <button onClick={() => onEdit(row)} className="action-btn edit" title="Edit">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => onDelete(row._id)} className="action-btn delete" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="empty-state">
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;

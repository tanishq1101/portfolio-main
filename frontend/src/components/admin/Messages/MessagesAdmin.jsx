import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessages, deleteMessage } from '../../../api/messageApi';
import DataTable from '../Shared/DataTable';

const MessagesAdmin = () => {
    const queryClient = useQueryClient();

    // Fetch Data
    const { data: messages, isLoading, isError } = useQuery({
        queryKey: ['admin-messages'],
        queryFn: getMessages
    });

    const deleteMutation = useMutation({
        mutationFn: deleteMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
        }
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            deleteMutation.mutate(id);
        }
    };

    const columns = [
        {
            header: 'Date',
            accessor: 'createdAt',
            render: (val) => new Date(val).toLocaleDateString()
        },
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        {
            header: 'MessageSnippet',
            accessor: 'message',
            // We truncate long messages for the table view
            render: (val) => val.length > 50 ? `${val.substring(0, 50)}...` : val
        }
    ];

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Contact Messages Inbox</h2>
            </div>

            {isLoading ? (
                <p>Loading messages...</p>
            ) : isError ? (
                <p className="error-text">Error loading messages.</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={messages || []}
                    onDelete={handleDelete}
                    // Intentionally omitting onEdit because we shouldn't "edit" inbox messages
                    onEdit={() => alert("Messages are read-only.")}
                />
            )}
        </div>
    );
};

export default MessagesAdmin;

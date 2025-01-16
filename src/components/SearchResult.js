import React from 'react';

const SearchResults = ({ users, onSelection, currentPage, totalPages, onPagination }) => {
    if (!users?.length) return null;

    return (
        <div className="mt-4">
            <div className="bg-white rounded-lg shadow-md">
                {users.map(user => (
                    <div
                        key={user.id}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => onSelection(user.login)}
                    >
                        <img
                            src={user.avatar_url}
                            alt={`${user.login}'s avatar`}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <h3 className="font-medium">{user.login}</h3>
                            <p className="text-sm text-gray-500">Score: {user.score.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>


            {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    <button
                        onClick={() => onPagination(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => onPagination(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
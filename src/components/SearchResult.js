import React from 'react';


const SearchResults = ({ users, onSelectUser }) => {
    if (!users?.length) return null;

    return (
        <div className="mt-4 bg-white rounded-lg shadow-md">
            {users.map(user => (
                <div
                    key={user.id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => onSelectUser(user.login)}
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
    );
};

export default SearchResults;
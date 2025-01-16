import React from 'react'


const UserCard = ({ user }) => {
    if (!user) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-center gap-4">
                <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h2 className="text-xl font-bold">{user.name || user.login}</h2>
                    <p className="text-gray-500">{user.login}</p>
                </div>
            </div>

            {user.bio && (
                <p className="text-gray-700 mt-4 mb-4">{user.bio}</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-2xl font-bold">{user.followers}</p>
                    <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-2xl font-bold">{user.following}</p>
                    <p className="text-sm text-gray-500">Following</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-2xl font-bold">{user.public_repos}</p>
                    <p className="text-sm text-gray-500">Repositories</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-2xl font-bold">{user.public_gists}</p>
                    <p className="text-sm text-gray-500">Gists</p>
                </div>
            </div>
        </div>
    );
};

export default UserCard
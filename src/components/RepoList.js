import React from "react";
const RepoList = ({ reposList }) => {
    if (!reposList?.length) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Repositories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reposList.map(repo => (
                    <div key={repo.id} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="font-bold text-lg">
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {repo.name}
                            </a>
                        </h3>
                        {repo.description && (
                            <p className="text-gray-600 text-sm my-2">{repo.description}</p>
                        )}
                        <div className="flex gap-4 text-sm mt-2">
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                {repo.language || 'Unknown'}
                            </span>
                            <span>⭐ {repo.stargazers_count}</span>
                            <span>🍴 {repo.forks_count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RepoList;
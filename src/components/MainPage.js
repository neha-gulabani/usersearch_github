import React, { useState, useCallback } from 'react'
import debounce from 'lodash/debounce';
import UserCard from './UserCard';
import RepoList from './RepoList';
import SearchResults from './SearchResult';

function MainPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [reposList, setReposList] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('search');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const searchUsers = async (query, currentPage = 1) => {
        try {
            setLoading(true);
            setError('');
            setMode('search');

            const response = await fetch(
                `https://api.github.com/search/users?q=${query}&per_page=10&page=${currentPage}`
            );

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();

            if (data.items.length === 0) {
                throw new Error('User not found');
            }


            setTotalPages(Math.ceil(data.total_count / 10));
            setSearchResults(data.items);
        } catch (err) {
            setError(err.message);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserDetails = async (username) => {
        try {
            setLoading(true);
            setError('');
            setMode('profile');

            const [userResponse, reposResponse] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
            ]);


            if (!userResponse.ok) {
                throw new Error('User not found');
            }


            if (!reposResponse.ok) {
                throw new Error('Failed to fetch repositories');
            }

            const userData = await userResponse.json();
            const reposData = await reposResponse.json();

            setSelectedUser(userData);
            setReposList(reposData);
            setSearchResults([]);
        } catch (err) {
            setError(err.message);
            setSelectedUser(null);
            setReposList([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        searchUsers(searchTerm, newPage);
    };


    const debouncedSearch = useCallback(
        debounce((query) => {
            if (query.trim()) {
                searchUsers(query);
            } else {
                setSearchResults([]);
                setSelectedUser(null);
                setReposList([]);
            }
        }, 500),
        []
    );

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPage(1);
        debouncedSearch(value);
        if (e.target.value === '') setError('')
    };

    const handleUserSelect = (username) => {
        fetchUserDetails(username);
        setSearchTerm('');
    };

    const handleBackToSearch = () => {
        setMode('search');
        setSelectedUser(null);
        setReposList([]);
        setError('');
        if (searchTerm) {
            searchUsers(searchTerm);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-center mb-8">
                    GitHub User Search
                </h1>


                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search GitHub users..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {mode === 'profile' && selectedUser && (
                    <button
                        onClick={handleBackToSearch}
                        className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                        ← Back to search results
                    </button>
                )}

                {loading && (
                    <div className="text-center mt-8">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                {mode === 'search' && (
                    <SearchResults
                        users={searchResults}
                        onSelectUser={handleUserSelect}
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
                {selectedUser && <UserCard user={selectedUser} />}
                {reposList.length > 0 && <RepoList reposList={reposList} />}
            </div>
        </div>
    );
}


export default MainPage
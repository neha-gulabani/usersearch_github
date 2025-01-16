import React, { useState, useEffect } from "react";
import user from "../data/data.json";

const UserProfile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };


        window.addEventListener("resize", handleResize);


        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    if (!user) return null;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 fixed top-0 left-0 right-0 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4 z-10">

            <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex items-center">
                    <img
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                        className="w-10 h-10 rounded-full mr-3 sm:mr-4"
                    />
                    <div className="text-sm sm:text-base text-center">
                        <h2 className="font-bold">{user.name || user.login}</h2>
                        {user.bio && <p className="text-gray-600 text-xs sm:text-sm">{user.bio}</p>}
                    </div>
                </div>


                <div className="sm:hidden">
                    <button onClick={toggleMenu} className="text-blue-600 hover:underline">
                        &#9776;
                    </button>
                </div>
            </div>


            {isMenuOpen && isMobile && (
                <div className="flex flex-col gap-4 sm:hidden mt-4 text-sm w-full">
                    <div className="text-center">
                        <p className="font-semibold">Location</p>
                        <p>{user.location || "Unknown"}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Public Repos</p>
                        <p>{user.public_repos}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Followers</p>
                        <p>{user.followers}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Following</p>
                        <p>{user.following}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">Blog</p>
                        <a
                            href={user.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {user.blog || "N/A"}
                        </a>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">GitHub Profile</p>
                        <a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {user.html_url}
                        </a>
                    </div>
                </div>
            )}


            {!isMobile && <div className="flex flex-wrap gap-8 mt-4 sm:mt-0 sm:flex-row sm:w-2/3 sm:text-left sm:ml-4">
                <div className="text-center sm:text-left w-full sm:w-auto text-center">
                    <p className="font-semibold">Location</p>
                    <p>{user.location || "Unknown"}</p>
                </div>
                <div className="text-center sm:text-left w-full sm:w-auto text-center">
                    <p className="font-semibold">Public Repos</p>
                    <p>{user.public_repos}</p>
                </div>
                <div className="text-center sm:text-left w-full sm:w-auto text-center">
                    <p className="font-semibold">Followers</p>
                    <p>{user.followers}</p>
                </div>
                <div className="text-center sm:text-left w-full sm:w-auto text-center">
                    <p className="font-semibold">Following</p>
                    <p>{user.following}</p>
                </div>
                <div className="text-center sm:text-left w-full sm:w-auto text-center">
                    <p className="font-semibold">Blog</p>
                    <a
                        href={user.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-center"
                    >
                        {user.blog || "N/A"}
                    </a>
                </div>
                <div className="text-center sm:text-left w-full sm:w-auto text-center">
                    <p className="font-semibold">GitHub Profile</p>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        {user.html_url}
                    </a>
                </div>
            </div>}
        </div >
    );
};

export default UserProfile;

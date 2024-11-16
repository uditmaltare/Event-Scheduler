import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        if (!username || !password) {
            setError("Please fill out all fields.");
            return;
        }

        if (localStorage.getItem(username)) {
            setError("Username already exists");
        } else {
            localStorage.setItem(username, JSON.stringify({ password }));
            navigate("/"); // Redirect to Login page
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    onClick={handleSignup}
                >
                    Sign Up
                </button>
                {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
                <p className="mt-4 text-center text-gray-700">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;

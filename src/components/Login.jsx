import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
            setError("Please fill out all fields.");
            return;
        }

        const storedUser = localStorage.getItem(username);
        if (storedUser && JSON.parse(storedUser)?.password === password) {
            onLogin(username);
            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    onClick={handleLogin}
                >
                    Login
                </button>
                {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
                <p className="mt-4 text-center text-gray-700">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;

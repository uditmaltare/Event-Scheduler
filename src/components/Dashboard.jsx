import React, { useState, useEffect } from "react";

const Dashboard = ({ username, onLogout }) => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState("All");
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        description: "",
        category: "",
    });

    // Define category background images
    const categoryBackgrounds = {
        Sports: "url('path_to_sports_image.jpg')",
        Exams: "url('path_to_exam_image.jpg')",
        Entertainment: "url('path_to_entertainment_image.jpg')",
        default: "url('path_to_default_image.jpg')",
    };

    // Load events from localStorage when component mounts
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem(`${username}_events`) || "[]");
        setEvents(storedEvents);
    }, [username]);

    // Save events to localStorage whenever events state updates
    useEffect(() => {
        localStorage.setItem(`${username}_events`, JSON.stringify(events));
    }, [events, username]);

    // Filter events based on selected category
    const filteredEvents = category === "All" ? events : events.filter((event) => event.category === category);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    // Add new event
    const handleSaveEvent = () => {
        if (newEvent.title && newEvent.date && newEvent.description && newEvent.category) {
            setEvents((prev) => [...prev, newEvent]);
            setNewEvent({ title: "", date: "", description: "", category: "" });
            setModalOpen(false);
        }
    };

    // Delete event by index
    const handleDeleteEvent = (index) => {
        setEvents((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4 flex justify-between">
                <h1 className="text-2xl font-bold">Event Scheduler</h1>
                <button
                    onClick={onLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{category} Events</h2>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Create Event
                    </button>
                </div>

                <div className="flex gap-4 mb-4">
                    {["All", "Sports", "Exams", "Entertainment"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded ${category === cat ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEvents.map((event, index) => (
                        <div
                            key={index}
                            className="relative bg-cover bg-center rounded-lg shadow-lg p-6 text-black"
                            style={{
                                backgroundImage: categoryBackgrounds[event.category] || categoryBackgrounds.default,
                            }}
                        >
                            <button
                                onClick={() => handleDeleteEvent(index)}
                                className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                            <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                            <p className="text-sm mb-2">{event.date}</p>
                            <p className="mb-2">{event.description}</p>
                            <p className="mt-2">Category: {event.category}</p>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <input
                            type="date"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <textarea
                            name="description"
                            placeholder="Event Description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <select
                            name="category"
                            value={newEvent.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="">Select Category</option>
                            <option value="Sports">Sports</option>
                            <option value="Exams">Exams</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEvent}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

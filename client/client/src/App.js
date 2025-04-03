// App.js (React)
import React, { useState } from 'react';
import axios from 'axios';
import ChatBot from './components/ChatBot';
// TreeNode Component to Display Career Paths
const TreeNode = ({ node }) => {
    return (
        <ul>
            <li>{node.name}</li>
            {node.children && node.children.length > 0 && (
                <ul>
                    {node.children.map((child, index) => (
                        <TreeNode key={index} node={child} />
                    ))}
                </ul>
            )}
        </ul>
    );
};

const App = () => {
    const [education, setEducation] = useState('');
    const [interests, setInterests] = useState('');
    const [income, setIncome] = useState('');
    const [recommendations, setRecommendations] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { education, interests, income };

        try {
            // Fetch the data from the server
            const response = await axios.post('http://localhost:5000/api/recommendations', userData);
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        
        <div>
            <h1>Find Your Way</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Education: </label>
                    <input
                        type="text"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                    />
                </div>
                <div>
                    <label>Interests: </label>
                    <input
                        type="text"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                    />
                </div>
                <div>
                    <label>Status </label>
                    <input
                        type="text"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </div>
                <button type="submit">Get Recommendations</button>
            </form>
            <div>
            
            <ChatBot />
            </div>
            {recommendations && (
                <div>
                    <h2>Career Paths:</h2>
                    {recommendations.careerPaths && (
                        <div>
                            <h3>Career Paths:</h3>
                            <TreeNode node={recommendations.careerPaths} />
                        </div>
                    )}

                    <h3>Recommended Courses:</h3>
                    {recommendations.courses && recommendations.courses.map((course, index) => (
                        <div key={index}>
                            <p>{course.name}</p>
                        </div>
                    ))}

                    <h3>Job Listings:</h3>
                    {recommendations.jobs && recommendations.jobs.map((job, index) => (
                        <div key={index}>
                            <p>{job.title} - {job.salary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default App;

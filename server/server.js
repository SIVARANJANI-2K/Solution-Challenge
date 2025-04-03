// server.js (Node.js + Express)
const express = require('express');
const axios = require('axios');
 // For making external API calls
 const cors=require('cors');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors()); 

// Endpoint to get career paths based on user data
app.post('/api/recommendations', async (req, res) => {
    const { education, interests, income } = req.body;

    try {
        // 1. Fetch career paths based on user education and interests
        const careerPaths = await getCareerPaths(education, interests);

        // 2. Fetch related courses or resources from an external API (e.g., Coursera)
        const courses = await getCourses(education, interests);

        // 3. Fetch job listings based on income expectations
        const jobs = await getJobListings(income);

        // Return the data to the frontend
        res.json({ careerPaths, courses, jobs });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching recommendations' });
    }
});

// Example function to fetch career paths from an external source
const getCareerPaths = async (education, interests) => {
    // Example API call to LinkedIn or a custom service
    const response = await axios.get(`https://api.example.com/careerPaths?education=${education}&interests=${interests}`);
    return response.data;
};

// Example function to fetch courses based on interests (from Coursera/Udemy)
const getCourses = async (education, interests) => {
    const response = await axios.get(`https://api.coursera.org/api/courses.v1?interest=${interests}`);
    return response.data;
};

// Example function to fetch job listings based on income expectations
const getJobListings = async (income) => {
    const response = await axios.get(`https://api.indeed.com/jobs?income=${income}`);
    return response.data;
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

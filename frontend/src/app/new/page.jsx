'use client';

import { useState } from 'react';
import Head from 'next/head';

// for demonstration switch it to username later
const LOGGED_IN_USERNAME = "JaneDoe7"; 

const sportsOptions = [
  'Basketball', 'Volleyball', 'Soccer', 'Softball', 'Tennis', 'Pickleball', 'Other',
];

// Helper to generate time options (same as before)
const generateTimeOptions = () => {
    const times = [];
    for (let h = 8; h <= 20; h++) { 
        const hour = h % 12 === 0 ? 12 : h % 12;
        const ampm = h < 12 ? 'AM' : 'PM';
        times.push(`${hour}:00 ${ampm}`);
    }
    return times;
};

// Network Request Function (same as before)
const postGameData = async (dataToSend) => {
    const response = await fetch('/api/new/submit-game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
    }
    return result;
};


// Main Component
export default function SubmitGamePage() {
    const [formData, setFormData] = useState({
        username: LOGGED_IN_USERNAME,
        sport: '',
        otherSport: '',
        date: '',
        time: '',
        // Initialize peopleNeeded to null or an empty string since it's now optional
        peopleNeeded: '', 
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'sport' && value !== 'Other') {
            setFormData(prevData => ({ ...prevData, otherSport: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSubmitting(true);

        // 1. Updated Validation: peopleNeeded is excluded from the check
        if (!formData.sport || !formData.date || !formData.time) {
            setMessage('Please fill out all required fields: Sport, Date, and Time.');
            setIsSubmitting(false);
            return;
        }

        if (formData.sport === 'Other' && !formData.otherSport.trim()) {
            setMessage('Please enter the sport name if you selected "Other".');
            setIsSubmitting(false);
            return;
        }

        const finalSport = formData.sport === 'Other' ? formData.otherSport.trim() : formData.sport;
        
        // Prepare data: convert peopleNeeded to an integer only if it has a value, otherwise set to null or undefined.
        const peopleCount = formData.peopleNeeded ? parseInt(formData.peopleNeeded, 10) : null;

        const dataToSend = {
            username: formData.username,
            sport: finalSport,
            date: formData.date,
            time: formData.time,
            peopleNeeded: peopleCount, 
        };

    
        try {
            const result = await postGameData(dataToSend);
            setMessage(`Game successfully posted! ID: ${result.id}`);
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(`Submission failed: ${error.message || 'An unexpected error occurred.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="form-container">
            <Head>
                <title>Post a Game</title>
            </Head>
            <h1 className="heading">Post a Game to Find Players</h1>

            <p className="user-info">
                Posting as: <strong>{formData.username}</strong>
            </p>

            <form onSubmit={handleSubmit} className="form-main">
                
                
                <div className="form-group">
                    <label htmlFor="sport" className="form-label">Sport *</label>
                    <select
                        id="sport"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        required // Required
                        className="form-input"
                    >
                        <option value="">-- Select a Sport --</option>
                        {sportsOptions.map((sport) => (
                            <option key={sport} value={sport}>
                                {sport}
                            </option>
                        ))}
                    </select>
                </div>

                
                {formData.sport === 'Other' && (
                    <div className="form-group">
                        <label htmlFor="otherSport" className="form-label">Specify Sport *</label>
                        <input
                            type="text"
                            id="otherSport"
                            name="otherSport"
                            value={formData.otherSport}
                            onChange={handleChange}
                            required // Required when 'Other' is selected
                            className="form-input"
                        />
                    </div>
                )}

                
                <div className="form-group">
                    <label htmlFor="date" className="form-label">Date *</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required // Required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time" className="form-label">Time *</label>
                    <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required // Required
                        className="form-input"
                    >
                        <option value="">-- Select a Time --</option>
                        {generateTimeOptions().map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 4. People Needed (OPTIONAL) */}
                <div className="form-group">
                    <label htmlFor="peopleNeeded" className="form-label">Total People Needed (Optional)</label>
                    <input
                        type="number"
                        id="peopleNeeded"
                        name="peopleNeeded"
                        value={formData.peopleNeeded}
                        onChange={handleChange}
                        min="0"
                        max="20"
                        className="form-input"
                        placeholder="e.g., 5"
                    />
                </div>

                <button type="submit" disabled={isSubmitting} className="form-button">
                    {isSubmitting ? 'Submitting...' : 'Post Game'}
                </button>
            </form>

           
            {message && <p className="form-message">{message}</p>}
        </div>
    );
}
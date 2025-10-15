'use client';

import { useState } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Grid, 
} from '@mui/material';

const LOGGED_IN_USERNAME = "JaneDoe7"; 

const sportsOptions = [
  'Basketball', 'Volleyball', 'Soccer', 'Softball', 'Tennis', 'Pickleball', 'Other',
];

const generateTimes = () => {
    const times = [];
    const minutesInDay = 24 * 60; 

    for (let totalMinutes = 0; totalMinutes < minutesInDay; totalMinutes += 15) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
        times.push(timeString);
    }
    return times;
};


const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC' 
];



const postGameData = async (dataToSend) => {
    const response = await fetch('http://localhost:3001/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
        let errorMsg = `Server responded with status: ${response.status}`;
        try {
            const errorResult = await response.json();
            errorMsg = errorResult.error || errorMsg;
        } catch (e) {

        }
        throw new Error(errorMsg);
    }
    
    return await response.json();
};


export default function SubmitGamePage() {
    const [formData, setFormData] = useState({
        username: LOGGED_IN_USERNAME,
        sport: '',
        otherSport: '',
        date: '',
        time: '', 
        peopleNeeded: '', 
        address: '', 
        city: '',    
        state: '',   
        zip: '',     
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

        if (
            !formData.sport || 
            !formData.date || 
            !formData.address.trim() || 
            !formData.time ||
            !formData.city.trim() ||
            !formData.state.trim() ||
            !formData.zip.trim()
        ) {
            setMessage('Please fill out all required fields (Sport, Date, Time, Address, City, State, and ZIP).');
            setIsSubmitting(false);
            return;
        }

        if (formData.sport === 'Other' && !formData.otherSport.trim()) {
            setMessage('Please enter the sport name if you selected "Other".');
            setIsSubmitting(false);
            return;
        }
    
        const timeString = formData.time.endsWith(':00') ? formData.time : formData.time + ':00';
        
        const finalSport = formData.sport === 'Other' ? formData.otherSport.trim() : formData.sport;
        const peopleCount = formData.peopleNeeded ? parseInt(formData.peopleNeeded, 10) : null;

        const dataToSend = {
            username: formData.username,
            sport: finalSport,
            reservation_date: formData.date,
            reservation_time: timeString,
            number_of_people: peopleCount, 
            address: formData.address.trim(), 
            city: formData.city.trim(), 
            state: formData.state.trim(),
            zip: formData.zip.trim(),
        };

        Object.keys(dataToSend).forEach(key => {
             if (dataToSend[key] === '') {
                 dataToSend[key] = null;
             }
         });

          console.log('FRONTEND: Data prepared for POST:', dataToSend); 
        try {
            const result = await postGameData(dataToSend);
            setMessage(`Game successfully posted! ID: ${result.gameId || 'N/A'}`);
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(`Submission failed: ${error.message || 'An unexpected error occurred.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="form-container" style={{maxWidth: 600, margin: '20px auto', padding: '20px'}}>
            <h1 className="heading" style={{fontSize: '2rem', marginBottom: '1.5rem'}}>Post a Game to Find Players</h1>

            <p className="user-info" style={{marginBottom: '1.5rem'}}>
                Posting as: <strong>{formData.username}</strong>
            </p>

            <form onSubmit={handleSubmit} className="form-main">
                
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="sport-label">Sport</InputLabel>
                    <Select
                        labelId="sport-label"
                        id="sport"
                        name="sport"
                        value={formData.sport}
                        label="Sport"
                        onChange={handleChange}
                    >
                        <MenuItem value="">-- Select a Sport --</MenuItem>
                        {sportsOptions.map((sport) => (
                            <MenuItem key={sport} value={sport}>
                                {sport}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                
                {formData.sport === 'Other' && (
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Specify Sport"
                        type="text"
                        id="otherSport"
                        name="otherSport"
                        value={formData.otherSport}
                        onChange={handleChange}
                        required
                    />
                )}

                
                <TextField
                    fullWidth
                    margin="normal"
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="time-label">Time</InputLabel>
                    <Select
                        labelId="time-label"
                        id="time"
                        name="time"
                        value={formData.time}
                        label="Time"
                        onChange={handleChange}
                    >
                        <MenuItem value="">-- Select a Time --</MenuItem>
                        {generateTimes().map((time24h) => (
                            <MenuItem key={time24h} value={time24h}>
                                {new Date(`2000/01/01 ${time24h}`).toLocaleTimeString('en-US', { 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    hour12: true 
                                })}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <TextField
                    fullWidth
                    margin="normal"
                    label="Street Address"
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="ex. 123 NW Play PL"
                />

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            margin="none"
                            label="City"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth margin="none" required>
                            <InputLabel id="state-label">State *</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                name="state"
                                value={formData.state}
                                label="State"
                                onChange={handleChange}
                            >
                                <MenuItem value="">-- Select State --</MenuItem>
                                {states.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            margin="none"
                            label="ZIP"
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                </Grid>



                <TextField
                    fullWidth
                    margin="normal"
                    label="Total People Needed (Optional)"
                    type="number"
                    name="peopleNeeded"
                    value={formData.peopleNeeded}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                />

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    disabled={isSubmitting} 
                    style={{ marginTop: '20px' }}
                    fullWidth
                >
                    {isSubmitting ? 'Submitting...' : 'Post Game'}
                </Button>
            </form>

           
            {message && <p className="form-message" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>{message}</p>}
        </div>
    );
}
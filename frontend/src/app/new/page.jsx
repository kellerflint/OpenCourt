'use client';

import { useState } from 'react';

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
} from '@mui/material';

const LOGGED_IN_USERNAME = "JaneDoe7";

const sportsOptions = [
  'Basketball', 'Volleyball', 'Soccer', 'Softball', 'Tennis', 'Pickleball', 'Other',
];

const stateAbbreviations = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const postGameData = async (dataToSend) => {
  const response = await fetch('/new', {
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

export default function SubmitGamePage() {
  const [formData, setFormData] = useState({
    username: LOGGED_IN_USERNAME,
    sport: '',
    otherSport: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    reservation_date: '',
    reservation_time: '',
    number_of_people: '',
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
      setFormData((prevData) => ({ ...prevData, otherSport: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    if (
      !formData.sport ||
      !formData.date ||
      !formData.time ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.zip.trim()
    ) {
      setMessage('Please fill out all required fields: Sport, Address, City, State, Zip, Date, and Time.');
      setIsSubmitting(false);
      return;
    }

    if (formData.sport === 'Other' && !formData.otherSport.trim()) {
      setMessage('Please enter the sport name if you selected "Other".');
      setIsSubmitting(false);
      return;
    }

    const finalSport = formData.sport === 'Other' ? formData.otherSport.trim() : formData.sport;
    const peopleCount = formData.peopleNeeded ? parseInt(formData.peopleNeeded, 10) : null;

    const dataToSend = {
      username: formData.username,
      sport: finalSport,
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state,
      zip: formData.zip.trim(),
      reservation_date: formData.date,
      reservation_time: formData.time,
      number_of_people: peopleCount,
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
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Head>
        <title>Post a Game</title>
      </Head>
      <Typography variant="h4" component="h1" gutterBottom>
        Post a Game to Find Players
      </Typography>

      <Typography sx={{ mb: 3 }}>
        Posting as: <strong>{formData.username}</strong>
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth required>
          <InputLabel id="sport-label">Choose Sport</InputLabel>
          <Select
            labelId="sport-label"
            id="sport"
            name="sport"
            value={formData.sport}
            label="Sport"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>-- Select a Sport --</em>
            </MenuItem>
            {sportsOptions.map((sport) => (
              <MenuItem key={sport} value={sport}>
                {sport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {formData.sport === 'Other' && (
          <TextField
            label="Please provide the sport"
            name="otherSport"
            value={formData.otherSport}
            onChange={handleChange}
            required
            fullWidth
          />
        )}

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          fullWidth
          placeholder="Enter the game court location"
        />

        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="state-label">State </InputLabel>
          <Select
            labelId="state-label"
            id="state"
            name="state"
            value={formData.state}
            label="State"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Select State</em>
            </MenuItem>
            {stateAbbreviations.map((abbr) => (
              <MenuItem key={abbr} value={abbr}>
                {abbr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Zip Code"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          fullWidth
        />

        <Box>
          <InputLabel sx={{ mb: 1 }}>Time</InputLabel>
          <TimePicker
            onChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
            value={formData.time}
            disableClock={true}
            clearIcon={null}
            format="HH:mm"
            className="form-input"
          />
        </Box>

        <FormControl fullWidth>
        <InputLabel id="peopleNeeded-label">Total People Needed (Optional)</InputLabel>
        <Select
            labelId="peopleNeeded-label"
            id="peopleNeeded"
            name="peopleNeeded"
            value={formData.peopleNeeded}
            label="Total People Needed (Optional)"
            onChange={handleChange}
        >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {[...Array(100).keys()].map((num) => (
            <MenuItem key={num + 1} value={num + 1}>
                {num + 1}
            </MenuItem>
            ))}
        </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Game'}
        </Button>
      </Box>

      {message && (
        <Typography sx={{ mt: 2, color: message.startsWith('Game successfully') ? 'green' : 'error.main' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
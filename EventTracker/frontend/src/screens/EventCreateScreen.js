import React, { useState } from 'react';
import { Calendar as CalendarIcon, Image as ImageIcon } from 'lucide-react';

const EventCreateScreen = ({ onNavigate }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);  // base64
    reader.readAsDataURL(file);
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!description.trim()) newErrors.description = 'Description is required';

    if (!date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      if (selectedDate < tomorrow) {
        newErrors.date = 'Date must be at least tomorrow';
      }
    }

    return newErrors;
  };

  const handleCreateEvent = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const newEvent = {
      id: Date.now().toString(),
      title,
      location,
      date,
      description,
      image
    };

    try {
      const res = await fetch('http://localhost:8080/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });

      if (!res.ok) throw new Error('Failed to create event');
      onNavigate('EventFeed');
    } catch (err) {
      console.error('Create failed', err);
      alert('Failed to create event (check backend).');
    }
  };

  return (
    <div className="min-h-screen bg-red-700 p-6 pb-24">
      <h1 className="text-4xl font-bold text-black mb-8">Create an Event</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* Title */}
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Name"
            className={`w-full bg-white rounded-lg px-4 py-3 text-lg shadow-md ${errors.title ? 'border-2 border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

          {/* Location */}
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            type="text"
            placeholder="Location"
            className={`w-full bg-white rounded-lg px-4 py-3 text-lg shadow-md ${errors.location ? 'border-2 border-red-500' : ''}`}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

          {/* Date */}
          <div className={`bg-white rounded-xl p-4 shadow-md w-fit ${errors.date ? 'border-2 border-red-500' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium">Enter date</span>
              <CalendarIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="border border-purple-500 rounded px-2 py-1 w-full max-w-[200px]">
              <span className="text-xs text-purple-600 block -mt-3 bg-white w-fit px-1">Date</span>
              <input
                value={date}
                onChange={e => setDate(e.target.value)}
                type="date"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

          {/* Description */}
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            rows={5}
            className={`w-full bg-white rounded-lg px-4 py-3 text-lg shadow-md ${errors.description ? 'border-2 border-red-500' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Right side: Image Upload */}
        <div className="flex-1 space-y-6 flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="w-full max-w-xs h-56 bg-white rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer"
          >
            {image ? (
              <img src={image} alt="preview" className="h-full w-full object-cover rounded-xl" />
            ) : (
              <>
                <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500">Click to add image</p>
              </>
            )}
          </label>

          <button
            onClick={handleCreateEvent}
            className="w-full max-w-xs bg-white text-black text-lg font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCreateScreen;

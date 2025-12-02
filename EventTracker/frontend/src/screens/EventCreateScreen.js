import React, { useState } from 'react';
import { Calendar as CalendarIcon, Image as ImageIcon } from 'lucide-react';

const EventCreateScreen = ({ onNavigate }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);   // <-- must be inside component

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);  // base64
    };
    reader.readAsDataURL(file);
  };

  const handleCreateEvent = async () => {
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
          <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Name" className="w-full bg-white rounded-lg px-4 py-3 text-lg shadow-md" />
          <input value={location} onChange={e => setLocation(e.target.value)} type="text" placeholder="Location" className="w-full bg-white rounded-lg px-4 py-3 text-lg shadow-md" />

          <div className="bg-white rounded-xl p-4 shadow-md w-fit">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium">Enter date</span>
              <CalendarIcon className="w-5 h-5 text-gray-600" />
            </div>

            <div className="border border-purple-500 rounded px-2 py-1 w-full max-w-[200px]">
              <span className="text-xs text-purple-600 block -mt-3 bg-white w-fit px-1">Date</span>
              <input value={date} onChange={e => setDate(e.target.value)} type="date" className="w-full outline-none text-sm" />
            </div>
          </div>

          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows={5} className="w-full bg-white rounded-lg px-4 py-3 text-lg shadow-md" />
        </div>

        <div className="flex-1 space-y-6 flex flex-col items-center">
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
          />

          {/* Clickable Image Box */}
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

          {/* Add Event Button */}
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

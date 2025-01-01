import React, { useState } from 'react';
import { Calendar, Clock, Users, Globe } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Vertalingen voor alle tekst
const translations = {
  nl: {
    title: 'Reserveer uw Paardenkoetsrit',
    timeError: 'Reserveringen zijn alleen mogelijk tussen 10:00 en 17:00',
    sharedRide: 'Gedeelde rit (€15 p.p.)',
    privateRide: 'Privé rit (€120)',
    rideType: 'Type Rit',
    person: 'persoon',
    persons: 'personen',
    name: 'Naam',
    email: 'E-mail',
    phone: 'Telefoonnummer',
    submit: 'Reservering Plaatsen',
    selectTime: 'Selecteer tijd',
    hourError: 'Reserveringen alleen mogelijk op het hele uur'
  },
  en: {
    title: 'Book your Horse Carriage Ride',
    timeError: 'Bookings are only possible between 10:00 and 17:00',
    sharedRide: 'Shared ride (€15 p.p.)',
    privateRide: 'Private ride (€120)',
    rideType: 'Ride Type',
    person: 'person',
    persons: 'persons',
    name: 'Name',
    email: 'Email',
    phone: 'Phone number',
    submit: 'Place Booking',
    selectTime: 'Select time',
    hourError: 'Bookings only possible on the hour'
  },
  de: {
    title: 'Buchen Sie Ihre Pferdekutschenfahrt',
    timeError: 'Buchungen sind nur zwischen 10:00 und 17:00 Uhr möglich',
    sharedRide: 'Gemeinsame Fahrt (€15 p.P.)',
    privateRide: 'Private Fahrt (€120)',
    rideType: 'Fahrt Typ',
    person: 'Person',
    persons: 'Personen',
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefonnummer',
    submit: 'Buchung Aufgeben',
    selectTime: 'Zeit auswählen',
    hourError: 'Buchungen nur zur vollen Stunde möglich'
  }
};

// Beschikbare tijden
const availableTimes = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const BookingForm = () => {
  const [language, setLanguage] = useState('nl');
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    type: 'shared',
    persons: 1,
    name: '',
    email: '',
    phone: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate time between 10:00 and 17:00
    const bookingTime = parseInt(bookingData.time.split(':')[0]);
    if (bookingTime < 10 || bookingTime >= 17) {
      setAlertMessage(t.timeError);
      setShowAlert(true);
      return;
    }
    // Handle form submission
    console.log('Booking submitted:', bookingData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <div className="flex items-center space-x-2">
          <Globe className="text-gray-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="nl">Nederlands</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
      
      {showAlert && (
        <Alert className="mb-4 bg-red-50">
          <AlertDescription>
            {alertMessage}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-400" />
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="text-gray-400" />
            <select
              value={bookingData.time}
              onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">{t.selectTime}</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">{t.rideType}</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="shared"
                  checked={bookingData.type === 'shared'}
                  onChange={(e) => setBookingData({
                    ...bookingData,
                    type: e.target.value
                  })}
                />
                <span>{t.sharedRide}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="private"
                  checked={bookingData.type === 'private'}
                  onChange={(e) => setBookingData({
                    ...bookingData,
                    type: e.target.value
                  })}
                />
                <span>{t.privateRide}</span>
              </label>
            </div>
          </div>

          {bookingData.type === 'shared' && (
            <div className="flex items-center space-x-2">
              <Users className="text-gray-400" />
              <select
                value={bookingData.persons}
                onChange={(e) => setBookingData({
                  ...bookingData,
                  persons: parseInt(e.target.value)
                })}
                className="w-full p-2 border rounded"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? t.person : t.persons}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder={t.name}
              value={bookingData.name}
              onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder={t.email}
              value={bookingData.email}
              onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              placeholder={t.phone}
              value={bookingData.phone}
              onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {t.submit}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

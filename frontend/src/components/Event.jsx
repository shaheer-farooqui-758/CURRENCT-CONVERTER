import React, { useState } from "react";
import "./Event.css"; // Import the CSS

const events = [
  {
    title: "Independence Day 2025",
    images: ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg","/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg"],
  },
  {
    title: "Teacher's Appreciation Ceremony",
    images: ["/gallery/4.jpg", "/gallery/5.jpg", "/gallery/1.jpg"],
  },
  {
    title: "Disability Awareness Walk",
    images: ["/gallery/2.jpg", "/gallery/3.jpg", "/gallery/4.jpg"],
  },
];

const EventGallery = () => {
  const [popupImage, setPopupImage] = useState(null);

  return (
    <div className="event-gallery">
      <h1 className="gallery-title">📸 Event Gallery</h1>

      {events.map((event, idx) => (
        <div key={idx} className="event-section">
          <h2 className="event-title">{event.title}</h2>

          <div className="image-row">
            {event.images.map((img, i) => (
              <div key={i} className="image-card" onClick={() => setPopupImage(img)}>
                <img src={img} alt={`Event ${idx + 1} - Image ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Fullscreen Popup */}
      {popupImage && (
        <div className="popup" onClick={() => setPopupImage(null)}>
          <img src={popupImage} alt="Full View" className="popup-img" />
          <span className="close-btn" onClick={() => setPopupImage(null)}>&times;</span>
        </div>
      )}
    </div>
  );
};

export default EventGallery;

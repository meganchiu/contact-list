import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    // Async function to fetch individual contact information
    async function fetchContact() {
      try {
        const response = await fetch(`https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact");
        }
        const data = await response.json();
        setContact(data);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    }
    
    if (selectedContactId) {
      fetchContact();
    }
  }, [selectedContactId]);

  if (!contact) {
    return <p>Loading contact details...</p>;
  }

  return (
    <div>
      <h2>Contact Details</h2>
      <p><strong>Name:</strong> {contact.name}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Company:</strong> {contact.company.name}</p>
      <p><strong>Website:</strong> {contact.website}</p>
      <p><strong>Address:</strong> {contact.address.street}, {contact.address.city}</p>
      <button onClick={() => setSelectedContactId(null)}>Go Back to Contact List</button>
    </div>
  );
}

export default SelectedContact;
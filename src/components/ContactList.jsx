import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ContactRow from "./ContactRow";

function ContactList({setSelectedContactId}) {
  const [contacts, setContacts] = useState([])

  useEffect(()=>{
    // Async function to fetch the data from the API
    async function fetchContacts() {
      try {
        const response = await fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users');
        const data = await response.json();
        console.log("fetched contacts => ", data)
        setContacts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchContacts();
  },[])

  // console.log("Contacts:", contacts);

  return (
    <table>
    <thead>
      <tr>
        <th colSpan="3">Contact List</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name</td>
        <td>Email</td>
        <td>Phone</td>
      </tr>
      {contacts.map((contact) => (
          <ContactRow key={contact.id} contact={contact} setSelectedContactId={setSelectedContactId} />
        ))}
    </tbody>
  </table>
  )
}

export default ContactList;
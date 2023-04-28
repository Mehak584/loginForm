import React from "react";
import { AiFillEdit,AiTwotoneDelete } from 'react-icons/ai';


const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
         <AiFillEdit />
        </button>
        <button  type="button" onClick={() => handleDeleteClick(contact.id)}>
          <AiTwotoneDelete />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;

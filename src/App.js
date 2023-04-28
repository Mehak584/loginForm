import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const resetButton = (event) => {
    event.preventDefault();

    setAddFormData({
      fullName: '',
      address: '',
      phoneNumber: '',
      email: '',
    });
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);

    localStorage.setItem("userInfo", JSON.stringify(newContacts))
  };



  const handleEditFormSubmit = (event) => {
    event.preventDefault(resetButton);

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
    localStorage.setItem("userInfo", JSON.stringify(newContacts))
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);


  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
    localStorage.setItem("userInfo", JSON.stringify(newContacts))

  };

  const searchFilter = () => {
    const newContacts = contacts.filter((key) => {
      if (key?.fullName?.includes(search) || (key?.address?.includes(search) || (key?.phoneNumber?.includes(search) || (key?.email?.includes(search))))) {
        return key;
      }
    })
    setContacts(newContacts);
  }

  const resetFilter = () => {
    const originalData = JSON.parse(localStorage.getItem("userInfo"));
    setContacts(originalData)
  }

  return (
    <div className="app-container">
      <div className="app">
        <div className="login-form">
          <h1 className="formTitle">Form Details</h1>
          <form onSubmit={handleAddFormSubmit}>
            <div className="form">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div>
                  <div className="input-container">
                    <label>Full Name </label>
                    <input
                      type="text"
                      name="fullName"
                      required="required"
                      placeholder="Enter a name..."
                      value={addFormData.fullName}
                      onChange={handleAddFormChange}
                    />
                  </div>
                  <div className="input-container">
                    <label>Address </label>
                    <input
                      type="text"
                      name="address"
                      required="required"
                      placeholder="Enter an addres..."
                      value={addFormData.address}
                      onChange={handleAddFormChange}
                    />
                  </div>

                </div>
                <div>
                  <div className="input-container">
                    <label>Email Id</label>
                    <input
                      type="email"
                      name="email"
                      required="required"
                      placeholder="Enter an email..."
                      value={addFormData.email}
                      onChange={handleAddFormChange}
                    />
                  </div>

                  <div className="input-container">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      required="required"
                      placeholder="Enter a phone number..."
                      value={addFormData.phoneNumber}
                      onChange={handleAddFormChange}
                    />
                  </div>
                </div>
              </div>
              <div className="buttonWrap">
                
                  <button className="btnBoxx" type="submit">Submit</button>
                
               
                  <button className="btnBoxx" onClick={resetButton} >Reset</button>
                
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="buttons">
        <input
        className="inputField"
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
        />
        <button className="btnBox" onClick={() => {
          searchFilter()
        }}>Submit</button>
        <button className="btnBox" onClick={() => {
          resetFilter()
        }}>Reset</button>
      </div>

      <div>

      </div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>


    </div>
  );
};

export default App;

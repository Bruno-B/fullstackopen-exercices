import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const personObject = {
    name: newName,
    number: newNumber,
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (persons.filter((person) => person.name === personObject.name).length) {
      alert(`${personObject.name} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
    }
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }
  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  function handleSearchChange(e) {
    setNewSearch(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input value={newSearch} onChange={handleSearchChange} />
      <h2>Add a new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>  

      {(newSearch.length > 0) ? persons.filter((person) => {
         return person.name.toLowerCase().includes(newSearch)
        
      }).map((p)=> {
          return <p key = {p.name}> {p.name}{p.number} </p>
      }) : persons.map((person)=>{
          return <p key = {person.name}> {person.name}{person.number} </p>
      }) }
    </div>
  );
};

export default App;


 
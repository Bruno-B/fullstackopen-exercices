import React, { useState, useEffect } from "react";
import personService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.filter((person) => person.name === personObject.name).length) {
      
      if(window.confirm(`${newName} is already added to the phonebook,replace the old number with a new one?`)){
       const id = (persons.find((p)=> p.name === newName)).id;
       personService.update(id,personObject);
      }
    } else {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("")
      });
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

  function handleDelete(person){
    if(window.confirm(`Delete ${person.name}? `)){
      personService.del(person.id);
    } 
    

  }

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  },);

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add a new</h2>

      <Form
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Filter persons={persons} newSearch={newSearch} handleDelete = {handleDelete} />
    </div>
  );
};

const Form = ({
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
  handleSubmit,
}) => {
  return (
    <div>
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
    </div>
  );
};

const Filter = ({ persons, newSearch , handleDelete }) => {
  return (
    <div>
      {newSearch.length > 0
        ? persons
            .filter((person) => {
              return person.name
                .toLowerCase()
                .includes(newSearch.toLowerCase());
            })
            .map((p) => {
              console.log(p);
              return (
                <p key={p.name}>
                  {p.name} {p.number}
                </p>
              );
            })
        : persons.map((person) => {
            return (
              <p key={person.name}>
                {person.name} {person.number}
                <button onClick= {(()=>{handleDelete(person)})} >DELETE</button>
              </p>
            );
          })}
    </div>
  );
};

const Phonebook = ({ newSearch, handleSearchChange }) => {
  return <input value={newSearch} onChange={handleSearchChange} />;
};

export default App;

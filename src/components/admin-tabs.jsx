import React, { useState } from "react";
import { Pane, Heading, Button, TextInput, toaster, Dialog, TabNavigation, Tab } from "evergreen-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function AdminTabs({
  movies,
  searchTerm,
  handleSearchChange,
  handleMovieSelect,
  selectedMovieId,
  handleDelete,
  handleUpdate,
  handleInsert
}) {
  const [activeTab, setActiveTab] = useState("insert");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState("");

  const handleInputFocus = () => setShowSuggestions(true);
  const handleInputBlur = () => setTimeout(() => setShowSuggestions(false), 100);
  const handleMovieClick = (movieId) => {
    handleMovieSelect(movieId);
    setShowSuggestions(false);
    setEditedMovie(movies.find(movie => movie._id === movieId));
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    setDialogAction("edit");
    setShowDialog(true);
  };

  const handleConfirmAction = () => {
    if (dialogAction === "delete") {
      handleDelete();
    } else if (dialogAction === "edit") {
      handleUpdate(editedMovie);
      setIsEditing(false);
    } else if (dialogAction === "insert") {
      handleInsert(JSON.parse(jsonInput));
      setJsonInput("");
    }
    setShowDialog(false);
  };

  const renderMovieDetails = (movie) => (
    <div className="flex">
      <img src={movie.poster} alt={movie.title} className="w-1/3 object-cover" />
      <div className="w-2/3 pl-4 text-white">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p><span className="font-semibold">Director:</span> {movie.director}</p>
        <p><span className="font-semibold">IMDB Rating:</span> {movie.imdbRating}</p>
        <p><span className="font-semibold">Overview:</span> {movie.overview}</p>
        <p><span className="font-semibold">Genres:</span> {movie.genres.join(', ')}</p>
        <p><span className="font-semibold">Cast:</span> {movie.cast.join(', ')}</p>
        <div>
          <span className="font-semibold">Awards:</span>
          {movie.awards.winner.map((award, index) => (
            <p key={index}>Winner: {award.award} - {award.category}</p>
          ))}
          {movie.awards.nominated.map((award, index) => (
            <p key={index}>Nominated: {award.award} - {award.category}</p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Pane className="bg-white text-black p-6">
      <TabNavigation>
        {['Insert', 'Delete', 'Modify'].map((tab) => (
          <Tab
            key={tab}
            id={tab.toLowerCase()}
            isSelected={activeTab === tab.toLowerCase()}
            onSelect={() => setActiveTab(tab.toLowerCase())}
            className="text-black"
          >
            {tab}
          </Tab>
        ))}
      </TabNavigation>

      <Pane className="mt-4">
        {activeTab === "insert" && (
          <Pane>
            <Heading size={600} marginBottom={16} className="text-black">Insert New Movie</Heading>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Enter movie data in JSON format"
              className="w-full h-64 p-2 bg-white border-gray-800 border-2 text-black rounded"
            />
            <Button
              appearance="primary"
              intent="success"
              onClick={() => {
                setDialogAction("insert");
                setShowDialog(true);
              }}
              className="mt-4"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Insert
            </Button>
          </Pane>
        )}

        {(activeTab === "delete" || activeTab === "modify") && (
          <Pane>
            <Heading size={600} marginBottom={16} className="text-black">
              {activeTab === "delete" ? "Delete Movie" : "Modify Movie"}
            </Heading>
            <TextInput
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              width="100%"
              className="bg-white text-black"
            />
            
            {showSuggestions && (
              <Pane className="bg-white border text-black border-gray-700 mt-1 rounded">
                <ul>
                  {movies.map(movie => (
                    <li 
                      key={movie._id}
                      onClick={() => handleMovieClick(movie._id)}
                      className="p-2 hover:bg-gray-700 cursor-pointer text-black"
                    >
                      {movie.title}
                    </li>
                  ))}
                </ul>
              </Pane>
            )}

            {selectedMovieId && (
              <Pane className="mt-4">
                {isEditing ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveClick();
                  }}>
                    {/* Render editable fields here */}
                    {/* Example: */}
                    <TextInput
                      value={editedMovie.title}
                      onChange={(e) => setEditedMovie({...editedMovie, title: e.target.value})}
                      className="mb-2 bg-white text-black"
                    />
                    {/* Add more editable fields as needed */}
                    <Button appearance="primary" intent="warning" type="submit">
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <>
                    {renderMovieDetails(movies.find(movie => movie._id === selectedMovieId))}
                    <div className="mt-4 flex justify-end">
                      {activeTab === "modify" && (
                        <Button appearance="primary" intent="warning" onClick={handleEditClick} className="mr-2">
                          <FontAwesomeIcon icon={faEdit} className="mr-2" />
                          Edit
                        </Button>
                      )}
                      {activeTab === "delete" && (
                        <Button
                          appearance="primary"
                          intent="danger"
                          onClick={() => {
                            setDialogAction("delete");
                            setShowDialog(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </Pane>
            )}
          </Pane>
        )}
      </Pane>

      <Dialog
        isShown={showDialog}
        title={`Confirm ${dialogAction}`}
        intent={dialogAction === "delete" ? "danger" : dialogAction === "edit" ? "warning" : "success"}
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel={dialogAction === "delete" ? "Delete" : dialogAction === "edit" ? "Save" : "Insert"}
        onConfirm={handleConfirmAction}
      >
        Are you sure you want to {dialogAction} this movie?
      </Dialog>
    </Pane>
  );
}

export default AdminTabs;
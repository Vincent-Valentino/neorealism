import React, { useState } from 'react';
import { SelectMenu, Button, Pane, TagInput, Text, Heading } from 'evergreen-ui';

const AwardsInput = () => {
  // List of popular awards
  const awardsOptions = [
    'Academy Awards',
    'Cannes Film Festival',
    'Golden Globe Awards',
    'BAFTA Awards',
    'Screen Actors Guild Awards',
    'Critics\' Choice Awards',
    'Venice Film Festival',
    'Berlin International Film Festival',
    'Sundance Film Festival',
    'Toronto International Film Festival'
  ];

  // Award categories based on selection
  const categoriesOptions = {
    'Academy Awards': [
      'Best Picture', 'Best Director', 'Best Actor', 'Best Actress',
      'Best Supporting Actor', 'Best Supporting Actress', 'Best Screenplay'
    ],
    'Cannes Film Festival': [
      'Palme d\'Or', 'Grand Prix', 'Best Director', 'Best Actor', 'Best Actress'
    ],
    'Golden Globe Awards': [
      'Best Motion Picture - Drama', 'Best Motion Picture - Musical or Comedy',
      'Best Director', 'Best Actor - Drama', 'Best Actress - Drama'
    ],
    'BAFTA Awards': [
      'Best Film', 'Best Director', 'Best Actor', 'Best Actress', 'Best Supporting Actor'
    ],
    // Add more categories for other awards...
  };

  const statusOptions = ['Nominated', 'Winner'];

  // State to manage selection
  const [selectedAward, setSelectedAward] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [awardsList, setAwardsList] = useState([]);

  // Function to add the selected award to the list
  const addAward = () => {
    if (selectedAward && selectedCategory && selectedStatus) {
      const newAward = `${selectedAward} - ${selectedCategory} (${selectedStatus})`;
      setAwardsList([...awardsList, newAward]);

      // Reset selections
      setSelectedAward(null);
      setSelectedCategory(null);
      setSelectedStatus(null);
    }
  };

  return (
    <Pane>
      <Heading size={400} marginBottom={16}>Select Awards</Heading>
      
      {/* Award Selection */}
      <SelectMenu
        title="Select Award"
        options={awardsOptions.map((label) => ({ label, value: label }))}
        selected={selectedAward}
        onSelect={(item) => {
          setSelectedAward(item.value);
          setSelectedCategory(null);  // Reset category when award changes
        }}
      >
        <Button>{selectedAward ? selectedAward : 'Select Award...'}</Button>
      </SelectMenu>

      {/* Category Selection */}
      {selectedAward && (
        <SelectMenu
          title="Select Category"
          options={categoriesOptions[selectedAward].map((label) => ({ label, value: label }))}
          selected={selectedCategory}
          onSelect={(item) => setSelectedCategory(item.value)}
        >
          <Button marginLeft={8}>
            {selectedCategory ? selectedCategory : 'Select Category...'}
          </Button>
        </SelectMenu>
      )}

      {/* Status Selection */}
      {selectedCategory && (
        <SelectMenu
          title="Select Status"
          options={statusOptions.map((label) => ({ label, value: label }))}
          selected={selectedStatus}
          onSelect={(item) => setSelectedStatus(item.value)}
        >
          <Button marginLeft={8}>
            {selectedStatus ? selectedStatus : 'Select Status...'}
          </Button>
        </SelectMenu>
      )}

      {/* Add Button */}
      {selectedAward && selectedCategory && selectedStatus && (
        <Button marginLeft={8} appearance="primary" onClick={addAward}>
          Add Award
        </Button>
      )}

      {/* Display Selected Awards */}
      {awardsList.length > 0 && (
        <Pane marginTop={16}>
          <Heading size={400} marginBottom={8}>Selected Awards:</Heading>
          <TagInput
            values={awardsList}
            onRemove={(value, index) => {
              const newAwardsList = awardsList.filter((_, i) => i !== index);
              setAwardsList(newAwardsList);
            }}
          />
        </Pane>
      )}
    </Pane>
  );
};

export default AwardsInput;

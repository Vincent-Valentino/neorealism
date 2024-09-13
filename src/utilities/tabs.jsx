import React from 'react';
import { Pane, Tablist, Tab } from 'evergreen-ui';

const Tabs = ({ tabs, content }) => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  return (
    <Pane>
      <Tablist marginBottom={16} marginRight={24}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            isSelected={index === selectedTabIndex}
            onSelect={() => setSelectedTabIndex(index)}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
      <Pane padding={16} background="tint1" flex="1">
        {content[selectedTabIndex]}
      </Pane>
    </Pane>
  );
};

export default Tabs;

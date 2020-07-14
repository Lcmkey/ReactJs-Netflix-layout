import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import movieRequest from "./../queries/movieRequest";

import Row from "./Row";
import Nav from "./Nav";
import Banner from "./Banner";

const largeRowList = ["NEXTFLIX ORIGINALS"];

const App = () => {
  const renderContent = () => {
    return movieRequest.map((request, index) => {
      const { title, path } = request;
      const isLargeRow = largeRowList.includes(title);

      return (
        <Row
          key={index}
          title={title}
          fetchUrl={path}
          isLargeRow={isLargeRow}
        />
      );
    });
  };

  return (
    <div className="app">
      <Nav />
      <Banner />

      {renderContent()}
    </div>
  );
};

export default App;

import React from 'react';
import styled from 'styled-components';
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import TilePage from './Tiles/TilePage';
import DistributionTest from './Util/DistributionTest';
import {ColumnContainer} from './Components/elements';
import WaveFunctionPage from './WaveFunctionPage';

const NavHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  
  & > * {
    background-color: darkgrey;
    padding: 8px 16px;
  }
`;

function App() {
  return (
    <div className="App">
      <ColumnContainer style={{ width: '100%', height: '100%' }}>
        <NavHeader>
          <Link to="/probability">Probability</Link>
          <Link to="/tileset">Tileset view</Link>
          <Link to="/wavefunction">Wave Function</Link>
        </NavHeader>
        <Routes>
          <Route path="/probability" element={<DistributionTest />} />
          <Route path="/tileset" element={<TilePage />} />
          <Route
            path="/wavefunction"
            element={<WaveFunctionPage />}
          />
          <Route path="*" element={<Navigate to="/wavefunction" replace />} />
        </Routes>
      </ColumnContainer>
    </div>
  );
}

export default App;

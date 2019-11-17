import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { BlurBackground } from '../components/commons';
import GlobalPlayer from '../containers/GlobalPlayer';
import Header from './Header';
import { useGlobalPlayerSong } from '../hooks';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainWrapper = styled.main`
  position: relative;
`;

const BlurBackgroundStyled = styled(BlurBackground)`
  position: fixed;
  top: 0;
  left: 0;
`;

const Layout = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const onExpanded = useCallback(value => setExpanded(value), [setExpanded]);

  return (
    <Wrapper>
      <Header style={{ display: expanded ? 'none' : null }} />
      <MainWrapper
        className="flex-1"
        style={{
          display: expanded ? 'none' : null,
        }}
      >
        {children}
      </MainWrapper>
      <BlurBackgroundStyled />
      <GlobalPlayer onExpanded={onExpanded} />
    </Wrapper>
  );
};

export default Layout;

import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

import { getPageY } from '../utils';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  font-size: 1.125rem;
  line-height: 1.25em;
  word-spacing: 0.125em;
  overflow: hidden;
`;

const LyricWrapper = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: overlay;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
  mask-image: -webkit-linear-gradient(top,hsla(0,0%,100%,0),hsla(0,0%,100%,.6) 15%,#fff 25%,#fff 75%,hsla(0,0%,100%,.6) 85%,hsla(0,0%,100%,0));

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; 
  }

  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, rgba(141, 141, 141, 0.35), rgba(141, 141, 141, 0.5), rgba(141, 141, 141, 0.35));
    border-radius: 999px;
  }
`;

const LyricTextStyled = styled.p`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0 0.5em;
  line-height: 1.5em;

  &.--active {
    font-weight: 400;
  }
`;

const LyricText = ({ className, isActive, parentRef, children }) => {
  const ref = useRef();

  const handleScrollToMiddle = useCallback(() => {
    parentRef.current.scrollTo({
      top: getPageY(ref.current) - getPageY(parentRef.current) - 200,
      behavior: 'smooth',
    });
  }, [parentRef, ref]);

  useEffect(() => {
    if (isActive) {
      handleScrollToMiddle();
    }
  }, [isActive]);

  return (
    <LyricTextStyled className={cn({ '--active': isActive }, className)} ref={ref}>
      {children}
    </LyricTextStyled>
  );
}

const SongKaraoke = ({ className, lyric, currentTime }) => {
  const lyricWrapperRef = useRef();
  const isHasLyric = useMemo(() => !!lyric.length, [lyric.length]);

  return (
    <Wrapper className={className}>
      <LyricWrapper ref={lyricWrapperRef}>
        <li>
          <p style={{ height: '2rem' }} />
        </li>
        {lyric.map((item, idx) => (
          <li key={idx}>
            <LyricText
              className="__lyric-line" 
              parentRef={lyricWrapperRef}
              isActive={item.timeStart <= currentTime && item.timeEnd >= currentTime}
            >
              {item.text}
            </LyricText>
          </li>
        ))}
        {!isHasLyric && (
          <li>
            <LyricText className="__lyric-line" >Lời bài hát đang được cập nhật</LyricText>
          </li>
        )}
        <li>
          <p style={{ height: '2rem' }} />
        </li>
      </LyricWrapper>
    </Wrapper>
  );
};

SongKaraoke.displayName = 'SongKaraoke';
SongKaraoke.propTypes = {
  className: PropTypes.string,
  lyric: PropTypes.array,
  currentTime: PropTypes.number,
};
SongKaraoke.defaultProps = {
  lyric: [],
  currentTime: 0,
};

export default SongKaraoke;

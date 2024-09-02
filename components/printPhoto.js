import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled, { keyframes, css } from 'styled-components';
import { ItemTypes } from '../types/ItemTypes';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useImageStorage } from '../contexts/ImageStorageContext';

const fillCircle = keyframes`
  0% {
    transform: scale(90%);
    border-radius: 25%;
  }
  100% {
    transform: scale(100%);
    border-radius: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}`;

const Photo = styled.div`
  width: calc(50% - 10px);
  height: 152px;
  background-size: contain;
  background-image: ${(props) => (props.backgroundImage ? `url(${props.backgroundImage})` : 'none')};
  opacity: ${(props) => (props.isDragging ? 0.8 : 1)};

  img {
    max-width: 100%;
  }
`;

const Image = styled.img`
  ${({ useAnimation, useFadeAnimation }) =>
    useAnimation &&
    css`
      animation: ${useFadeAnimation ? fadeIn : fillCircle} 0.5s ease-in-out;
    `}
`;

export default function PrintPhoto({ image, blockIndex, index }) {
  const ref = useRef(null);

  const { onSwap } = useImageStorage();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { blockIndex, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [_, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: (item) => onSwap(item, { blockIndex, index }),
  }));

  drag(drop(ref));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <Photo
      ref={ref}
      isDragging={isDragging}
      backgroundImage={image.backgroundImage}
    >
      <Image
        key={image.url}
        src={image.url}
        useAnimation={image.isAnimation}
        useFadeAnimation={image.isFadeAnimation}
        alt=""
      />
    </Photo>
  );
}

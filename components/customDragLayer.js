import React, { useMemo } from 'react';
import { useDragLayer } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from '../types/ItemTypes';
import { useImageStorage } from '../contexts/ImageStorageContext';

const DragLayerContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const DraggableItem = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid white;
  background-size: cover;
  transform: translate(-50%, -50%);
`;

const getItemStyles = (currentOffset) => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    item,
    currentOffset,
  } = useDragLayer((monitor) => ({
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
  }));

  const { data } = useImageStorage();

  const imageUrl = useMemo(() => {
    return itemType === ItemTypes.IMAGE
      ? data[item.blockIndex].images[item.index].url
      : null;
  }, [data, item, itemType]);

  if (!isDragging) {
    return null;
  }

  return (
    <DragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {itemType === ItemTypes.IMAGE && (
          <DraggableItem style={{ backgroundImage: `url(${imageUrl})` }} />
        )}
      </div>
    </DragLayerContainer>
  );
};

export default CustomDragLayer;

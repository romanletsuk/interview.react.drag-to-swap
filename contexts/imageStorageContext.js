import React, { createContext, useState, useContext, useCallback } from 'react';

const initialData = [
  {
    title: "Front Print",
    images: [{
      url: "https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080",
      backgroundImage: null,
      isAnimation: false,
      isFadeAnimation: false,
    }],
  },
  {
    title: "Page 2",
    images: [{
      url: "https://videodelivery.net/9ad2bb839e4e3cc1074e5d73b0a0379b/thumbnails/thumbnail.jpg?height=1080",
      backgroundImage: null,
      isAnimation: false,
      isFadeAnimation: false,
    }, {
      url: "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/bde5b129-52ba-4f43-b3f4-97591952ea00/large",
      backgroundImage: null,
      isAnimation: false,
      isFadeAnimation: false,
    }],
  },
  {
    title: "Page 3",
    images: [{
      url: "https://videodelivery.net/91097538e177847ebeb934a492e146e9/thumbnails/thumbnail.jpg?height=1080",
      backgroundImage: null,
      isAnimation: false,
      isFadeAnimation: false,
    }, {
      url: "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/b73c2865-7a02-408b-654d-89ce2512ae00/large",
      backgroundImage: null,
      isAnimation: false,
      isFadeAnimation: false,
    }],
  },
];

// Create the context
const ImageStorageContext = createContext();

// Create the provider component
const ImageStorageProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const onSwap = useCallback((sourceItem, targetItem) => {
    if (sourceItem.blockIndex === targetItem.blockIndex && sourceItem.index === targetItem.index) {
      return;
    }
    const newData = [...data];
    const sourceImages = [...newData[sourceItem.blockIndex].images];
    const targetImages = sourceItem.blockIndex !== targetItem.blockIndex
      ? [...newData[targetItem.blockIndex].images]
      : sourceImages;
    const [removed] = targetImages.splice(targetItem.index, 1, {
      ...sourceImages[sourceItem.index],
      isAnimation: true,
      isFadeAnimation: false,
      backgroundImage: targetImages[targetItem.index].url
    });
    sourceImages.splice(sourceItem.index, 1, {
      ...removed,
      isAnimation: true,
      isFadeAnimation: true,
      backgroundImage: targetImages[targetItem.index].url
    });
    newData[sourceItem.blockIndex].images = sourceImages;
    newData[targetItem.blockIndex].images = targetImages;
    setData(newData);
  }, [data]);

  return (
    <ImageStorageContext.Provider value={{ data, onSwap }}>
      {children}
    </ImageStorageContext.Provider>
  );
};

// Create a custom hook to use the ImageStorageContext
const useImageStorage = () => {
  const context = useContext(ImageStorageContext);
  if (context === undefined) {
    throw new Error('useImageStorage must be used within an ImageStorageProvider');
  }
  return context;
};

export { ImageStorageProvider, useImageStorage };

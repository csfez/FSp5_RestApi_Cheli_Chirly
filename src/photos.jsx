import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Album = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { albumId } = useParams();

  const fetchMorePhotos = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_start=${photos.length}&_limit=10`);
      const data = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        fetchMorePhotos();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchInitialPhotos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_start=0&_limit=10`);
        const data = await response.json();
        setPhotos(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialPhotos();
  }, []);

  return (
    <div>
      <h1>Photo Gallery</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {photos.map((photo) => (
            <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Album;

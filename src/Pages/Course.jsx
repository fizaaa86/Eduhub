import React, { useEffect, useState } from 'react';
import CourseComponent from '../components/CourseComponent';
import Loader from '../components/common/Loader/Loader';

export default function Course({ currentUser }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return loading ? <Loader /> : <CourseComponent currentUser={currentUser} />;
}

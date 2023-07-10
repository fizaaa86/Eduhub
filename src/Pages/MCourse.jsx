import React, { useEffect, useState } from 'react';
import MCourseComponent from '../components/MCourseComponent';
import Loader from '../components/common/Loader/Loader';

export default function MCourse({ currentUser }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return loading ? <Loader /> : <MCourseComponent currentUser={currentUser} />;
}

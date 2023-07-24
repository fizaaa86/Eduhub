import React, { useState, useMemo } from "react";
import "./index.scss";
import { getVideos } from "../../../api/FirestoreAPI";
import OwnedCard from "../OwnedCard";
export default function Owned({ currentUser }) {
  const [owned, setowned] = useState([]);
  const ownedCourses = currentUser.courses;
  useMemo(() => {
    getVideos(setowned);
  }, []);
  const filteredOwned = owned.filter((myposts) => ownedCourses.includes(myposts.id));

  return (
    <div className="Owned">
      {console.log(ownedCourses)}
      {console.log(owned)}
      <p className="my-title">My courses</p>
      <div className="mycourse">
        {filteredOwned.map((myposts) => {
          return (
            <div key={myposts.id}>
              <OwnedCard posts={myposts} id={myposts.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

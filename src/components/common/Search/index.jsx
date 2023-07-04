import React,{useState,useEffect,useMemo} from 'react'
import "./index.scss";
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getStatus } from "../../../api/FirestoreAPI";
export default function Search({setsearchInput,searchInput,posts, id}) {
  let navigate = useNavigate();
  const [Courses, setCourses] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
 
  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = Courses.filter((course) => {
        return Object.values(course)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(Courses);
    }
  };
  const openCourse = (course) =>
  {
    navigate('/Course', {
      state: { id: course?.postID, email: course.userEmail },})
  };


  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getStatus(setCourses);
  }, []);
 
  return (
    <div className='search-box'>
      <input className="content-search"type='text' onChange={(event)=> setsearchInput(event.target.value)} />
    <AiOutlineSearch  className='mysearch'/>
    {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
         { filteredUsers.length === 0  ? (
           <div className='search-inner'>No Results</div>
          ):( 
            filteredUsers.map((course)=> (
          <div className='search-inner' onClick={()=> openCourse(course)}>
            <img src={course.postImage} />
            <p className='naming'>{course.CourseName}</p>
            </div>
          ))
         )}
        </div>
      )}
    

    </div>
  )
}

import React, { useState, useEffect } from "react";
import "../Sass/Cusat.scss";
import Comp from "../assets/Computer.png";
import ResourceModal from "../components/common/Resource";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { FaHandshake } from "react-icons/fa";

const CSPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [modal3Open, setModal3Open] = useState(false);
  const [Branch, setBranch] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [pdfUrls, setPdfUrls] = useState([]);
  let location = useLocation();
  let navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  useEffect(() => {
    const branchElement = document.querySelector(".Branch");
    if (branchElement) {
      setBranch(branchElement.textContent);
    }
  }, []);

  const handlePdfClick = (pdfUrl) => {
    navigate(`/materials?pdfUrl=${encodeURIComponent(pdfUrl)}`);
  };
  console.log(pdfUrls)
  useEffect(() => {
    if (selectedSemester && selectedOption) {
      const folderName = `${Branch}/${selectedSemester}/${selectedOption}`;
      const folderRef = ref(storage, folderName);
      listAll(folderRef)
        .then((response) => {
          const promises = response.items.map((item) => getDownloadURL(item));
          return Promise.all(promises);
        })
        .then((urls) => {
          setPdfUrls(urls);
        })
        .catch((error) => {
          console.log("Error fetching URLs:", error);
        });
    }
  }, [selectedSemester, selectedOption, Branch]);

  return (
    <div className="mainPage">
      <div className="Cusat-detail">
        <div className="Cusat-detail-header">
          <div className="Cusat-title">
            <div className="title">
              <div className="Cusat-cs-caption">
                <img className="comp" src={Comp} alt="Cap" />
                <p className="Branch">Computer Science And Engineering</p>
              </div>
            </div>
          </div>
        </div>
        <div className="cs-footer">
          <div className="footer-heading">Resources:</div>
          <select
            className="selection dropdown"
            value={selectedSemester}
            onChange={handleSemesterChange}
          >
            <option value="">Select a Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
          <br />
          <br />
          {selectedSemester && (
            <div>
              <select
                className="selection dropdown"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">Select an Option</option>
                <option value="QuestionPaper">Question Paper</option>
                <option value="study-materials">Study Materials</option>
              </select>
            </div>
          )}
          {selectedOption === "QuestionPaper" ? (
            <div>
              <h2 className="Branch-desc-heading">Question Papers:</h2>
              {pdfUrls.map((pdfUrl, index) => (
                <div
                  key={index}
                  className="QPbox"
                  onClick={() => handlePdfClick(pdfUrl)}
                >
                  <AiOutlineFilePdf className="pdficon" />
                  <p className="pdftags">Question Paper {index + 1}</p>
                </div>
              ))}
              {selectedSemester && (
                <button
                  className="Resources"
                  onClick={() => {
                    setModal3Open(true);
                  }}
                >
                  <FaHandshake className="handshake-icon" /> Contribute
                </button>
              )}
            </div>
          ) : selectedOption === "study-materials" ? (
            <div>
              <h2 className="Cusat-desc-heading">Study Materials:</h2>
              <div className="PDFs">
                {pdfUrls.map((pdfUrl, index) => (
                  <div
                    key={index}
                    className="Materialbox"
                    onClick={() => handlePdfClick(pdfUrl)}
                  >
                    <AiOutlineFilePdf className="pdficon" />
                    <p className="pdftags">Material {index + 1}</p>
                  </div>
                ))}
                {selectedSemester && (
                  <button
                    className="Resources"
                    onClick={() => {
                      setModal3Open(true);
                    }}
                  >
                    <FaHandshake className="handshake-icon" /> Contribute
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <ResourceModal
        modal3Open={modal3Open}
        setModal3Open={setModal3Open}
        Branch={Branch}
        progress={progress}
        selectedSemester={selectedSemester}
        selectedOption={selectedOption}
      />
    </div>
  );
};

export default CSPage;

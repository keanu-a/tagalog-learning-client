import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import Loading from '../../components/loading/Loading';

import './SectionPage.scss';

const SectionPage = () => {
  const [sectionData, setSectionData] = useState(null);
  const { sectionTitle } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSection() {
      const response = await fetch(
        `http://localhost:5000/api/v1/section/${sectionTitle}`
      );
      const foundData = await response.json();

      setSectionData(foundData.section);
    }

    fetchSection();
  }, []);

  if (!sectionData) return <Loading />;

  return (
    <div className="section-container">
      <Navbar />

      <div className="section-header">{sectionData.title}</div>

      <div className="section-lessons">
        {sectionData.lessons.map(({ title }, idx) => {
          return (
            <div key={idx} onClick={() => navigate(`${title}`)}>
              {title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionPage;
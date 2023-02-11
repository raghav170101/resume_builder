import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown, ArrowUp } from "react-feather";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

function Body() {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  
const exportData = (e) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(resumeInformation)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
};

const onJsonUpload = (e) => {
  let reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(e.target.files[0]);
}

const onReaderLoad = (e) => {
  setResumeInformation(JSON.parse(e.target.result));
}
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    // skill: "Skill",
  };
  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    // [sections.skill]: {
    //   id: sections.skill,
    //   sectionTitle: sections.skill,
    //   detail: "",
    // },
  });

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
        <div >
        <input
          id="import"
          className={styles.import_json}
          type="file"
          accept=".json"
          onChange={(event) => onJsonUpload(event)}
          />
          <label htmlFor="import" className={styles.header_button} >Import JSON <ArrowUp /> </label>
          </div>
{/* export in json */}
<div className="App">
      <button type="button" onClick={exportData}>
        Download(json)
      </button>
    </div>



        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
      </div>
      <div className={styles.font}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}

export default Body;

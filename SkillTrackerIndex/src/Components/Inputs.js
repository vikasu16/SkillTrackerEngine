import React from "react";

export default function Inputs(props) {
  const [questionTopic, setQuestionTopic] = React.useState("");
  const handleQuestionTopicChange = (event) => {
    setQuestionTopic(event.target.value);
    console.log(questionTopic);
  };
  let data = props.isTextAreaRequired;
  let inputDataType = props.inputType;
  let idValue =
    props.tittleValue.replace(/ /g, "") + "_" + props.source + "_value";
  return (
    <>
      {inputDataType === "text" ? (
        <div className="form-input">
          <span className="form-label">{props.tittleValue}:</span>
          {data === "true" ? (
            <textarea id={idValue}></textarea>
          ) : (
            <input
              type="text"
              id={idValue}
              value={questionTopic}
              onChange={handleQuestionTopicChange}
            ></input>
          )}
        </div>
      ) : (
        <div>
          <input type="checkbox" id={idValue}></input>
          <span className="form-label format-checkbox-label">
            {props.tittleValue}
          </span>
        </div>
      )}
    </>
  );
}

import { GenerateToken, ValidToken } from "../Security";

export const GetUserDetails = () => {
  if (ValidToken()) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", GenerateToken());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch("http://localhost:9090/user/getUserDetails", requestOptions);
  }
  return Promise.resolve();
};

export const GetSkills = () => {
  if (ValidToken()) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", GenerateToken());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch("http://localhost:9090/user/getSkills", requestOptions);
  }
  return Promise.resolve();
};

export const AddSkill = (data) => {
  if (ValidToken()) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", GenerateToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("http://localhost:9090/user/addSkill", requestOptions);
  }
  return Promise.resolve();
};

export const UpdateSkillRemoved = (data) => {
  if (ValidToken()) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", GenerateToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch("http://localhost:9090/user/updateSkill", requestOptions);
  }
  return Promise.resolve();
};

export const SaveBioInformation = (data) => {
  if (ValidToken()) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", GenerateToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch("http://localhost:9090/user/updateBio", requestOptions);
  }
  return Promise.resolve();
};

export const GetTasksData = (data) => {
  if (ValidToken()) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", GenerateToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(
      "http://localhost:9090/tracker/getTasksUnderRange",
      requestOptions
    );
  }
  return Promise.resolve();
};

export const AddTask = (data) => {
  if (ValidToken()) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", GenerateToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch("http://localhost:9090/tracker/save", requestOptions);
  }
  return Promise.resolve();
};

export const AddQuestion = (data) => {
  if (ValidToken()) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", GenerateToken());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(
      "http://localhost:9090/questionBank/saveQuestion",
      requestOptions
    );
  }
  return Promise.resolve();
};

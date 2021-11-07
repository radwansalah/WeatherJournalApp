/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "579f7fd9387fe122ba24e900a586b1ec";
const unit = "metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/**
 * @param {string} url: the url that we will use to call the postProjectData API at the backend
 * @param {object} data: the data which will be sent to the backend to be saved
 * @description call postProjectData API in the backend
 * @returns {object} newData: the saved data
 */
const postProjectData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content,
    }),
  });

  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description call getProjectData API in the backend to get the data
 * @returns {object} projectData: the data which is existing in the backend at the current time
 */
const getProjectData = async () => {
  const request = await fetch("/projectData");
  try {
    const projectData = await request.json();
    return projectData;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * @param {object} projectData: the data which returned from backend
 * @description update the UI with the new data from the backend
 */
const updateUI = (projectData) => {
  if (
    projectData != null &&
    projectData.date !== undefined &&
    projectData.temp !== undefined &&
    projectData.content !== undefined
  ) {
    document.getElementById("date").innerHTML = projectData.date;
    document.getElementById("temp").innerHTML = projectData.temp + " degree C";
    document.getElementById("content").innerHTML =
      "I am feeling: " + projectData.content;
  }
};

/**
 * @description contains the logic (get weather data and save it to the backend and then retrieve it from backend and then update the UI)
 */
const submitData = async () => {
  // Retriveing form values
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  if (zipCode !== "") {
    const res = await fetch(
      `${baseUrl}?zip=${zipCode}&appid=${apiKey}&units=${unit}`
    );

    try {
      // convert the result to json
      const data = await res.json();
      if (data.cod == "404") {
        alert(data.message);
        return;
      }

      const newData = await postProjectData("/projectData", {
        temp: data.main.temp,
        date: newDate,
        content: feelings,
      });

      if (newData) {
        const projectData = await getProjectData();
        if (projectData) {
          updateUI(projectData);
        } else {
          alert("Can not get data from the server");
        }
      } else {
        alert("Can not post data to the server");
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    alert("Please enter zip code.");
  }
};

// Add Event Listener On Generate Button (Click Event)
document.getElementById("generate").addEventListener("click", submitData);

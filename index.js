function loginUser(event) {
  event.preventDefault();
  const getSpinn = document.getElementById("spin");
  getSpinn.style.display = "inline-block";
  const getEmail = document.querySelector("#email").value;
  const getPassword = document.querySelector("#password").value;

  //check if fields are empty
  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: "info",
      text: "All fields must not be empty",
      confirmButtonColor: "#2d85de",
    });
    getSpinn.style.display = "none";
  }

  //if fields are ok
  else {
    const myFormData = new FormData();
    myFormData.append("email", getEmail);
    myFormData.append("password", getPassword);

    const loginReq = {
      method: "POST",
      body: myFormData,
    };
    const url =
      "https://pluralcode.academy/pluralcode_apis/api/login_eagletracker";
    fetch(url, loginReq)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("result", JSON.stringify(result));
        const theNewItem = localStorage.getItem("result");
        const user = JSON.parse(theNewItem);
        if (user.hasOwnProperty("email")) {
          window.location.href = "dashboard.html";
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful",
            confirmButtonColor: "#2d85de",
          });
          getSpinn.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

function handleMenu() {
  const menu = document.querySelector(".second-section");
  const sideMenu = document.querySelector(".sidebar");
  let x = document.getElementById("mysidebar");
  if (screen.width < 998 && x.className === "sidebar") {
    x.className += " siderestwo";
  } else if (x.className === "sidebar") {
    x.className += " sideres";
    menu.className += " side";
  } else {
    x.className = "sidebar";
    menu.className = "second-section";
  }
}
//get token from users details
const getToken = (details) => {
  const getDetails = localStorage.getItem(details);
  const parseDetails = JSON.parse(getDetails);
  const getToken = parseDetails.token;
  // console.log(getToken)
  return getToken;
};

let getClose = document.querySelector('.close');
getClose.addEventListener("click", close)
function close(){
  const getView = document.querySelector(".viewEach");
  getView.style.display = "none"

}


function viewEach(id) {
  const getView = document.querySelector(".viewEach");
  getView.style.display = "block";
  const getFull = document.querySelector(".fullnameview");
    const getEmail = document.querySelector(".emailview");
    const getPhone = document.querySelector(".phonenumview");
    const getCountry = document.querySelector(".countryview");
    const getState = document.querySelector(".stateview");
    const getCity = document.querySelector(".cityview");
    const getAddress = document.querySelector(".addressview");
    const getVideo = document.querySelector(".videoview");
    const getGender = document.querySelector(".genderview");
    localStorage.setItem("getId",id)
 
}
function postStudent(){
  const getSpinn = document.getElementsByClassName("spin");
  getSpinn.style.display = "inline-block";
  const getView = document.querySelector(".viewEach");
  getView.style.display = "block";
  const getFull = document.querySelector(".fullnameview");
    const getEmail = document.querySelector(".emailview");
    const getPhone = document.querySelector(".phonenumview");
    const getCountry = document.querySelector(".countryview");
    const getState = document.querySelector(".stateview");
    const getCity = document.querySelector(".cityview");
    const getAddress = document.querySelector(".addressview");
    const getVideo = document.querySelector(".videoview");
    const getGender = document.querySelector(".genderview");
    const getIdStore = localStorage.getItem("getId");
  
    const myFormData = new FormData();
    myFormData.append("id", getIdStore);
    myFormData.append("full_name", getFull);
    myFormData.append("email", getEmail);
    myFormData.append("phone_number", getPhone);
    myFormData.append("country", getCountry);
    myFormData.append("state", getState);
    myFormData.append("city", getCity);
    myFormData.append("address", getAddress);
    myFormData.append("video", getVideo);
    myFormData.append("gender", getGender);
  
  const loginReq = {
    method: "POST",
    body: myFormData,
  };
  url =
    "https://pluralcode.academy/pluralcode_apis/api/get_scholarship_students_details";
  fetch(url, loginReq)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        Swal.fire({
          icon: "success",
          text: "Successful",
          confirmButtonColor: "#2d85de",
        });

        setTimeout(() => {
          location.reload();
        }, 3000);
      }
      //if not successful
      else {
        Swal.fire({
          icon: "warning",
          text: "Unsuccessful!",
          confirmButtonColor: "#2d85de",
        });

        getSpin.style.display = "none";
      }
    })
    .catch((error) => console.log("error", error));
}

async function getStudents() {
  const result = JSON.parse(localStorage.getItem("result"));
  const getAdName = document.querySelector("#nam");
  getAdName.innerHTML = result.email;
  const getTable = document.querySelector(".tableBody");
  const url =
    "https://pluralcode.academy/pluralcode_apis/api/get_scholarship_students";

  //get headers
  const tokHead = new Headers();
  tokHead.append("Authorization", `Bearer ${getToken("result")}`);

  const req = {
    method: "GET",
    headers: tokHead,
  };

  const response = await fetch(url, req);
  const data = await response.json();
  let tableList = "";
  const getAll = data.forEach((student) => {
    const getFull = document.querySelector(".fullnameview");
    const getEmail = document.querySelector(".emailview");
    const getPhone = document.querySelector(".phonenumview");
    const getCountry = document.querySelector(".countryview");
    const getState = document.querySelector(".stateview");
    const getCity = document.querySelector(".cityview");
    const getAddress = document.querySelector(".addressview");
    const getVideo = document.querySelector(".videoview");
    const getGender = document.querySelector(".genderview");
    
    tableList += `<tr>
    <td class="tname">${student.full_name}</td>
    <td class="temail">${student.email}</td>
    <td class="tphnum">${student.phone_number}</td>
    <td class="tpos">${student.country}</td>
    <td class="tscore">${student.state}</td>
    <td class="tscore">${student.city}</td>
    <td class="tscore">${student.address}</td>
    <td class="tscore">${student.video_link}</td>
    <td class="tscore">${student.gender}</td>
    <td><button class= "btn text-primary fw-bold" onclick="viewEach(${student.id})">View</button></td>
  </tr>`;
  if (student.id) {
    getFull.setAttribute("value", student.full_name);
    getEmail.setAttribute("value", student.email);
    getPhone.setAttribute("value", student.phone_number);
    getCountry.setAttribute("value", student.country);
    getState.setAttribute("value", student.state);
    getCity.setAttribute("value", student.city);
    getAddress.setAttribute("value", student.address);
    getVideo.setAttribute("value", student.video_link);
    getGender.setAttribute("value", student.gender);
  }
  });
  getTable.innerHTML = tableList;
 
}
getStudents();



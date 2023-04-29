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
    
  });
  getTable.innerHTML = tableList;
  
}
getStudents();
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
    const tokHead = new Headers();
  tokHead.append("Authorization", `Bearer ${getToken("result")}`);
  const form = new FormData();
  form.append("id",id)

  const catReq = {
    method: "POST",
    headers: tokHead,
    body: form
  };

  const url = `https://pluralcode.academy/pluralcode_apis/api/get_scholarship_students_details`;
  fetch(url, catReq)
    .then((response) => response.json())
    .then((student) => {
      
        getFull.setAttribute("value", student[0].full_name);
        getEmail.setAttribute("value", student[0].email);
        getPhone.setAttribute("value", student[0].phone_number);
        getCountry.setAttribute("value", student[0].country);
        getState.setAttribute("value", student[0].state);
        getCity.setAttribute("value", student[0].city);
        getAddress.setAttribute("value", student[0].address);
        getVideo.setAttribute("value", student[0].video_link);
        getGender.setAttribute("value", student[0].gender);

    });
 
}

const tbldata = document.querySelector('#rashTable');
function exportExcel(tbl){
  var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tbl);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        //triggering the function
        downloadLink.click();
    }
  
}









 






  // This For Privacy Policy Pdf
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const title = "Privacy Policy";

  const content = `
Natioan Science Day Registration 2026

Effective Date: January 26, 2026

Website (“we,” “our,” or “the Admin”) is committed to protecting the
privacy of participants who register for Science Day events.

1. Information We Collect
• Name
• Email address
• Mobile number
• University / School / Department
• Course details
• Event selection
• Poster / Project theme
• Team members (if any)

2. How We Use Your Information
The information is used for:
• Managing registrations
• Event communication
• Organizing participants
• University compliance

3. Data Security
We apply reasonable security measures to protect your data.

4. Sharing of Information
Shared only with University organizers if required.

5. Data Retention
Data retained only for administrative purposes.

6. Your Rights
• Access
• Correction
• Deletion (as per University rules)

7. Consent
By submitting the form, you agree to this policy.

8. Changes
Policy may be updated when required.


Contact:
Website Admin



Thank you for participating!
`;

  // 🔹 Title
  doc.setFontSize(18);
  doc.text(title, 20, 20);

  // 🔹 Body text with auto line break
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(content, 170);

  let y = 35;
  const pageHeight = doc.internal.pageSize.height;

  lines.forEach(line => {
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 20, y);
    y += 8;
  });

  // 🔹 Save PDF
  doc.save("Registration.pdf");
}






let registeredEvents = {};

function checkPosterTheme(){
  const event = document.getElementById("event").value;
  document.getElementById("posterTheme").style.display = (event==="Poster Making" || event==="Research Poster Making") ? "block" : "none";
}

function checkStudentType(){
  const type = document.getElementById("studentType").value;
  const univFields = document.querySelector('.univ-fields');
  const universityInput = document.getElementById("university");
  const schoolInput = document.getElementById("school");

  if(type==="inside"){
    universityInput.value="Gautam Buddha University";
    universityInput.readOnly=true;
    schoolInput.placeholder="Select School/Department";
    univFields.style.display="block";
  } else if(type==="outside"){
    universityInput.value="";
    universityInput.readOnly=false;
    schoolInput.placeholder="School/Department Name";
    univFields.style.display="block";
  } else {
    univFields.style.display="none";
  }
}








// Registration Number with Year + Date + Time + Random Number
function generateRegNo() {
  const now = new Date();
  const year = now.getFullYear();                        // 2026
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month (01-12)
  const day = String(now.getDate()).padStart(2, "0");        // Day (01-31)
  const hours = String(now.getHours()).padStart(2, "0");     // 24-hour
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  

  return `GBUSD${year}${month}${day}${hours}${minutes}${seconds}`;
}



// Grab required inputs
const submitBtn = document.getElementById("submitBtn");
const requiredInputs = [
  document.getElementById("program"),
  document.getElementById("name"),
  document.getElementById("rollno"),
  document.getElementById("email"),
  document.getElementById("mobile"),
  document.getElementById("studentType"),
  document.getElementById("event"),
  document.getElementById("privacy")
];

// Disable submit initially
submitBtn.disabled = true;

// Function to check all required fields
function checkRequiredFields() {
  let allFilled = true;

  requiredInputs.forEach(input => {
    if(input.type === "checkbox") {
      if(!input.checked) allFilled = false;
    } else {
      if(!input.value.trim()) allFilled = false;
    }
  });

  submitBtn.disabled = !allFilled;
}

// Add event listeners to all required inputs
requiredInputs.forEach(input => {
  input.addEventListener("input", checkRequiredFields);
  input.addEventListener("change", checkRequiredFields); // for select and checkbox
});

// Call once to set initial state
checkRequiredFields();







function finalSubmit(){



  const regNo = generateRegNo();




  function checkInputs() {
  if(nameInput.value.trim() !== "" && emailInput.value.trim() !== ""){
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("submitBtn").innerText = "Please Wait 10 Second Submitting...";







  

  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const rollno = document.getElementById("rollno").value.trim();
  const event = document.getElementById("event").value;

 

  if(registeredEvents[email] && registeredEvents[email].includes(event)){
    alert("You have already registered for this event.");
    return;
  }

  if(!registeredEvents[email]) registeredEvents[email] = [];
  registeredEvents[email].push(event);

  const data = {
    regNo: regNo,
    name: name,
    rollno: rollno,
    email: email,
    mobile: document.getElementById("mobile").value,
    university: document.getElementById("university").value,
    school: document.getElementById("school").value,
    program: document.getElementById("program").value,
    event: event,
    posterTheme: document.getElementById("posterTheme").style.display==="block" ? document.getElementById("posterTheme").value : "",
    team: document.getElementById("team").value
  };

  fetch("https://script.google.com/macros/s/AKfycby5tjb6ZpXYMUD5lC3sg96XEJ802aqpVRUilyZShoH53eGhgP3rbcyR5TCjy3Q0DhAy/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(() => {

  

  // UI message
  document.getElementById('formContainer').innerHTML = `
  <h1 style="text-align:center;color:#004aad;margin:20px 0">
    ✅ Registration Successful
  </h1> <br>
  <h2>Please Download Conformation Letter <a href="verify.html">click Here</a></h2>

  <p style="text-align:center;font-size:18px">
    <b>Registration Number</b><br>
    <span style="font-size:22px;color:#00796b">
      ${regNo}
    </span>
  </p>

  <p style="text-align:center;font-size:15px;margin-top:10px">
    Please save this number for future verification. and download your conformation latter
  </p>
`;


  
});
}
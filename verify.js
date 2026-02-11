
let verifiedUser=null;

async function verify(){
  const regNo=document.getElementById("regNoInput").value.trim();
  const Registration=regNo;
  const resultDiv=document.getElementById("result");
  document.getElementById("downloadBtn").style.display="none";

  if(!regNo){alert("Enter Registration Number");return;}
  resultDiv.innerHTML="Please Wait 10 Second 🔍 Verifying...";

  try{
    const url="https://script.google.com/macros/s/AKfycby5tjb6ZpXYMUD5lC3sg96XEJ802aqpVRUilyZShoH53eGhgP3rbcyR5TCjy3Q0DhAy/exec";
    const res=await fetch(url);
    const data=await res.json();

    const entry=data.find(r =>
      String(r.regNo).trim().toUpperCase()===regNo.toUpperCase()
    );

    if(entry){
      verifiedUser=entry;
      resultDiv.innerHTML=`
        <div class="success">
          <b>✔ Registration Verified</b><br><br>
          <b>Registration Number:</b> ${entry.regNo||"N/A"}<br>
          <b>Name               :</b> ${entry.name||"N/A"}<br>
          <b>Roll Number        :</b> ${entry.rollno||"N/A"}<br>
          <b>Email ID           :</b> ${entry.email||"N/A"}<br>
          <b>Mobile Number      :</b> ${entry.mobile||"N/A"}<br>
          <b>University         :</b> ${entry.university||"N/A"}<br>
          <b>School             :</b> ${entry.school||"N/A"}<br>
          <b>Program            :</b> ${entry.program||"N/A"}<br>
          <b>Event              :</b> ${entry.event||"N/A"} <br>
          <b>Poster Theme       :</b> ${entry.posterTheme||"N/A"}<br>
          <b>Team Member        :</b> ${entry.team||"N/A"}<br>
          <b>Date and Time      :</b> ${entry.timestamp||"N/A"}<br>
        </div>`;
      document.getElementById("downloadBtn").style.display="block";
    }else{
      verifiedUser=null;
      resultDiv.innerHTML=`<div class="error">✖ Registration Not Found</div>`;
    }
  }catch(e){
    resultDiv.innerHTML=`<div class="error">Server Error</div>`;
  }
}


// Conformation Pdf Form Start


function downloadConfirmationPDF(){
  if(!verifiedUser){alert("Verify first");return;}

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // 🔹 LOGO LOAD
  const logo = new Image();
  logo.src = "GBU logo.png";   // 👈 yahi aap logo ka naam/path change karte ho

  logo.onload = function () {

    // ===== BACKGROUND LOGO =====
    doc.setGState(new doc.GState({ opacity: 0.10 }));
    doc.addImage(logo, "PNG", 30, 60, 150, 150);
    doc.setGState(new doc.GState({ opacity: 1 }));
    // ==========================

    // ===== HEADER =====
    doc.setFontSize(23);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(183, 28, 28);
    doc.text("Gautam Buddha University",105,20,{align:"center"});
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(
      "School of Vocational Studies & Applied Sciences\nDepartment of Applied Physics",
      105,28,{align:"center"}
    );

    doc.line(20,40,190,40);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Participant Confirmation Letter",105,55,{align:"center"});

    // ===== QR CODE =====
    const qr = new QRious({
      value: verifiedUser.regNo,
      size: 100
    });
    const qrImg = qr.toDataURL();
    doc.addImage(qrImg, 'PNG', 160, 50, 40, 40);

    // ===== CONTENT =====
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const today = new Date().toLocaleDateString("en-IN");

    const text = `Date: ${today}

Dear ${verifiedUser.name},

Your registration for National Science Day 2026 has been successfully verified.

Participant Details:
Registration Number : ${verifiedUser.regNo}
Name                : ${verifiedUser.name}
Roll Number         : ${verifiedUser.rollno}
Email Id            : ${verifiedUser.email}
Mobile Number       : ${verifiedUser.mobile}
University          : ${verifiedUser.university}
School              : ${verifiedUser.school}
Program             : ${verifiedUser.program}
Event               : ${verifiedUser.event}
Poster Theme        : ${verifiedUser.posterTheme}
Team Member         : ${verifiedUser.team}
Date And Time       : ${verifiedUser.timestamp}
Please bring this letter on the event day.
Regards,
Event Coordinator
Department of Applied Physics
Gautam Buddha University`;


    const lines = doc.splitTextToSize(text,170);
    let y = 75;
    lines.forEach(l=>{
      if(y>270){doc.addPage(); y=20;}
      doc.text(l,20,y);
      y+=8;
    });


  



    // ===== SAVE PDF =====
    doc.save(`Confirmation_${verifiedUser.name.replace(/\s+/g,"_")}.pdf`);
  };
}
// Conformation Pdf Form End



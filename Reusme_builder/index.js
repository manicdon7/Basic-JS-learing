document.getElementById("resumeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const resumeData = Object.fromEntries(formData);

  // Generate the resume content
  const generatedResumeContent = `
    <h2>${resumeData.fullName}</h2>
    <p>Email: ${resumeData.email}</p>
    <p>Phone: ${resumeData.phone}</p>
    <h3>Summary</h3>
    <p>${resumeData.summary}</p>
    <h3>Experience</h3>
    <p>${resumeData.experience}</p>
    <h3>Education</h3>
    <p>${resumeData.education}</p>
  `;

  // Display the generated resume
  document.getElementById("generatedResume").innerHTML = generatedResumeContent;
  const doc = new jsPDF();

  // Set font size and type for the PDF
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  // Add the generated resume content to the PDF
  doc.fromHTML(generatedResumeContent, 15, 15, {
    width: 180,
  });

  // Save the PDF with a custom filename
  doc.save("resume.pdf");
});

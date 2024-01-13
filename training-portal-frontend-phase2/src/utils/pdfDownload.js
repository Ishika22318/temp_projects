import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// const downloadPdf = (elementRef, filename) => {
//   const input = elementRef.current;

//   html2canvas(input).then((canvas) => {
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4', true);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = canvas.width;
//     const imgHeight = canvas.height;

//     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

//     const imgX = (pdfWidth - imgWidth * ratio) / 2;
//     const imgY = 0; // Set imgY to 0 to start from the top

//     pdf.addImage(
//       imgData,
//       'PNG',
//       imgX,
//       imgY,
//       imgWidth * ratio,
//       imgHeight * ratio
//     );
//     pdf.save(filename);
//   });
// };


const handleDownloadPDF = () => {
  // Create a new jsPDF instance

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a1',
  });

  // Define the content to be added to the PDF
  const content = document.getElementById('content-to-print');
 console.log(content)
  const scale = 1.3;
  //  const marginLeft = 10;
  // const marginTop = 20;
  //  pdf.text(marginLeft, marginTop, `Title: ${props.title}`);

  html2canvas(content, {
    // useCORS:true,
    scale: scale,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 20);

    // Save the PDF
    pdf.save('report.pdf');
  });
};

export { handleDownloadPDF };

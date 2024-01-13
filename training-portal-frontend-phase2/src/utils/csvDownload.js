export const downloadCSV = async (selectedRows) => {
  const res = await fetch('http://localhost:3000/api/v1/performance/getInternInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedRows),
  });

  const csvData = await res.text();
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'InternReport.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

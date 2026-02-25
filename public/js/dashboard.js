// Fraud vs Legitimate Pie Chart
fetch("/dashboard/api/fraud-stats")
  .then((res) => res.json())
  .then((data) => {
    const labels = data.map((d) => d.prediction || "unknown");
    const counts = data.map((d) => d.count);

    new Chart(document.getElementById("fraudPieChart"), {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: counts,
            backgroundColor: ["#dc3545", "#28a745", "#ffc107"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  });

// Device Analysis Bar Chart
fetch("/dashboard/api/device-stats")
  .then((res) => res.json())
  .then((data) => {
    const labels = data.map((d) => d.device_type);
    const counts = data.map((d) => d.count);

    new Chart(document.getElementById("deviceChart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Transactions",
            data: counts,
            backgroundColor: "#007bff",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  });

// Fraud Trend Line Chart
fetch("/dashboard/api/fraud-trend")
  .then((res) => res.json())
  .then((data) => {
    const labels = data.map((d) => d.date);
    const totals = data.map((d) => d.total);
    const frauds = data.map((d) => d.fraud_count);

    new Chart(document.getElementById("trendChart"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total Transactions",
            data: totals,
            borderColor: "#007bff",
            fill: false,
          },
          {
            label: "Fraud Transactions",
            data: frauds,
            borderColor: "#dc3545",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  });

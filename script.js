// Function to dynamically create input fields for burst time
function createInputFields() {
    const numProcesses = document.getElementById('numProcesses').value;
    const container = document.getElementById('processInputFields');
    container.innerHTML = ''; // Clear previous input fields

    // Hiệu ứng nhỏ khi thêm ô nhập liệu
    container.style.opacity = 0;
    setTimeout(() => {
        container.style.opacity = 1;
    }, 200);

    for (let i = 0; i < numProcesses; i++) {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'input-process';
        inputDiv.innerHTML = `
            <label for="burst${i}">Burst Time for Process ${i + 1}:</label>
            <input type="number" id="burst${i}" min="1" value="1">
        `;
        container.appendChild(inputDiv);
    }

    document.getElementById('calculateBtn').style.display = 'block';
}

// Function to calculate SJF scheduling
function calculateSJF() {
    const numProcesses = document.getElementById('numProcesses').value;
    let processes = [];

    // Collect burst times
    for (let i = 0; i < numProcesses; i++) {
        const burstTime = parseInt(document.getElementById(`burst${i}`).value);
        processes.push({ process: i + 1, burstTime: burstTime });
    }

    // Sort by burst time (SJF)
    processes.sort((a, b) => a.burstTime - b.burstTime);

    let waitingTime = 0;
    let turnaroundTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = ''; // Clear previous results

    // Calculate waiting time and turnaround time
    processes.forEach((p, index) => {
        if (index === 0) {
            waitingTime = 0; // First process has no waiting time
        } else {
            waitingTime += processes[index - 1].burstTime;
        }

        turnaroundTime = waitingTime + p.burstTime;
        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

        // Append to table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Process ${p.process}</td>
            <td>${p.burstTime}</td>
            <td>${waitingTime}</td>
            <td>${turnaroundTime}</td>
        `;
        tbody.appendChild(row);
    });

    // Trigger animation for the table and average times
    document.getElementById('resultTable').classList.add('show');

    // Calculate and display average times
    const avgWait = (totalWaitingTime / numProcesses).toFixed(2);
    const avgTurnaround = (totalTurnaroundTime / numProcesses).toFixed(2);

    document.getElementById('avgWaitTime').innerText = `Average Waiting Time: ${avgWait}`;
    document.getElementById('avgTurnaroundTime').innerText = `Average Turnaround Time: ${avgTurnaround}`;

    document.getElementById('avgTimes').classList.add('show');
}

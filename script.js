function createInputFields() {
    const numProcesses = document.getElementById('numProcesses').value;
    const container = document.getElementById('processInputFields');
    container.innerHTML = '';

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

function calculateSJF() {
    const numProcesses = document.getElementById('numProcesses').value;
    let processes = [];

    for (let i = 0; i < numProcesses; i++) {
        const burstTime = parseInt(document.getElementById(`burst${i}`).value);
        processes.push({ process: i + 1, burstTime: burstTime });
    }

    processes.sort((a, b) => a.burstTime - b.burstTime);

    let waitingTime = 0;
    let turnaroundTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    const tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = '';

    processes.forEach((p, index) => {
        if (index === 0) {
            waitingTime = 0;
        } else {
            waitingTime += processes[index - 1].burstTime;
        }

        turnaroundTime = waitingTime + p.burstTime;
        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Process ${p.process}</td>
            <td>${p.burstTime}</td>
            <td>${waitingTime}</td>
            <td>${turnaroundTime}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('resultTable').style.display = 'table';

    const avgWait = (totalWaitingTime / numProcesses).toFixed(2);
    const avgTurnaround = (totalTurnaroundTime / numProcesses).toFixed(2);

    document.getElementById('avgWaitTime').innerText = `Average Waiting Time: ${avgWait}`;
    document.getElementById('avgTurnaroundTime').innerText = `Average Turnaround Time: ${avgTurnaround}`;
    document.getElementById('avgTimes').style.display = 'block';
}

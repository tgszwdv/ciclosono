document.addEventListener('DOMContentLoaded', () => {
    const sleepTimeInput = document.getElementById('sleep-time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    sleepTimeInput.value = `${hours}:${minutes}`;
});

document.getElementById('change-time-btn').addEventListener('click', function() {
    const sleepTimeInput = document.getElementById('sleep-time');
    sleepTimeInput.focus();
});

document.getElementById('calculate-btn').addEventListener('click', function() {
    const sleepTimeInput = document.getElementById('sleep-time').value;
    
    if (!sleepTimeInput) {
        alert('Por favor, insira a hora para dormir.');
        return;
    }

    const sleepTime = new Date(`1970-01-01T${sleepTimeInput}:00`);
    const cycleDuration = 90 * 60 * 1000; 
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

 
    sleepTime.setMinutes(sleepTime.getMinutes() - 15);

    let idealTimes = [];
    let closestTime = null;
    let closestDifference = Infinity;
    
    for (let i = 1; i <= 6; i++) {
        const wakeUpTime = new Date(sleepTime.getTime() + i * cycleDuration);
        const formattedWakeUpTime = formatTime(wakeUpTime);
        const diff = Math.abs(wakeUpTime - sleepTime.getTime() + (6 * cycleDuration)); 
        
        if (diff < closestDifference) {
            closestDifference = diff;
            closestTime = formattedWakeUpTime;
        }
        
        idealTimes.push({
            cycles: i,
            time: formattedWakeUpTime,
        });
    }
    
    let resultHtml = `<p>Se você for dormir às ${sleepTimeInput} e precisa acordar entre 6:00 e 6:40, os horários ideais para acordar, alinhados com ciclos de sono de 90 minutos, seriam:</p><br>`;
    
    idealTimes.forEach(item => {
        resultHtml += `<p>${item.time} (${item.cycles} ciclos)</p><br>`;
    });

    resultHtml += `<p>Acordar às ${closestTime} seria o ideal, pois coincidiria com o final de um ciclo de sono. Se precisar acordar antes de ${closestTime}, ${idealTimes.find(item => item.time === closestTime).time} seria a próxima opção, mas estaria acordando com menos ciclos completos.</p>`;

    resultsDiv.innerHTML = resultHtml;
});

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

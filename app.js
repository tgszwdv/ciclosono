document.addEventListener('DOMContentLoaded', () => {
    const sleepTimeInput = document.getElementById('sleep-time');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('results');
    const changeModeBtn = document.getElementById('change-mode');
    const modeLabel = document.getElementById('mode-label');
    const modeIcon = document.getElementById('mode-icon');
    const inputLabel = document.getElementById('input-label');

    let isWakeTimeMode = false;

    // Define o campo de hora com o horário atual
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    sleepTimeInput.value = `${hours}:${minutes}`;

    // Atualiza a interface com base no modo inicial
    updateMode();

    // Alterna entre modo de hora de dormir e hora de acordar
    changeModeBtn.addEventListener('click', () => {
        isWakeTimeMode = !isWakeTimeMode;
        updateMode();
        resultsDiv.innerHTML = ''; // Limpa os resultados ao mudar o modo
    });

    calculateBtn.addEventListener('click', () => {
        const time = sleepTimeInput.value;
        if (!time) {
            resultsDiv.innerHTML = '<p class="text-red-500">Por favor, insira uma hora.</p>';
            return;
        }

        const date = new Date(`1970-01-01T${time}:00`);
        const results = [];
        const cycles = 6;
        const cycleDuration = 90; // duração de um ciclo em minutos

        if (isWakeTimeMode) {
            // Hora para dormir com base na hora de acordar
            for (let i = cycles; i >= 1; i--) {
                let calcTime = new Date(date.getTime());
                calcTime.setMinutes(calcTime.getMinutes() - cycleDuration * i);
                const formattedTime = calcTime.toTimeString().slice(0, 5);
                results.push(`${formattedTime} (${i} ciclo${i > 1 ? 's' : ''})`);
            }
            resultsDiv.innerHTML = `Se você deseja acordar às ${time}, aqui estão os horários ideais para dormir, alinhados com ciclos de sono de 90 minutos:<br>${results.map(result => `<p class="text-green-500">${result}</p>`).join('<br>')}`;
        } else {
            // Hora de acordar com base na hora de dormir
            for (let i = 1; i <= cycles; i++) {
                let calcTime = new Date(date.getTime());
                calcTime.setMinutes(calcTime.getMinutes() + cycleDuration * i);
                const formattedTime = calcTime.toTimeString().slice(0, 5);
                results.push(`${formattedTime} (${i} ciclo${i > 1 ? 's' : ''})`);
            }
            resultsDiv.innerHTML = `Se você for dormir às ${time}, os horários ideais para acordar, alinhados com ciclos de sono de 90 minutos, seriam:<br>${results.map(result => `<p class="text-green-500">${result}</p>`).join('<br>')}`;
        }
    });

    function updateMode() {
        if (isWakeTimeMode) {
            modeLabel.textContent = 'Modo ativo - Hora de Acordar';
            modeIcon.className = 'fas fa-sun wake'; // Ícone para Hora de Acordar
            inputLabel.textContent = 'Digite a hora que deseja acordar:';
            changeModeBtn.textContent = 'Alterar modo';
        } else {
            modeLabel.textContent = 'Modo ativo - Hora de Dormir';
            modeIcon.className = 'fas fa-bed sleep'; // Ícone para Hora de Dormir
            inputLabel.textContent = 'Digite a hora que irá dormir:';
            changeModeBtn.textContent = 'Alterar Modo';
        }
    }
});

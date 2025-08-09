const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const glitchOverlay = document.createElement('canvas');
glitchOverlay.width = canvas.width;
glitchOverlay.height = canvas.height;
glitchOverlay.style.position = 'fixed';
glitchOverlay.style.top = '0';
glitchOverlay.style.left = '0';
glitchOverlay.style.pointerEvents = 'none';
glitchOverlay.style.zIndex = '9999';
document.body.appendChild(glitchOverlay);
const glitchCtx = glitchOverlay.getContext('2d');



const letters = '01';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Alterna cor por coluna: par verde, ímpar azul
        if (i % 2 === 0) {
            ctx.fillStyle = '#00ff41'; // verde Matrix
        } else {
            ctx.fillStyle = '#0a40d3'; // azul (cor que você passou)
        }

        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function glitchEffect(duration = 500) {
    let start = null;

    function drawGlitch(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        glitchCtx.clearRect(0, 0, glitchOverlay.width, glitchOverlay.height);

        // cria faixas horizontais distorcidas em rosa/roxo
        for (let i = 0; i < glitchOverlay.height; i += 20) {
            let sliceHeight = 10;
            let offsetX = (Math.random() - 0.5) * 20; // deslocamento horizontal
            glitchCtx.fillStyle = `rgba(255, 0, 255, 0.2)`; // rosa translúcido
            glitchCtx.fillRect(offsetX, i, glitchOverlay.width, sliceHeight);

            glitchCtx.fillStyle = `rgba(128, 0, 128, 0.15)`; // roxo translúcido
            glitchCtx.fillRect(offsetX * 0.5, i + 10, glitchOverlay.width, sliceHeight);
        }

        if (elapsed < duration) {
            requestAnimationFrame(drawGlitch);
        } else {
            glitchCtx.clearRect(0, 0, glitchOverlay.width, glitchOverlay.height);
        }
    }

    requestAnimationFrame(drawGlitch);
}

function shockwaveEffectWithShake(duration = 600) {
    let start = null;

    function drawShockwave(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        glitchCtx.clearRect(0, 0, glitchOverlay.width, glitchOverlay.height);

        const maxOffset = 20;

        // Tremor (shake) do body
        const shakeX = (Math.random() - 0.5) * maxOffset;
        const shakeY = (Math.random() - 0.5) * maxOffset;
        document.body.style.transform = `translate(${shakeX}px, ${shakeY}px)`;

        // Desenha faixas glitch no overlay
        for (let i = 0; i < glitchOverlay.height; i += 15) {
            const sliceHeight = 8;
            const sliceOffsetX = (Math.random() - 0.5) * maxOffset * 2;

            glitchCtx.fillStyle = `rgba(255, 20, 147, 0.3)`; // rosa choque translúcido
            glitchCtx.fillRect(sliceOffsetX, i, glitchOverlay.width, sliceHeight);

            glitchCtx.fillStyle = `rgba(138, 43, 226, 0.2)`; // roxo translúcido
            glitchCtx.fillRect(sliceOffsetX * 0.6, i + 8, glitchOverlay.width, sliceHeight);
        }

        if (elapsed < duration) {
            requestAnimationFrame(drawShockwave);
        } else {
            glitchCtx.clearRect(0, 0, glitchOverlay.width, glitchOverlay.height);
            document.body.style.transform = 'none'; // reseta o shake
        }
    }

    requestAnimationFrame(drawShockwave);
}


setInterval(draw, 35);

// Vimeo Player API
const iframe = document.getElementById('promoVideo');
const player = new Vimeo.Player(iframe);
const playOverlay = document.getElementById('playOverlay');
const progressBar = document.getElementById('videoProgress');

playOverlay.addEventListener('click', () => {
    shockwaveEffectWithShake(600); // efeito com tremor da tela e glitch
    player.setCurrentTime(0);
    player.setVolume(1);
    player.play();
    playOverlay.style.display = 'none';
});


function tvInterferenceEffect(duration = 600) {
    let start = null;

    function drawInterference(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        glitchCtx.clearRect(0, 0, glitchOverlay.width, glitchOverlay.height);

        const maxOffsetX = 100;
        const maxShake = 70;

        // Tremor leve da tela inteira
        const shakeX = (Math.random() - 0.5) * maxShake;
        const shakeY = (Math.random() - 0.5) * maxShake;
        document.body.style.transform = `translate(${shakeX}px, ${shakeY}px)`;

        // Divide o canvas em fatias horizontais
        const sliceHeight = 8;
        for (let y = 0; y < glitchOverlay.height; y += sliceHeight) {
            // Deslocamento lateral aleatório para cada fatia
            const offsetX = (Math.random() - 0.5) * maxOffsetX;

            // Faixa rosa
            glitchCtx.fillStyle = `rgba(255, 105, 180, 0.4)`; // hotpink translúcido
            glitchCtx.fillRect(offsetX, y, glitchOverlay.width, sliceHeight);

            // Faixa roxa um pouco abaixo
            glitchCtx.fillStyle = `rgba(148, 0, 211, 0.3)`; // darkviolet translúcido
            glitchCtx.fillRect(offsetX * 0.7, y + sliceHeight / 2, glitchOverlay.width, sliceHeight / 2);
        }

        if (elapsed < duration) {
            requestAnimationFrame(drawInterference);
        } else {
            glitchCtx.clearRect(0, 0, glitchOverlay.width, glitchOverlay.height);
            document.body.style.transform = 'none';
        }
    }

    requestAnimationFrame(drawInterference);
}



// Atualizar barra de progresso
player.on('timeupdate', function(data) {
    const percent = (data.seconds / data.duration) * 100;
    progressBar.style.width = percent + '%';
});

// Quando o vídeo for pausado
const pauseAlert = document.getElementById('pauseAlert');
player.on('pause', function() {
    pauseAlert.style.display = 'block';
    setTimeout(() => {
        pauseAlert.style.display = 'none';
    }, 15000); // some depois de 3 segundos
});



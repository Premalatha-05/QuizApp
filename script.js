const questions = [
    { q: "What does HTML stand for?", a: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Tabular Main Log", "None"], c: 0 },
    { q: "Which protocol is used for secure web traffic?", a: ["HTTP", "FTP", "HTTPS", "SMTP"], c: 2 },
    { q: "What is the primary brain of a computer?", a: ["GPU", "RAM", "CPU", "HDD"], c: 2 },
    { q: "Which company created the iPhone?", a: ["Microsoft", "Apple", "Google", "Samsung"], c: 1 },
    { q: "What does 'IP' stand for?", a: ["Internet Protocol", "Internal Program", "Instant Packet", "Indexing Pointer"], c: 0 },
    { q: "A single Byte is how many Bits?", a: ["4", "16", "32", "8"], c: 3 },
    { q: "Which language is used for web styling?", a: ["PHP", "CSS", "Python", "SQL"], c: 1 },
    { q: "What does DNS stand for?", a: ["Digital Name Stack", "Domain Name System", "Data Network Service", "Disk Node Source"], c: 1 },
    { q: "Which of these is a 'NoSQL' database?", a: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"], c: 1 },
    { q: "Who is the co-founder of Microsoft?", a: ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Zuckerberg"], c: 2 },
    { q: "What does SQL stand for?", a: ["Simple Query Link", "Structured Query Language", "System Quick Logic", "Standard Queue Line"], c: 1 },
    { q: "Which port is standard for HTTPS?", a: ["80", "21", "443", "25"], c: 2 },
    { q: "What is the most popular OS for servers?", a: ["Windows", "MacOS", "Linux", "Android"], c: 2 },
    { q: "What does RAM stand for?", a: ["Random Access Memory", "Read Access Memory", "Remote Action Mode", "Rapid Area Map"], c: 0 },
    { q: "Which extension is for JavaScript files?", a: [".java", ".py", ".js", ".script"], c: 2 },
    { q: "Which device connects different networks?", a: ["Switch", "Router", "Hub", "Monitor"], c: 1 },
    { q: "What is 'Phishing'?", a: ["A coding technique", "Social engineering attack", "Hardware cleaning", "Network speedup"], c: 1 },
    { q: "Which of these is a Cloud provider?", a: ["AWS", "Photoshop", "Excel", "Spotify"], c: 0 },
    { q: "What does 'URL' stand for?", a: ["User Remote Link", "Uniform Resource Locator", "Unique Reading Log", "Universal Radio Loop"], c: 1 },
    { q: "What is the purpose of a Firewall?", a: ["Speed up internet", "Block unauthorized access", "Storage", "Cool the CPU"], c: 1 }
];

let currentIdx = 0;
let score = 0;
let timeLeft = 15;
let timer;
let userName = "";

const loginView = document.getElementById('login-view');
const quizView = document.getElementById('quiz-view');
const resultView = document.getElementById('result-view');
const nextBtn = document.getElementById('next-btn');

document.getElementById('start-btn').onclick = () => {
    userName = document.getElementById('user-name').value.trim();
    if (!userName) return alert("Please enter your name!");
    loginView.classList.add('hidden');
    quizView.classList.remove('hidden');
    loadQuestion();
};

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    nextBtn.classList.add('hidden');
    
    // Change Button Text on Final Question
    if (currentIdx === questions.length - 1) {
        nextBtn.innerText = "Submit Quiz";
    } else {
        nextBtn.innerText = "Next Question";
    }

    document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
    const qData = questions[currentIdx];
    document.getElementById('question-txt').innerText = qData.q;
    document.getElementById('q-count').innerText = `${currentIdx + 1}/${questions.length}`;
    document.getElementById('progress-fill').style.width = `${((currentIdx + 1) / questions.length) * 100}%`;

    const optionsDiv = document.getElementById('answer-options');
    optionsDiv.innerHTML = '';

    qData.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add('answer-btn');
        btn.onclick = () => checkAnswer(i, qData.c, btn);
        optionsDiv.appendChild(btn);
    });
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            revealCorrect();
        }
    }, 1000);
}

function checkAnswer(selected, correct, btn) {
    clearInterval(timer);
    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add('correct'); // Highlights green
        score++;
    } else {
        btn.classList.add('wrong'); // Highlights red
        btns[correct].classList.add('correct'); // Shows user the right one
    }
    nextBtn.classList.remove('hidden');
}

function revealCorrect() {
    const correct = questions[currentIdx].c;
    const btns = document.querySelectorAll('.answer-btn');
    btns[correct].classList.add('correct');
    btns.forEach(b => b.disabled = true);
    nextBtn.classList.remove('hidden');
}

nextBtn.onclick = () => {
    currentIdx++;
    if (currentIdx < questions.length) {
        loadQuestion();
    } else {
        showFinalResults();
    }
};

function showFinalResults() {
    quizView.classList.add('hidden');
    resultView.classList.remove('hidden');
    document.getElementById('greet-user').innerText = `🎉bhu7poWell done, ${userName}!`;
    document.getElementById('final-score').innerText = score;
}

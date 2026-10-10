

const hindiTranslations = {
    "Menu": "मेन्यू", "Account": "खाता", "Not Logged In": "लॉग इन नहीं है",
    "Sign Up / Log In": "साइन अप / लॉग इन", "My History": "मेरा इतिहास", "Log Out": "लॉग आउट",
    "Settings": "सेटिंग्स", "Toggle Dark/Light Mode": "डार्क/लाइट मोड बदलें",
    "Language": "भाषा", "Font Size": "फ़ॉन्ट आकार", "Small": "छोटा", "Medium": "मध्यम", "Large": "बड़ा",
    "Test Series": "टेस्ट सीरीज", 
    "Select a Subject": "विषय चुनें", "Back to Home": "होम पर वापस जाएं", "Create Account / Log In": "खाता बनाएं / लॉग इन करें",
    "Submit": "जमा करें", "Reset Password": "पासवर्ड रीसेट करें", "My Attempt History": "मेरा प्रयास इतिहास", 
    "Time Left:": "बचा हुआ समय:", "Submit Test": "टेस्ट जमा करें", "Test Results": "टेस्ट परिणाम", 
    "Overall Score:": "कुल स्कोर:", "Dynamic Rank:": "रैंक:", "Correct Attempts": "सही प्रयास", "Wrong Attempts": "गलत प्रयास"
};
// --- PDF DATABASE ---
// Isme aap kabhi bhi naye chapters add ya remove kar sakte hain
const pdfDatabase = {
"Quick Revision": {
  "Class 10": {"Science": [ { name: "Chapter 1: Chemical Reactions", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" },
                           { name: "Chapter 2: Acids, Bases and Salts", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
                           ],
             "Math": [ { name: "Chapter 1: Real Numbers", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
                      ],
             "SST": [ {name: "History|Chapter 1: Nationalism", link: "" }],
             "English": [{name: "Grammer: Tense", link:"https://drive.google.com/file/d/1dvfUZiI1xNfBfyeSahZq1C9cMpYVwbZy/preview"}]       
        },
  "Class 9": { "Science": [  { name: "Chapter 1: Matter in Our Surroundings", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
            ]
        }
    },
"Books": // Books ke links yahan aayenge
   {"Class 10": {"Science": [ { name: "Chapter 1: Chemical Reactions", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" },
                           { name: "Chapter 2: Acids, Bases and Salts", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
                           ],
         "Math": [ { name: "Chapter 1: Real Numbers", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
            ]
        },
  "Class 9": { "Science": [  { name: "Chapter 1: Matter in Our Surroundings", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
            ]
        }
        },
    "Solutions": // Solutions ke links yahan aayenge
    {
    }
};

let timerInterval;
let currentClass = "";
let currentSubject = "";
let pendingSubject = "";
let currentCategory = "";
let activeQuizData = []; 
let isPaused = false;
let timeLeft = 0;
let currentQuestionIndex = 0;
let totalQuestions = 0;
let viewHistoryStack = ['main-dashboard'];

function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// --- POPUP LOGIC ---
function checkInitialPopup() {
    document.getElementById('promo-popup').classList.remove('hidden');
}
function checkLoginPopup() { document.getElementById('promo-popup').classList.remove('hidden'); }
function closePopup() { document.getElementById('promo-popup').classList.add('hidden'); }

// --- INITIALIZATION ---
window.onload = () => {
    setTimeout(() => { 
        document.getElementById('splash-screen').classList.add('hidden-splash'); 
        setTimeout(() => { checkInitialPopup(); }, 800); 
    }, 2500);

    if (localStorage.getItem('userEmail')) {
        document.getElementById('user-status').innerText = "Logged in as: " + localStorage.getItem('userName');
        document.getElementById('nav-login-btn').classList.add('hidden'); 
        document.getElementById('nav-signup-btn').classList.add('hidden'); 
        document.getElementById('nav-logout-btn').classList.remove('hidden');
        document.getElementById('nav-hist-btn').classList.remove('hidden');
    }
};

// --- VIEW MANAGEMENT & GLOBAL BACK ---
function openExclusiveView(viewId, isBackAction = false) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    
    if (!isBackAction && viewHistoryStack[viewHistoryStack.length - 1] !== viewId) {
        viewHistoryStack.push(viewId);
    }
    
    const backBtn = document.getElementById('global-back-btn');
    if (viewId === 'main-dashboard' ) {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
    }

    if(viewId === 'history-container') renderHistory();
}

function goBack() {
    if (viewHistoryStack.length > 1) {
        let currentView = viewHistoryStack[viewHistoryStack.length - 1];
        
        if (currentView === 'test-modal') {
            if (!confirm("Are you sure you want to exit? Your test progress will be lost.")) return;
            clearInterval(timerInterval);
        }
        
        viewHistoryStack.pop(); 
        let prevView = viewHistoryStack[viewHistoryStack.length - 1];
        openExclusiveView(prevView, true);
    }
}

function closeToHome() {
    viewHistoryStack = ['main-dashboard'];
    openExclusiveView('main-dashboard', true);
}

function openClassSelection(title) {
    currentCategory = title; 
    document.getElementById('class-selection-title').innerText = title + " - Select Class";
    openExclusiveView('class-selection-dashboard');
}

// --- NEW GOOGLE DRIVE ROUTING LOGIC ---
function selectClass(className) {
    currentClass = className;

    // 1. Agar category Video nahi hai, toh sidha Subject Dashboard kholo
    if (currentCategory !== 'Video Explanation') {
        document.getElementById('subject-title').innerText = currentClass + " Subjects";
        viewHistoryStack = ['main-dashboard', 'class-selection-dashboard'];
        openExclusiveView('subject-dashboard');
        return; 
    }

else if (currentCategory === 'Video Explanation') {
        // यह नया फंक्शन सीधा Class के हिसाब से Subjects दिखाएगा
        showVideoSubjects(className);
        openExclusiveView('video-dashboard');
    }
}

function showSubjects(className) {
    if (!localStorage.getItem('userEmail')) { alert("Please Log In from the menu first to take a test!"); return; }
    currentClass = className;
    let isHindi = document.getElementById('lang-select').value === "Hindi";
    document.getElementById('subject-title').innerText = isHindi ? `${className} के विषय` : `${className} Subjects`;
    openExclusiveView('subject-dashboard');
}

// --- SETTINGS ---
function toggleTheme() { document.body.classList.toggle('dark-mode'); }
function changeFontSize(size) { document.body.style.fontSize = size; }
function changeLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        let key = el.getAttribute('data-key');
        el.innerText = lang === 'Hindi' ? (hindiTranslations[key] || key) : key;
    });
    if(currentClass) document.getElementById('subject-title').innerText = lang === 'Hindi' ? `${currentClass} के विषय` : `${currentClass} Subjects`;
}

// Apna NAYA Web App URL yahan daalein
const WEB_APP_URL="https://script.google.com/macros/s/AKfycbyeTKOl2634OfTh0ZQmoQU5ePaZZZkJe-gEjWgbkZ0V-DqpcMxxWGHL3es2UNZJBcJY/exec";

// --- 100% CLOUD AUTHENTICATION ---
// --- 100% CLOUD LOG IN ---
async function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value;
    
    if (!email) { alert("Please enter your registered email address."); return; }
    if (!pass) { alert("Please enter your password."); return; }
    
    const encryptedPass = btoa(pass); 
    alert("Logging in securely from cloud, please wait...");
    
    try {
        let response = await fetch(WEB_APP_URL + "?email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(encryptedPass));
        let result = await response.json();
        
        if (result.success) {
            if (result.status === "Pending") {
                alert("Wait For Authentication. Your account is still under review.");
            } else if (result.status === "Pay") {
                alert("Premium Account Required. Please subscribe to continue.");
            } else if (result.status === "Free" || result.status === "Approved") {
                alert("Authentication Successful!");
                localStorage.setItem('userName', result.name); 
                localStorage.setItem('userEmail', email);
                closeToHome();
                checkLoginPopup();
                location.reload(); 
            }
        } else {
            alert(result.message); 
        }
    } catch (error) {
        alert("Network error! Please check your internet connection.");
    }
}

// --- 100% CLOUD SIGN UP ---
async function handleSignUp() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const pass = document.getElementById('signup-password').value;
    
    if (!name) { alert("Please enter your Full Name."); return; }
    if (!email) { alert("Please enter a valid email address."); return; }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(pass)) { alert("Password must be exactly 8 alphanumeric characters."); return; }
    
    const encryptedPass = btoa(pass); 
    alert("Creating secure cloud account, please wait...");
    
    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify({ action: "signup", name: name, email: email, password: encryptedPass })
        });
        let result = await response.json();
        
        if(result.result === "success") {
            alert("Account created successfully! Wait For Authentication by admin.");
            closeToHome();
            checkLoginPopup();
        }
    } catch (error) {
        alert("Network error! Could not create account.");
    }
}

// --- LOGOUT ---
function logout() { 
    localStorage.removeItem('userName'); 
    localStorage.removeItem('userEmail'); 
    location.reload(); 
}

// --- CLOUD PASSWORD RESET ---
async function handlePasswordReset() {
    const email = document.getElementById('reset-email').value.trim();
    const name = document.getElementById('reset-name').value.trim();
    const newPass = document.getElementById('new-password').value;
    
    if (!email || !name) { alert("Please enter both your registered Email and Full Name."); return; }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(newPass)) { alert("Your new password must be exactly 8 alphanumeric characters."); return; }
    
    alert("Resetting password securely on server...");
    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify({ action: "reset", name: name, email: email, newPassword: btoa(newPass) })
        });
        let result = await response.json();
        
        if (result.result === "success") {
            alert("Success! Your password has been reset in the cloud database.");
            goBack(); 
        } else {
            alert("Error: Details do not match any cloud record.");
        }
    } catch (error) {
        alert("Network error! Could not reset password.");
    }
}

// --- RENDER HISTORY ---
function renderHistory() {
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    let allTests = JSON.parse(localStorage.getItem('testResultsDatabase')) || [];
    let myHistory = allTests.filter(test => test.email === email);
    let container = document.getElementById('history-list');
    if (myHistory.length === 0) {
        container.innerHTML = `<p style="text-align:center;">No tests attempted yet for <strong>${email}</strong>.</p>`;
    } else {
        let html = `<p style="color: #007bff; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Showing history for: <strong>${name} (${email})</strong></p>`;
        html += myHistory.reverse().map((test) => `
            <div class="history-item" style="background: #f9f9f9; padding: 10px; border-radius: 5px; border-left: 5px solid #17a2b8; margin-bottom: 10px; color: #333;">
                <strong>Test:</strong> ${test.subject} <br>
                <strong>Score:</strong> ${test.score} / ${test.maxScore} <br>
                <strong>Date Attempted:</strong> ${test.date}
            </div>
        `).join("");
        container.innerHTML = html;
    }
}

// --- CLOUD OWNER DASHBOARD ---
async function ownerAccess() {
    if (prompt("Master Password:") === "owner123") { 
        alert("Fetching active users from cloud database...");
        try {
            let response = await fetch(WEB_APP_URL + "?action=get_users");
            let result = await response.json();
            
            document.getElementById('owner-modal').classList.remove('hidden');
            let html = `<h4>Total Active Users (Cloud): ${result.users.length - 1}</h4><hr>`;
            
            for(let i = 1; i < result.users.length; i++) {
                let u = result.users[i];
                html += `<p>${i}. ${u.name} (${u.email}) <br><em>Status: ${u.status}</em></p><hr>`;
            }
            document.getElementById('user-list-container').innerHTML = html;
        } catch (error) {
            alert("Failed to load users from cloud.");
        }
    } else {
        alert("Access Denied.");
    }
}

// --- SLIDER & QUESTION NAVIGATION ---
function updateSliderView() {
    const track = document.getElementById('question-container');
    track.style.transform = `translateX(-${currentQuestionIndex * 100}%)`;
    document.getElementById('prev-btn').style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
    
    if (currentQuestionIndex === totalQuestions - 1) {
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('submit-btn').classList.remove('hidden');
    } else {
        document.getElementById('next-btn').classList.remove('hidden');
        document.getElementById('submit-btn').classList.add('hidden');
    }
}

function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        updateSliderView();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateSliderView();
    }
}

function clearAnswer() {
    const currentInputs = document.querySelectorAll(`input[name="q${currentQuestionIndex}"]`);
    currentInputs.forEach(input => input.checked = false);
}

function togglePause() {
    isPaused = !isPaused;
    const btn = document.getElementById('pause-btn');
    const container = document.querySelector('.slider-viewport');
    if (isPaused) {
        btn.innerText = "▶ Resume";
        btn.style.backgroundColor = "#ffc107"; 
        container.style.opacity = "0.1";
        container.style.pointerEvents = "none";
    } else {
        btn.innerText = "⏸ Pause";
        btn.style.backgroundColor = "#17a2b8";
        container.style.opacity = "1";
        container.style.pointerEvents = "auto";
    }
}

// --- CLOUD TEST ENGINE ---
async function startTest(subject) {
    pendingSubject = subject;
    
    // Loading State
    document.getElementById('confirm-subject').innerText = "Loading test from server...";
    document.getElementById('confirm-questions').innerText = "...";
    document.getElementById('confirm-time').innerText = "...";
    openExclusiveView('confirmation-modal');
    
    try {
        // Sheet se questions fetch karna
        let response = await fetch(WEB_APP_URL + "?action=get_quiz&class=" + encodeURIComponent(currentClass) + "&subject=" + encodeURIComponent(subject));
        let result = await response.json();
        
        if (result.success && result.quiz.length > 0) {
            activeQuizData = result.quiz; // Data save kar liya
            
            let secondsPerQuestion = 60; 
            if (subject === 'Math') secondsPerQuestion = 240; 
            else if (subject === 'Science') secondsPerQuestion = 180; 
            let totalTime = activeQuizData.length * secondsPerQuestion;
            
            document.getElementById('confirm-subject').innerText = `${currentClass} - ${subject}`;
            document.getElementById('confirm-questions').innerText = activeQuizData.length;
            document.getElementById('confirm-time').innerText = formatTime(totalTime) + " (Minutes:Seconds)";
        } else {
            alert("No questions found for this subject yet!");
            goBack();
        }
    } catch (error) {
        alert("Network error while loading test.");
        goBack();
    }
}

function confirmStartTest() {
    let subject = pendingSubject;
    currentSubject = subject;
    isPaused = false; 
    currentQuestionIndex = 0;
    
    document.getElementById('pause-btn').innerText = "⏸ Pause";
    document.getElementById('pause-btn').style.backgroundColor = "#17a2b8";
    document.querySelector('.slider-viewport').style.opacity = "1";
    document.querySelector('.slider-viewport').style.pointerEvents = "auto";

    openExclusiveView('test-modal');
    document.getElementById('test-title').innerText = `${currentClass} - ${subject} Test`;
    
    totalQuestions = activeQuizData.length;
    
    let qHTML = "";
    activeQuizData.forEach((item, index) => {
        qHTML += `<div class="question-card">`;
        qHTML += `<p class="question-text">Q${index+1}. ${item.q}</p>`;
        item.options.forEach((opt, i) => {
            qHTML += `<label class="option-label"><input type="radio" name="q${index}" value="${i}"> ${opt}</label>`;
        });
        qHTML += `</div>`;
    });
    document.getElementById('question-container').innerHTML = qHTML;
    
    updateSliderView();

    let secondsPerQuestion = 60; 
    if (subject === 'Math') secondsPerQuestion = 240; 
    else if (subject === 'Science') secondsPerQuestion = 180; 

    timeLeft = activeQuizData.length * secondsPerQuestion;
    document.getElementById('timer').innerText = formatTime(timeLeft);
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            document.getElementById('timer').innerText = formatTime(timeLeft);
            if (timeLeft <= 0) {
                alert("Time is up!");
                submitTest(); 
            }
        }
    }, 1000);
}

function submitTest() {
    clearInterval(timerInterval);
    let score = 0, correctHTML = "", wrongHTML = "";
    
    activeQuizData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === item.ans) {
            score++;
            correctHTML += `<li><strong>${item.q}</strong><br>Your Answer: ${item.options[selected.value]}</li><hr>`;
        } else {
            let userAns = selected ? item.options[selected.value] : "Not attempted";
            wrongHTML += `<li><strong>${item.q}</strong><br>Your Attempt: ${userAns} <br>Correct: ${item.options[item.ans]}</li><hr>`;
        }
    });

    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName') || "Student";
    const testSignature = `${currentClass} - ${currentSubject}`;
    const currentDate = new Date().toLocaleString();

    // 1. क्लाउड (Google Sheet) पर रिजल्ट भेजना (BACKGROUND PROCESS)
    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ 
            action: "save_result", 
            name: userName, 
            email: userEmail, 
            subject: testSignature, 
            score: score, 
            maxScore: activeQuizData.length, 
            date: currentDate 
        })
    }).catch(error => console.error("Cloud save failed:", error));

    // 2. लोकल ब्राउज़र हिस्ट्री (My History के लिए)
    let allTests = JSON.parse(localStorage.getItem('testResultsDatabase')) || [];
    allTests.push({ 
        email: userEmail, 
        subject: testSignature, 
        score: score, 
        maxScore: activeQuizData.length,
        date: currentDate
    });
    localStorage.setItem('testResultsDatabase', JSON.stringify(allTests));

    let subjectResults = allTests.filter(t => t.subject === testSignature);
    subjectResults.sort((a, b) => b.score - a.score);
    let myRank = subjectResults.findIndex(t => t.email === userEmail && t.score === score) + 1;
    let totalAttempts = subjectResults.length;

    // Back button ko wapas Subject Dashboard par bhejne ke liye (Aapka code surakshit hai)
    viewHistoryStack = ['main-dashboard', 'subject-dashboard']; 
    
    // रिजल्ट स्क्रीन शो करना
    openExclusiveView('result-modal');
    document.getElementById('score').innerText = `${score} / ${activeQuizData.length}`;
    document.getElementById('rank').innerText = `#${myRank} out of ${totalAttempts} attempts for this specific test`; 
    document.getElementById('correct-list').innerHTML = correctHTML || "<li>None</li>";
    document.getElementById('wrong-list').innerHTML = wrongHTML || "<li>None</li>";
}
// --- SUBJECT & CHAPTER LOGIC ---

// 1. Jab koi Subject par click karega:
function handleSubjectSelection(subject) {
    currentSubject = subject;
    
    if (currentCategory === 'Test Series') {
        // Test Series ko bilkul nahi chheda, ye pehle jaisa chalega
        startTest(subject); 
    } else {
        // Baaki sabke liye Chapters dikhayega
        showChapters(subject); 
    }
}

// 2. Chapters ke buttons automatically banana:
function showChapters(subject) {
    let chapterContainer = document.getElementById('chapter-list');
    chapterContainer.innerHTML = ""; // Purane buttons clear karein
    
    document.getElementById('chapter-title').innerText = `${currentClass} - ${subject} (${currentCategory})`;

    let categoryData = pdfDatabase[currentCategory];
    
    // Check karna ki is class aur subject ke chapters database me hain ya nahi
    if (categoryData && categoryData[currentClass] && categoryData[currentClass][subject]) {
        let chapters = categoryData[currentClass][subject];
        
        chapters.forEach(ch => {
            let btn = document.createElement('button');
            btn.className = "chapter-btn"; // Naya aur saaf design class
            // Inline CSS hata diya taaki loading fast ho
            btn.innerText = ch.name;
            btn.onclick = () => openPDFViewer(ch.name, ch.link);
            chapterContainer.appendChild(btn);
        });
    } else {
        chapterContainer.innerHTML = "<p style='text-align:center; color: red;'>Chapters coming soon!</p>";
    }

    viewHistoryStack = ['main-dashboard', 'subject-dashboard']; 
    openExclusiveView('chapter-dashboard');
}

// 3. PDF ko Website ke andar Modal mein kholna:
function openPDFViewer(chapterName, pdfUrl) {
    document.getElementById('pdf-title').innerText = chapterName;
    document.getElementById('pdf-iframe').src = pdfUrl;
    
    viewHistoryStack = ['main-dashboard', 'subject-dashboard', 'chapter-dashboard'];
    openExclusiveView('pdf-viewer-modal');
}
/* ==========================================
   VIDEO DATABASE (Class -> Subject -> Chapters)
   ========================================== */
const videoDatabase = {
    "Class 10": {
        "Science": [
            { name: "Chapter 1: Chemical Reactions and Equations", link: "https://www.youtube.com/embed/YOUR_VIDEO_ID_1" },
            { name: "Chapter 3: Metals and Non-Metals", link: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2" },
            { name: "Chapter 11: Electricity", link: "https://www.youtube.com/embed/YOUR_VIDEO_ID_3" }
        ],
        "Maths": [
            { name: "Chapter 1: Real Numbers", link: "https://www.youtube.com/embed/YOUR_MATHS_VIDEO_ID" }
        ]
    },
    "Class 9": {
        "Science": [
            { name: "Matter in Our Surroundings", link: "https://www.youtube.com/embed/VIDEO_ID" }
        ]
    }
    // ऐसे ही आप और Classes और Subjects जोड़ सकते हैं
};


/* ==========================================
   VIDEO FLOW FUNCTIONS
   ========================================== */

// 1. Class सेलेक्ट करने के बाद Subjects दिखाना
function showVideoSubjects(className) {
    let container = document.getElementById('video-container');
    container.innerHTML = ""; // पुराना डेटा साफ़ करें
    document.getElementById('video-title').innerText = className + " - Select Subject";

    // अगर डेटाबेस में उस क्लास का डेटा है
    if(videoDatabase[className]) {
        let subjects = Object.keys(videoDatabase[className]);
        
        subjects.forEach(sub => {
            let btn = document.createElement('button');
            btn.className = "chapter-btn"; // PDF वाले सेक्शन की CSS क्लास ही यूज़ की है
            btn.innerText = sub;
            btn.onclick = () => showVideoChapters(className, sub);
            container.appendChild(btn);
        });
    } else {
        container.innerHTML = "<p style='text-align:center;'>Videos coming soon!</p>";
    }
}

// 2. Subject सेलेक्ट करने के बाद Chapters (YouTube Logo के साथ) दिखाना
function showVideoChapters(className, subjectName) {
    let container = document.getElementById('video-container');
    container.innerHTML = ""; 
    document.getElementById('video-title').innerText = className + " - " + subjectName;

    let chapters = videoDatabase[className][subjectName];

    chapters.forEach(ch => {
        let btn = document.createElement('button');
        btn.className = "video-chapter-btn"; // हमारी नई YouTube स्टाइल वाली क्लास
        
        // बटन के अंदर दांयी तरफ "▶ Video" बैज लगाना
        btn.innerHTML = `
            <span>${ch.name}</span> 
            <span class="yt-badge">▶ Video</span>
        `;
        
        btn.onclick = () => playVideo(ch.name, ch.link);
        container.appendChild(btn);
    });
}

// 3. वीडियो प्ले करना (Modal ओपन करना)
function playVideo(chapterName, videoUrl) {
    // डैशबोर्ड छुपाएं
    document.getElementById('video-dashboard').classList.add('hidden');
    
    // टाइटल और वीडियो लिंक सेट करें
    document.getElementById('playing-video-title').innerText = chapterName;
    document.getElementById('video-iframe').src = videoUrl;
    
    // प्लेयर वाला सेक्शन दिखाएं
    document.getElementById('video-viewer-modal').classList.remove('hidden');
}

// 4. बैक बटन (वीडियो बंद करके वापस चैप्टर्स पर जाना)
function closeVideoPlayer() {
    // iframe का src खाली करना ज़रूरी है ताकि बैकग्राउंड में वीडियो की आवाज़ न आती रहे
    document.getElementById('video-iframe').src = "";
    
    // प्लेयर छुपाएं
    document.getElementById('video-viewer-modal').classList.add('hidden');
    
    // वापस चैप्टर्स का डैशबोर्ड दिखाएं
    document.getElementById('video-dashboard').classList.remove('hidden');
}
/* =======================================================
   DEVICE HARDWARE BACK BUTTON SYNC (MOBILE & PC)
   ======================================================= */

// 1. जब ऐप खुले, तो ब्राउज़र की हिस्ट्री में एक बेस (Home) स्टेट सेव कर दें
window.history.pushState({ state: 'home' }, "", "");

// 2. जब यूजर डिवाइस का बैक बटन (या मोबाइल का बैक जेस्चर) यूज़ करे
window.addEventListener('popstate', function (event) {
    
    // स्क्रीन पर दिख रहे आपके HTML वाले "Back" बटन को ढूंढें
    let backButton = Array.from(document.querySelectorAll('button')).find(
        btn => btn.innerText.toLowerCase().includes('back') && btn.offsetParent !== null
    );

    if (backButton) {
        // अगर स्क्रीन पर आपका Back बटन मौजूद है, तो उसे बैकग्राउंड में ऑटो-क्लिक करवा दें
        backButton.click();
        
        // ब्राउज़र को ऐप से बाहर निकलने से रोकने के लिए हिस्ट्री में वापस एक स्टेट डाल दें
        window.history.pushState({ state: 'inner' }, "", "");
    } 
    // अगर स्क्रीन पर Back बटन नहीं है (यानी यूजर होम स्क्रीन पर है), तो ऐप नार्मल तरीके से क्लोज हो जाएगा।
});

// 3. जब भी यूजर आगे बढ़े (किसी Class/Subject/Video पर क्लिक करे), तो हिस्ट्री में एक पॉइंट जोड़ें
document.addEventListener('click', function (e) {
    let btn = e.target.closest('button'); // क्लिक किये गए बटन को पकड़े
    
    // अगर क्लिक किया गया बटन "Back" या "Menu" नहीं है, तो हिस्ट्री अपडेट करें
    if (btn && !btn.innerText.toLowerCase().includes('back') && !btn.innerText.toLowerCase().includes('menu')) {
        window.history.pushState({ state: 'inner' }, "", "");
    }
});

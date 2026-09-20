// --- DATABASE & TRANSLATION ---
const quizDatabase = {
    'Class 6': {
        'SST': [{ q: "What is the shape of the Earth?", options: ["Flat", "Spherical"], ans: 1 }],
        'Science': [{ q: "Which part of the plant makes food?", options: ["Root", "Leaf"], ans: 1 }],
        'Math': [{ q: "What is 5 x 6?", options: ["25", "30"], ans: 1 }],
        'English': [{ q: "Which is a noun?", options: ["Run", "Apple"], ans: 1 }],
        'Hindi': [{ q: "हिंदी वर्णमाला में कितने स्वर होते हैं?", options: ["11", "33"], ans: 0 }]
    },
    'Class 7': {
        'SST': [{ q: "Who built the Taj Mahal?", options: ["Akbar", "Shah Jahan"], ans: 1 }],
        'Science': [{ q: "What is the chemical symbol for Water?", options: ["H2O", "O2"], ans: 0 }],
        'Math': [{ q: "What is 7²?", options: ["14", "49"], ans: 1 }],
        'English': [{ q: "Antonym of 'Beautiful'?", options: ["Ugly", "Pretty"], ans: 0 }],
        'Hindi': [{ q: "'सूर्य' का पर्यायवाची क्या है?", options: ["दिनकर", "निशाकर"], ans: 0 }]
    },
    'Class 8': {
        'SST': [{ q: "When did India gain independence?", options: ["1947", "1950"], ans: 0 }],
        'Science': [{ q: "Which gas do humans breathe out?", options: ["Oxygen", "Carbon Dioxide"], ans: 1 }],
        'Math': [{ q: "Square root of 64?", options: ["6", "8"], ans: 1 }],
        'English': [{ q: "Past tense of 'Go'?", options: ["Went", "Gone"], ans: 0 }],
        'Hindi': [{ q: "जो कभी न मरे उसे क्या कहते हैं?", options: ["अमर", "अजर"], ans: 0 }]
    },
    'Class 9': {
        'SST': [{ q: "French Revolution started in?", options: ["1789", "1800"], ans: 0 }],
        'Science': [{ q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria"], ans: 1 }],
        'Math': [{ q: "Value of Pi (approx)?", options: ["3.14", "3.41"], ans: 0 }],
        'English': [{ q: "Meaning of 'Abundant'?", options: ["Scarce", "Plentiful"], ans: 1 }],
        'Hindi': [{ q: "'आग' का तत्सम रूप क्या है?", options: ["अग्नि", "अनल"], ans: 0 }]
    },
    'Class 10': {
        'SST': [
            { q: "Identify the correct soil: Heavy Rainfall + High Leaching, Useful for growing Coffee and Tea.", options: ["Alluvial soil", "Laterite soil", "Red soil", "Black soil"], ans: 1 },
            { q: "Match the following: I. Primitive subsistence, II. Intensive subsistence, III. Commercial, IV. Plantation WITH a. Modern inputs, b. Single crop large scale, c. Slash and burn, d. Labour intensive.", options: ["I-c, II-a, III-d, IV-b", "I-a, II-b, III-d, IV-c", "I-c, II-d, III-a, IV-b", "I-d, II-c, III-b, IV-a"], ans: 2 },
            { q: "Identify the state related with Chipko Movement?", options: ["Bihar", "Uttarakhand", "Madhya Pradesh", "Rajasthan"], ans: 1 },
            { q: "Which of the following pairs is correctly matched?", options: ["Periyar - Madhya Pradesh", "Manas - Assam", "Bandhavgarh - Rajasthan", "Corbett - Uttar Pradesh"], ans: 1 },
            { q: "In which Indian State is the 'bamboo drip irrigation' system used?", options: ["Himachal Pradesh", "Kerala", "Rajasthan", "Meghalaya"], ans: 3 },
            { q: "Identify the plantation crop from the following:", options: ["Wheat", "Bajra", "Rice", "Rubber"], ans: 3 },
            { q: "Match shifting cultivations: a) Roka, b) Milpa, c) Ladang, d) Kruwa WITH i) Jharkhand, ii) Indonesia, iii) Brazil, iv) Mexico", options: ["a-i, b-ii, c-iii, d-iv", "a-iii, b-iv, c-ii, d-i", "a-ii, b-iii, c-iv, d-i", "a-iii, b-iv, c-i, d-ii"], ans: 1 },
            { q: "Match the Dams with States: a) Tilaiya, b) Mettur, c) Koyna, d) Tehri WITH i) Tamil Nadu, ii) Maharashtra, iii) Uttarakhand, iv) Jharkhand", options: ["a-iv, b-i, c-iii, d-ii", "a-iv, b-i, c-ii, d-iii", "a-ii, b-iii, c-iv, d-i", "a-iii, b-iv, c-i, d-ii"], ans: 1 },
            { q: "Match Soils with Characteristics: a. Alluvial, b. Black, c. Laterite, d. Arid WITH i. Sandy/saline, ii. Very fertile, iii. Lava parent rocks, iv. Decrease in humus", options: ["a-ii, b-iii, c-i, d-iv", "a-iii, b-ii, c-iv, d-i", "a-iii, b-ii, c-i, d-iv", "a-ii, b-iii, c-iv, d-i"], ans: 3 }
        ],
        'Science': [{ q: "What is the SI unit of Work?", options: ["Joule", "Watt"], ans: 0 }],
        'Math': [{ q: "Sum of angles in a triangle?", options: ["180°", "360°"], ans: 0 }],
        'English': [{ q: "Antonym of 'Exodus'?", options: ["Arrival", "Departure"], ans: 0 }],
        'Hindi': [{ q: "'कमल' का पर्यायवाची शब्द?", options: ["जलज", "नभ"], ans: 0 }]
    }
};

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

let timerInterval;
let currentClass = "";
let currentSubject = "";
let pendingSubject = "";
let currentCategory = ""; 
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
    // Temporarily forcing the popup to show every time for testing!
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
        document.getElementById('nav-auth-btn').classList.add('hidden');
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
    if (viewId === 'main-dashboard' || viewId === 'result-modal') {
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

// Routes clicking a homepage box to the vertical class list
function openClassSelection(title) {
    currentCategory = title; 
    document.getElementById('class-selection-title').innerText = title + " - Select Class";
    openExclusiveView('class-selection-dashboard');
}

// --- NEW GOOGLE DRIVE ROUTING LOGIC ---
function selectClass(className) {
    if (currentCategory === 'Test Series') {
        showSubjects(className);
    } 
    else if (currentCategory === 'Books' ) {
        
        let linkToOpen = "";
        
        // REPLACE THESE PLACEHOLDER LINKS WITH YOUR ACTUAL GOOGLE DRIVE LINKS
        if (className === 'Class 6') { linkToOpen = ""; }
        else if (className === 'Class 7') { linkToOpen = ""; }
        else if (className === 'Class 8') { linkToOpen = "https://drive.google.com/drive/folders/1t25mEnxxmk4zYNbYME5M2ibxrIw3ngZW?usp=drive_link"; }
        else if (className === 'Class 9') { linkToOpen = "https://drive.google.com/drive/folders/1cHZuKzCqRO_gKIuss6ARTN5bK8QTbdur?usp=sharing"; }
        else if (className === 'Class 10') { linkToOpen = "https://drive.google.com/drive/folders/1iPV4oj-tDQFLvGoHocgDWqlqPyqI4Tpf?usp=sharing"; }
        
        if (linkToOpen !== "" && linkToOpen !== "PASTE_CLASS_10_DRIVE_LINK_HERE") {
            window.open(linkToOpen, '_blank');
        } else {
            alert('Links have not been added for ' + className + ' yet!');
        }
    } 
    else if (currentCategory === 'Quick Revision' ) {
        
        let linkToOpen = "";
        
        // REPLACE THESE PLACEHOLDER LINKS WITH YOUR ACTUAL GOOGLE DRIVE LINKS
        if (className === 'Class 6') { linkToOpen = "https://drive.google.com/drive/folders/1Q1ms3CcxdYq3Sry1aNBpwJ18NOJBMsg0?usp=drive_link"; }
        else if (className === 'Class 7') { linkToOpen = "https://drive.google.com/drive/folders/100hNOJA0tuP6nfa4e1cGcqD7mlMlB8N1?usp=drive_link"; }
        else if (className === 'Class 8') { linkToOpen = "https://drive.google.com/drive/folders/1t25mEnxxmk4zYNbYME5M2ibxrIw3ngZW?usp=drive_link"; }
        else if (className === 'Class 9') { linkToOpen = "https://drive.google.com/drive/folders/14c97WPMDFqKmc2m_LwaGs5H9Cr6vB1QO?usp=drive_link"; }
        else if (className === 'Class 10') { linkToOpen = "https://drive.google.com/drive/folders/1Uizr19qlhmC6XFulsXDL6iRSN1qIt11r"; }
        
        if (linkToOpen !== "" && linkToOpen !== "PASTE_CLASS_10_DRIVE_LINK_HERE") {
            window.open(linkToOpen, '_blank');
        } else {
            alert('Links have not been added for ' + className + ' yet!');
        }
    }  
          else if (currentCategory === 'Solutions' ) {
        
        let linkToOpen = "";
        
        // REPLACE THESE PLACEHOLDER LINKS WITH YOUR ACTUAL GOOGLE DRIVE LINKS
        if (className === 'Class 6') { linkToOpen = ""; }
        else if (className === 'Class 7') { linkToOpen = ""; }
        else if (className === 'Class 8') { linkToOpen = "https://drive.google.com/drive/folders/1t25mEnxxmk4zYNbYME5M2ibxrIw3ngZW?usp=drive_link"; }
        else if (className === 'Class 9') { linkToOpen = "https://drive.google.com/drive/folders/1cHZuKzCqRO_gKIuss6ARTN5bK8QTbdur?usp=sharing"; }
        else if (className === 'Class 10') { linkToOpen = "https://drive.google.com/drive/folders/1iPV4oj-tDQFLvGoHocgDWqlqPyqI4Tpf?usp=sharing"; }
        
        if (linkToOpen !== "" && linkToOpen !== "PASTE_CLASS_10_DRIVE_LINK_HERE") {
            window.open(linkToOpen, '_blank');
        } else {
            alert('Links have not been added for ' + className + ' yet!');
        }
    } 
    else if (currentCategory === 'Video Explanation') {
        // 1. Update the title of the video screen
        document.getElementById('video-title').innerText = className + " - Video Explanations";
        
        let videoHTML = "";
        
        // 2. Paste your YouTube Iframe codes here for each class!
        // You can add multiple iframes inside the backticks ( ` ) if a class has more than one video.
        
        if (className === 'Class 6') { 
            videoHTML = `
                <!-- Replace this iframe with your Class 6 video -->
                <iframe width="100%" height="250" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe>
            `; 
        }
        else if (className === 'Class 7') { 
            videoHTML = `
                <!-- Replace this iframe with your Class 7 video -->
                <iframe width="100%" height="250" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe>
            `; 
        }
        else if (className === 'Class 8') { 
            videoHTML = `
                <iframe width="100%" height="250" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe>
            `; 
        }
        else if (className === 'Class 9') { 
            videoHTML = `
                <iframe width="100%" height="250" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe>
            `; 
        }
        else if (className === 'Class 10') { 
            videoHTML = `
              <h4 style="text-align: left; margin-bottom: 5px;">Test Video: Chapter 1 Chemical Reactions</h4>  
              <iframe width="891" height="501" src="https://www.youtube.com/embed/1wQqGFebxyA" title="Intro to Chemical reactions | Chemical equation and reactions | Chemistry | Khan Academy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            `; 
        }

        // 3. Push the video to the screen and open it
        if (videoHTML.includes("YOUR_VIDEO_ID")) {
            alert('Please paste your real YouTube embed codes in script.js for ' + className);
        } else {
            document.getElementById('video-container').innerHTML = videoHTML;
            openExclusiveView('video-dashboard');
        }
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

// Apna Web App URL yahan daalein (Inverted commas ke andar)
const WEB_APPURL = "https://script.google.com/macros/s/AKfycbw1E2tQUo2BUsYmygPdtO9VBBN8Pv06ureE0MiWo2zBzXr0vXO6fag51uWrC1Y8-jrI/exec";

// --- AUTHENTICATION ---
async function handleAuth() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value;
    
    if (!email) { alert("Please enter a valid email address."); return; }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(pass)) { alert("Password must be exactly 8 alphanumeric characters."); return; }
    
    let allUsers = JSON.parse(localStorage.getItem('websiteUsersDatabase')) || [];
    let existingUser = allUsers.find(u => u.email === email);
    const encryptedPass = btoa(pass); 

    if (existingUser) {
        if (existingUser.password === encryptedPass) {
            alert("Checking authentication status from server...");
            try {
                let response = await fetch(WEB_APP_URL + "?email=" + email);
                let result = await response.json();
                
                if (result.status === "Pending") {
                    alert("Wait For Authentication. Your account is still under review.");
                } 
                else if (result.status === "Pay") {
                    alert("Premium Account Required. Please subscribe to continue.");
                } 
                else if (result.status === "Free") {
                    alert("Authentication Successful!");
                    localStorage.setItem('userName', existingUser.name);
                    localStorage.setItem('userEmail', existingUser.email);
                    closeToHome();
                    checkLoginPopup();
                    location.reload(); 
                } 
                else {
                    alert("Error: Account not found on server.");
                }
            } catch (error) {
                alert("Network error! Please check your internet connection.");
            }
        } else {
            alert("Incorrect password.");
        }
    } else {
        if (!name) { alert("Please enter your Full Name to create a new account."); return; }
        
        alert("Registering account, please wait...");
        try {
            let response = await fetch(WEB_APP_URL, {
                method: "POST",
                body: JSON.stringify({ name: name, email: email })
            });
            let result = await response.json();
            
            if(result.result === "success") {
                allUsers.push({ name: name, email: email, password: encryptedPass }); 
                localStorage.setItem('websiteUsersDatabase', JSON.stringify(allUsers));
                
                alert("Account created successfully! Wait For Authentication. Your account is under review by the administrator.");
                closeToHome();
                checkLoginPopup();
            }
        } catch (error) {
            alert("Network error! Could not create account.");
        }
    }
}

// --- BAAKI KE PURANE FUNCTIONS (RESTORED) ---
function logout() { 
    localStorage.removeItem('userName'); 
    localStorage.removeItem('userEmail'); 
    location.reload(); 
}

function handlePasswordReset() {
    const email = document.getElementById('reset-email').value.trim();
    const name = document.getElementById('reset-name').value.trim();
    const newPass = document.getElementById('new-password').value;
    if (!email || !name) { alert("Please enter both your registered Email and Full Name."); return; }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(newPass)) { alert("Your new password must be exactly 8 alphanumeric characters."); return; }
    let allUsers = JSON.parse(localStorage.getItem('websiteUsersDatabase')) || [];
    let userIndex = allUsers.findIndex(u => u.email.toLowerCase() === email.toLowerCase() && u.name.toLowerCase() === name.toLowerCase());
    if (userIndex !== -1) {
        allUsers[userIndex].password = btoa(newPass);
        localStorage.setItem('websiteUsersDatabase', JSON.stringify(allUsers));
        alert("Success! Your password has been reset.");
        goBack(); 
    } else alert("Error: Account matching that Email and Full Name not found.");
}

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

function ownerAccess() {
    if (prompt("Master Password:") === "owner123") { 
        document.getElementById('owner-modal').classList.remove('hidden');
        let allUsers = JSON.parse(localStorage.getItem('websiteUsersDatabase')) || [];
        let html = `<h4>Total Active Users: ${allUsers.length}</h4><hr>`;
        allUsers.forEach((u, i) => html += `<p>${i+1}. ${u.name} (${u.email}) <br><em>Pass: [HIDDEN]</em></p><hr>`);
        document.getElementById('user-list-container').innerHTML = html;
    } else alert("Access Denied.");
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

// --- TEST ENGINE (WITH CONFIRMATION) ---
function startTest(subject) {
    pendingSubject = subject;
    let activeQuiz = quizDatabase[currentClass][subject];
    
    let secondsPerQuestion = 60; 
    if (subject === 'Math') secondsPerQuestion = 240; 
    else if (subject === 'Science') secondsPerQuestion = 180; 
    let totalTime = activeQuiz.length * secondsPerQuestion;
    
    document.getElementById('confirm-subject').innerText = `${currentClass} - ${subject}`;
    document.getElementById('confirm-questions').innerText = activeQuiz.length;
    document.getElementById('confirm-time').innerText = formatTime(totalTime) + " (Minutes:Seconds)";
    
    openExclusiveView('confirmation-modal');
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
    
    let activeQuiz = quizDatabase[currentClass][subject];
    totalQuestions = activeQuiz.length;
    
    let qHTML = "";
    activeQuiz.forEach((item, index) => {
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

    timeLeft = activeQuiz.length * secondsPerQuestion;
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
    let activeQuiz = quizDatabase[currentClass][currentSubject];
    
    activeQuiz.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === item.ans) {
            score++;
            correctHTML += `<li><strong>${item.q}</strong><br>Your Answer: ${item.options[selected.value]}</li><hr>`;
        } else {
            let userAns = selected ? item.options[selected.value] : "Not attempted";
            wrongHTML += `<li><strong>${item.q}</strong><br>Your Attempt: ${userAns} <br>Correct: ${item.options[item.ans]}</li><hr>`;
        }
    });

    let allTests = JSON.parse(localStorage.getItem('testResultsDatabase')) || [];
    const userEmail = localStorage.getItem('userEmail');
    const testSignature = `${currentClass} - ${currentSubject}`;
    
    allTests.push({ 
        email: userEmail, 
        subject: testSignature, 
        score: score, 
        maxScore: activeQuiz.length,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('testResultsDatabase', JSON.stringify(allTests));

    let subjectResults = allTests.filter(t => t.subject === testSignature);
    subjectResults.sort((a, b) => b.score - a.score);
    let myRank = subjectResults.findIndex(t => t.email === userEmail && t.score === score) + 1;
    let totalAttempts = subjectResults.length;

    openExclusiveView('result-modal');
    document.getElementById('score').innerText = `${score} / ${activeQuiz.length}`;
    document.getElementById('rank').innerText = `#${myRank} out of ${totalAttempts} attempts for this specific test`; 
    document.getElementById('correct-list').innerHTML = correctHTML || "<li>None</li>";
    document.getElementById('wrong-list').innerHTML = wrongHTML || "<li>None</li>";
}
// अपना Web App URL यहाँ डालें (Inverted commas के अंदर)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw1E2tQUo2BUsYmygPdtO9VBBN8Pv06ureE0MiWo2zBzXr0vXO6fag51uWrC1Y8-jrI/exec";

// 1. जब नया स्टूडेंट Sign Up करेगा
async function registerUser(name, email) {
    alert("Please wait, sending your request..."); // लोडिंग मैसेज
    
    try {
        let response = await fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify({ name: name, email: email })
        });
        
        let result = await response.json();
        if(result.result === "success") {
            // रिक्वेस्ट सेंड होने के बाद का पॉप-अप
            alert("Wait For Authentication. Your account is under review by the administrator.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
}

// 2. जब स्टूडेंट Log In करेगा
async function checkUserStatus(email) {
    alert("Checking your account status..."); // लोडिंग मैसेज
    
    try {
        // GET रिक्वेस्ट से स्टेटस चेक करना
        let response = await fetch(WEB_APP_URL + "?email=" + email);
        let result = await response.json();

        if (result.status === "Pending") {
            alert("Wait For Authentication. Your account is still under review.");
        } 
        else if (result.status === "Free") {
            alert("Authentication Successful!");
            // यहाँ आप अपने मेन डैशबोर्ड को ओपन करने का कोड डाल सकते हैं
            // उदाहरण: openDashboard();
        } 
        else if (result.status === "Pay") {
            alert("Premium Account Required. Please subscribe to continue.");
            // यहाँ आप अपने QR Code या सब्सक्रिप्शन वाले पेज को दिखा सकते हैं
            // उदाहरण: showSubscriptionPage();
        } 
        else {
            alert("Account not found. Please Sign Up first.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

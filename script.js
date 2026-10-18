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
const pdfDatabase = {
"Quick Revision": {
  "Class 10": {"Science": [ { name: "Chapter 1: Chemical Reactions", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" },
                           { name: "Chapter 2: Acids, Bases and Salts", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
                           ],
             "Math": [ { name: "Chapter 1: Real Numbers", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
                      ],
             "SST": [ {name: "History|Chapter 1: Nationalism", link: "" }],
             "English": [{name: "Grammer: Tense", link:"https://drive.google.com/file/d/1dvfUZiI1xNfBfyeSahZq1C9cMpYVwbZy/preview"},
                     {name:"Chapter 1 First Flight: A letter to God", link: "https://drive.google.com/file/d/1nwEXRmxT6mbXwEU_QuXtFSNr_Ne7P84Y/preview"},
             ],       
        },
  "Class 9": { "Science": [  { name: "Chapter 1: Matter in Our Surroundings", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" },
            ],
     "SST": [{name: "Geography(Part 1)Chapter 1:Shaping of the Earths Surface", link: "https://drive.google.com/file/d/1rEo97sAT--WI6IrT0nRTHc_vDdAVfMBM/preview"},
          {name: "Geography(Part 2)Chapter 1: Oceans and Life", link: "https://drive.google.com/file/d/1XMUph4SVGKBT9xZkalN56LURdYCtNAgN/preview"},
     ],       
        }
    },
"Books": 
   {"Class 10": {"Science": [ { name: "Chapter 1: Chemical Reactions", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" },
                           { name: "Chapter 2: Acids, Bases and Salts", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" },
                           ],
                 "Math": [ { name: "Chapter 1: Real Numbers", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" },
                         ],
                 "Hindi":[{ },
                 ], 
                       
        },
  "Class 9": { "Science": [  { name: "Chapter 1: Matter in Our Surroundings", link: "https://drive.google.com/file/d/YOUR_FILE_ID/preview" }
            ]
        }
        },

"Solutions": 
{"Class 10": {"Hindi": [ { name:"Chapter 1: पद(kshitiz)", link:"https://drive.google.com/file/d/1O-wr_asJ_SiMralT_B7igRV5C8gSacje/preview" },
      {name:"Chapter 2: (क्षितिज)राम-लक्ष्मण-परशुराम संवाद",link:"https://drive.google.com/file/d/1o1ZrxsVL_e-cuwBvckoY3TEl8LBpOjs4/preview"},
      {name:"Chapter 10: (क्षितिज)नेताजी का चश्मा",link:"https://drive.google.com/file/d/1uzfldG3VBzJRszqMbu3s4WAmOy6M966X/preview"},
     {name:"Chapter 11: (क्षितिज)बालगोबिन भगत",link:"https://drive.google.com/file/d/12X-NJQctPGD0if-aBD3e-IR4W6SqIbYG/preview"},
                              ],
    "English":[{name:"Chapter 1 First Flight: A letter to God", link: "https://drive.google.com/file/d/1C8Ko7ZAMvf0mBqcsxdTQyrJ-JjXF8PxT/preview"},
       {name:"Chapter 1 First Flight: Dust Of Snow & Fire and Ice ", link: "https://drive.google.com/file/d/1rmLHFob-Z3pBzlValaxcjURKxVlU-dzs/preview"},
            ],
      },
    "Class 9": { "SST": [  { name:"Geography(Part 2)Chapter 1: Oceans and Life", link: "https://drive.google.com/file/d/11Xxzl53hFjzJro33Be1IOhu7_S3iygSw/preview"  }
            ]
        }, 
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
    // Aaj ki date nikalega (jaise: "Wed Oct 14 2026")
    let today = new Date().toDateString(); 
    // Browser memory se check karega ki aakhiri baar popup kab dekha tha
    let lastPopupDate = localStorage.getItem('promo_popup_date'); 

    // Agar date aaj ki nahi hai (yani aaj pehli baar open kiya hai)
    if (lastPopupDate !== today) {
        // Popup ko show kar do
        document.getElementById('promo-popup').classList.remove('hidden');
        // Phir aaj ki date save kar do taaki din bhar dobara na dikhe
        localStorage.setItem('promo_popup_date', today);
    }
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

// --- VIEW MANAGEMENT & GLOBAL BACK (100% SYNCED NEW LOGIC) ---
window.history.replaceState({ viewId: 'main-dashboard' }, "");

function openExclusiveView(viewId, isBackAction = false) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    
    // Agar bacha naye page par gaya hai, toh history mein add karo
    if (!isBackAction && viewHistoryStack[viewHistoryStack.length - 1] !== viewId) {
        viewHistoryStack.push(viewId);
        window.history.pushState({ viewId: viewId }, ""); 
    }
    
    const backBtn = document.getElementById('global-back-btn');
    if (viewId === 'main-dashboard' ) {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
    }

    if(viewId === 'history-container') renderHistory();
}

// Jab user aapka inline '⬅ Back' button dabaye
function goBack() {
    let currentView = viewHistoryStack[viewHistoryStack.length - 1];
    if (currentView === 'test-modal') {
        if (!confirm("Are you sure you want to exit? Your test progress will be lost.")) return;
        clearInterval(timerInterval);
    }
    // Browser ko seedha peeche jaane ka command
    window.history.back(); 
}

// Jab user PC ka Arrow ya Mobile ka Back Swipe kare (MAGIC YAHAN HAI)
window.addEventListener('popstate', function(event) {
    if (viewHistoryStack.length > 1) {
        let currentView = viewHistoryStack[viewHistoryStack.length - 1];
        
        if (currentView === 'test-modal') {
            if (!confirm("Are you sure you want to exit? Your test progress will be lost.")) {
                window.history.pushState({ viewId: 'test-modal' }, "");
                return;
            }
            clearInterval(timerInterval);
        }
        
        if (currentView === 'video-viewer-modal') {
            document.getElementById('video-iframe').src = "";
        }

        viewHistoryStack.pop(); 
        let prevView = viewHistoryStack[viewHistoryStack.length - 1];
        openExclusiveView(prevView, true);
    } 
});

function closeToHome() {
    viewHistoryStack = ['main-dashboard'];
    window.history.pushState({ viewId: 'main-dashboard' }, ""); 
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

    if (currentCategory !== 'Video Explanation') {
        document.getElementById('subject-title').innerText = currentClass + " Subjects";
        viewHistoryStack = ['main-dashboard', 'class-selection-dashboard'];
        openExclusiveView('subject-dashboard');
        return; 
    } else if (currentCategory === 'Video Explanation') {
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
const WEB_APP_URL="https://script.google.com/macros/s/AKfycbz46EyspzkneMWNfVqDtHTnbqdmA6Qj8s8EMkN6jI0wNG98oWqR76UCGs10q5Bhpz2d/exec";

// --- MULTI-STEP AUTH LOGIC ---
let authHistory = [];

function showAuthStep(stepId) {
    // Hide all steps
    document.querySelectorAll('.auth-step').forEach(el => el.classList.add('hidden'));
    // Show required step
    document.getElementById(stepId).classList.remove('hidden');
    
    // Manage Back Button
    const backBtn = document.getElementById('auth-back-btn');
    if (stepId === 'step-welcome') {
        backBtn.classList.add('hidden');
        authHistory = ['step-welcome'];
    } else {
        backBtn.classList.remove('hidden');
        if(authHistory[authHistory.length - 1] !== stepId) {
            authHistory.push(stepId);
        }
    }
}

function goBackAuth() {
    if(authHistory.length > 1) {
        authHistory.pop();
        let prevStep = authHistory[authHistory.length - 1];
        document.querySelectorAll('.auth-step').forEach(el => el.classList.add('hidden'));
        document.getElementById(prevStep).classList.remove('hidden');
        
        if (prevStep === 'step-welcome') {
            document.getElementById('auth-back-btn').classList.add('hidden');
        }
    }
}

function processWelcomeStep() {
    const input = document.getElementById('auth-identifier').value.trim();
    
    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (input === "") {
        alert("Please enter your email.");
        return;
    }
    
    if (emailRegex.test(input)) {
        // Agar email sahi hai toh next step par bhejo
        showAuthStep('step-choose-method');
    } else {
        alert("Please enter a VALID email address (e.g., student@gmail.com).");
    }
}

// Password dekhne/chhupane ka logic (Eye Icon)
function togglePassword(inputId) {
    const passInput = document.getElementById(inputId);
    if (passInput.type === "password") {
        passInput.type = "text";
    } else {
        passInput.type = "password";
    }
}

// Menu ke Login button ko naye modal par redirect karna
document.getElementById('nav-login-btn').onclick = function() {
    openExclusiveView('auth-modal');
    showAuthStep('step-welcome');
};
document.getElementById('nav-signup-btn').onclick = function() {
    openExclusiveView('auth-modal');
    showAuthStep('step-signup');
};

// ==========================================
// --- FIREBASE SETUP & AUTHENTICATION ---
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyArhU80g92Lx9N27E5lFsPdtRPQDefZC3Q",
  authDomain: "digital-paathsaala.firebaseapp.com",
  projectId: "digital-paathsaala",
  storageBucket: "digital-paathsaala.firebasestorage.app",
  messagingSenderId: "137172310340",
  appId: "1:137172310340:web:9e2a8d51d2be41e4311f11"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

// 1. Asli Login Function
function loginWithFirebase() {
    const email = document.getElementById('auth-identifier').value.trim();
    const pass = document.getElementById('auth-login-pass').value;

    if(!email || !pass) { alert("Please enter both email and password!"); return; }

    auth.signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.displayName || "Student");
        alert("Login Successful! Welcome to Digital Paathsaala.");
        closeToHome();
        location.reload();
    })
    .catch((error) => {
        alert("Login Failed: Incorrect Password or Email.");
    });
}

// 2. Asli Signup / Register Function
function registerWithFirebase() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value;
    const confirmPass = document.getElementById('reg-confirm-pass').value;
    const userClass = document.getElementById('reg-class').value;

    if(!name || !email || !pass || !userClass) { alert("Please fill all the details!"); return; }
    if(pass !== confirmPass) { alert("Passwords do not match!"); return; }
    if(pass.length < 6) { alert("Password must be at least 6 characters long."); return; }

    auth.createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
        const user = userCredential.user;
        return user.updateProfile({
            displayName: name
        }).then(() => {
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', name);
            alert("Account Created Successfully! You are now logged in.");
            closeToHome();
            location.reload();
        });
    })
    .catch((error) => {
        alert("Error: " + error.message);
    });
}

// 3. Asli Password Reset Function
function resetPasswordFirebase() {
    const email = document.getElementById('reset-email').value.trim();
    if(!email) { alert("Please enter your registered email address."); return; }

    auth.sendPasswordResetEmail(email)
    .then(() => {
        alert("Password reset link has been sent to your email! Please check your inbox/spam folder.");
        goBackAuth();
    })
    .catch((error) => {
        alert("Error: Could not find this email. Are you sure you are registered?");
    });
}
// 4. Asli Google Login Function
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    // Popup window open hogi Google accounts select karne ke liye
    auth.signInWithPopup(provider)
    .then((result) => {
        const user = result.user;
        
        // Data save aur login
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.displayName || "Student");
        
        alert("Google Login Successful! Welcome " + (user.displayName || ""));
        closeToHome();
        location.reload();
    })
    .catch((error) => {
        alert("Google Login Cancelled or Failed!");
        console.error(error);
    });
}
// 5. Logout Function
function logout() {
    auth.signOut().then(() => {
        // Local storage se user ka data hata rahe hain
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        // Page refresh karke wapas normal state mein la rahe hain
        location.reload();
    }).catch((error) => {
        alert("Logout fail ho gaya: " + error.message);
    });
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
    
    document.getElementById('confirm-subject').innerText = "Loading test from server...";
    document.getElementById('confirm-questions').innerText = "...";
    document.getElementById('confirm-time').innerText = "...";
    openExclusiveView('confirmation-modal');
    
    try {
        // Firebase se direct class aur subject ka data laana
        const docId = currentClass + "_" + subject; 
        const doc = await db.collection("quizzes").doc(docId).get();
        
        if (doc.exists && doc.data().questions && doc.data().questions.length > 0) {
            activeQuizData = doc.data().questions; 
            
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
        console.error("Firebase load error: ", error);
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
        // Agar image hai toh 'has-image' class add karenge
        let imageClass = item.image ? "has-image" : "";
        
        qHTML += `<div class="question-card ${imageClass}">`;
        
        // Wrapper for left side (Question + Options)
        qHTML += `<div class="question-content">`;
        qHTML += `<p class="question-text" style="font-size: 1.2em; font-weight: bold; margin-bottom: 15px;">Q${index+1}. ${item.q}</p>`;
        
        item.options.forEach((opt, i) => {
            qHTML += `<label class="option-label"><input type="radio" name="q${index}" value="${i}"> ${opt}</label>`;
        });
        qHTML += `</div>`; // Wrapper closed
        
        // Right side (Image) - Sirf tabhi aayegi jab link hoga
        if (item.image) {
            qHTML += `<img src="${item.image}" alt="Diagram" class="test-image">`;
        }
        
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

    viewHistoryStack = ['main-dashboard', 'subject-dashboard']; 
    
    openExclusiveView('result-modal');
    document.getElementById('score').innerText = `${score} / ${activeQuizData.length}`;
    document.getElementById('rank').innerText = `#${myRank} out of ${totalAttempts} attempts for this specific test`; 
    document.getElementById('correct-list').innerHTML = correctHTML || "<li>None</li>";
    document.getElementById('wrong-list').innerHTML = wrongHTML || "<li>None</li>";
}

// --- SUBJECT & CHAPTER LOGIC ---
function handleSubjectSelection(subject) {
    currentSubject = subject;
    
    if (currentCategory === 'Test Series') {
        startTest(subject); 
    } else {
        showChapters(subject); 
    }
}

function showChapters(subject) {
    let chapterContainer = document.getElementById('chapter-list');
    chapterContainer.innerHTML = ""; 
    
    document.getElementById('chapter-title').innerText = `${currentClass} - ${subject} (${currentCategory})`;

    let categoryData = pdfDatabase[currentCategory];
    
    if (categoryData && categoryData[currentClass] && categoryData[currentClass][subject]) {
        let chapters = categoryData[currentClass][subject];
        
        chapters.forEach(ch => {
            let btn = document.createElement('button');
            btn.className = "chapter-btn"; 
            btn.innerText = ch.name;
            
            // FIX YAHAN HAI: Ab tracker is action ko aasani se read kar payega
            btn.setAttribute("onclick", `openPDFViewer("${ch.name}", "${ch.link}")`);
            
            chapterContainer.appendChild(btn);
        });
    } else {
        chapterContainer.innerHTML = "<p style='text-align:center; color: red;'>Chapters coming soon!</p>";
    }

    viewHistoryStack = ['main-dashboard', 'subject-dashboard']; 
    openExclusiveView('chapter-dashboard');
}

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
            { name: "Chapter 3: Metals and Non-Metals", link: "https://www.youtube.com/embed/pQkEaH_msbs" },
            { name: "Chapter 11: Electricity", link: "https://www.youtube.com/embed/YOUR_VIDEO_ID_3" }
        ],
        "Maths": [
            { name: "Chapter 1: Real Numbers", link: "https://www.dailymotion.com/embed/video/xb3206m" }
        ]
    },
    "Class 9": {
        "Science": [
            { name: "Matter in Our Surroundings", link: "https://www.youtube.com/embed/VIDEO_ID" }
        ]
    }
};

/* ==========================================
   VIDEO FLOW FUNCTIONS (UPDATED FOR BACK LOGIC)
   ========================================== */
function showVideoSubjects(className) {
    let container = document.getElementById('video-container');
    container.innerHTML = ""; 
    document.getElementById('video-title').innerText = className + " - Select Subject";

    if(videoDatabase[className]) {
        let subjects = Object.keys(videoDatabase[className]);
        
        subjects.forEach(sub => {
            let btn = document.createElement('button');
            btn.className = "chapter-btn"; 
            btn.innerText = sub;
            btn.onclick = () => showVideoChapters(className, sub);
            container.appendChild(btn);
        });
    } else {
        container.innerHTML = "<p style='text-align:center;'>Videos coming soon!</p>";
    }
}

function showVideoChapters(className, subjectName) {
    let container = document.getElementById('video-container');
    container.innerHTML = ""; 
    document.getElementById('video-title').innerText = className + " - " + subjectName;

    let chapters = videoDatabase[className][subjectName];

    chapters.forEach(ch => {
        let btn = document.createElement('button');
        btn.className = "video-chapter-btn"; 
        
        btn.innerHTML = `
            <span>${ch.name}</span> 
            <span class="yt-badge">▶ Video</span>
        `;
        
        // FIX YAHAN HAI: Video ke liye bhi tracker friendly action
        btn.setAttribute("onclick", `playVideo("${ch.name}", "${ch.link}")`);
        
        container.appendChild(btn);
    });
}

// 3. वीडियो प्ले करना (Modal ओपन करना) - NEW
function playVideo(chapterName, videoUrl) {
    document.getElementById('playing-video-title').innerText = chapterName;
    document.getElementById('video-iframe').src = videoUrl;
    openExclusiveView('video-viewer-modal');
}

// 4. बैक बटन (वीडियो बंद करके वापस चैप्टर्स पर जाना) - NEW
function closeVideoPlayer() {
    document.getElementById('video-iframe').src = "";
    goBack(); 
}

/* ======================================================= */
// PDF ko Fullscreen karne ka logic
function toggleFullScreen() {
    let container = document.getElementById("pdf-container");
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
        document.getElementById("fullscreen-btn").innerText = "✖ Exit Fullscreen";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        document.getElementById("fullscreen-btn").innerText = "⛶ Fullscreen";
    }
}

/* =======================================================
   TEST SERIES LOGIN SECURITY GUARD (FIXED)
   ======================================================= */
function checkTestAuth(categoryName) {
    // Fix: Ab ye sahi data (userEmail) check karega jo login hone par save hota hai
    let userEmail = localStorage.getItem('userEmail'); 
    
    if (userEmail) {
        // Agar login hai (email memory mein hai), to aage badhne do
        openClassSelection(categoryName); 
    } else {
        // Agar login NAHI hai, to alert dikhao aur login form par bhejo
        alert("⚠️ Access Denied! Please Login or Register first to access the Test Series.");
        openExclusiveView('auth-modal');
        showAuthStep('step-welcome'); 
    }
}

/* =======================================================
   CONTINUE LEARNING (SMART FILTERED TRACKER - 100% USER SPECIFIC)
   ======================================================= */
document.addEventListener('click', function(e) {
    // Sirf inhi classes wale buttons ko track karega (Chapters, Videos, Subjects)
    let clickedItem = e.target.closest('.chapter-btn, .video-chapter-btn, .class-slot'); 
    
    if (clickedItem) {
        let topicText = clickedItem.innerText.trim();
        let textLower = topicText.toLowerCase();
        let itemAction = clickedItem.getAttribute('onclick'); 
        
        if (itemAction) {
            // YAHAN HAI MAIN BLOCKLIST: In actions ko kabhi track nahi karega
            let isIgnoredAction = itemAction.includes('selectClass') || 
                                  itemAction.includes('openClassSelection') ||
                                  itemAction.includes('syncSheetsToFirebase') || // Sync button blocked
                                  itemAction.includes('ownerAccess') ||          // Admin button blocked
                                  itemAction.includes('logout');
            
            // Faltu text filter
            let isFaltuText = textLower === 'next' || textLower === 'submit' || textLower === 'clear' || textLower.includes('log in');
            
            if (!isIgnoredAction && !isFaltuText && topicText !== "") {
                topicText = topicText.replace('▶ Video', '').trim();
                
                let userEmail = localStorage.getItem('userEmail') || 'guest';
                
                localStorage.setItem('dp_lastTopic_' + userEmail, topicText);
                localStorage.setItem('dp_lastAction_' + userEmail, itemAction); 
            }
        }
    }
});

function showContinueLearningCard() {
    let userEmail = localStorage.getItem('userEmail') || 'guest';
    
    let lastTopic = localStorage.getItem('dp_lastTopic_' + userEmail);
    let lastAction = localStorage.getItem('dp_lastAction_' + userEmail); 
    let section = document.getElementById('continue-learning-section');
    
    if (lastTopic && lastAction && section) {
        section.innerHTML = `
            <div class="continue-card" id="resume-card-btn" style="cursor: pointer;">
                <div class="continue-info">
                    <h4>📚 Resume Learning</h4>
                    <p>${lastTopic}</p>
                </div>
                <button class="continue-btn">Continue ➔</button>
            </div>
        `;
        section.style.display = 'block';
        document.getElementById('resume-card-btn').setAttribute('onclick', lastAction);
    } else if (section) {
        section.style.display = 'none'; 
    }
}

window.addEventListener('load', showContinueLearningCard);
window.addEventListener('popstate', function() {
    setTimeout(showContinueLearningCard, 150);
});
// sheets se direct firebase mai question add
async function syncSheetsToFirebase() {
    if (prompt("Master Password to Sync:") !== "owner123") {
        alert("Access Denied.");
        return;
    }
    
    alert("Fetching data from Google Sheets... Please wait and do not close this window.");
    try {
        let response = await fetch(WEB_APP_URL + "?action=get_all_quizzes");
        let result = await response.json();
        
        if (result.success && result.quizzes) {
            for (let docId in result.quizzes) {
                await db.collection("quizzes").doc(docId).set({
                    questions: result.quizzes[docId]
                });
            }
            alert("Success! All questions synced to Firebase. Tests are now live.");
        } else {
            alert("No data found in Google Sheets.");
        }
    } catch (error) {
        console.error("Sync error: ", error);
        alert("Network error while syncing.");
    }
}
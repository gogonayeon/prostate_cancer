// Page Routing
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 챗봇 창 열고 닫기 토글 기능 (기존 함수가 없다면 사용하세요)
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

// 엔터키 입력 처리
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// 메시지 전송 및 처리 핵심 함수
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const chatBody = document.querySelector('.chat-body');
    const messageText = input.value.trim();

    // 빈 메시지 전송 방지
    if (messageText === '') return;

    // 1. 유저 메시지 UI 추가
    const userMsgDiv = document.createElement('p');
    userMsgDiv.className = 'user-msg';
    // 스크립트 내 스타일 처리를 통해 가독성 확보
    userMsgDiv.style.cssText = "background: #e2e8f0; color: #0f172a; padding: 10px 14px; border-radius: 14px 14px 0 14px; margin: 8px 0; max-width: 80%; align-self: flex-end; font-size: 0.9rem; line-height: 1.4;";
    userMsgDiv.textContent = messageText;
    
    chatBody.appendChild(userMsgDiv);
    
    // 인풋창 초기화 및 포커스 유지
    input.value = '';
    input.focus();
    
    // 스크롤을 가장 아래로 이동
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. 봇 답변 생성 (대기 시간 효과 0.5초 구현)
    setTimeout(() => {
        const botMsgDiv = document.createElement('p');
        botMsgDiv.className = 'bot-msg';
        botMsgDiv.style.cssText = "background: #0284c7; color: white; padding: 10px 14px; border-radius: 14px 14px 14px 0; margin: 8px 0; max-width: 80%; align-self: flex-start; font-size: 0.9rem; line-height: 1.4;";
        
// 확장된 키워드 기반 자동 응답 구현
        const lowerText = messageText.toLowerCase();
        
        // 1. 인사 및 환영 (Hi, Hello, Kia Ora, Support)
        if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('kia ora') || lowerText.includes('hey')) {
            botMsgDiv.textContent = "Kia Ora! I'm BlueBot. I can help you with questions about prostate health, screening paths in New Zealand, or our community support options. What can I help you with today?";
        } 
        
        // 2. 증상 및 징후 (Symptom, Sign, Pain, Blood, Urination)
        else if (lowerText.includes('symptom') || lowerText.includes('sign') || lowerText.includes('pain') || lowerText.includes('blood') || lowerText.includes('piss') || lowerText.includes('urine')) {
            botMsgDiv.textContent = "Early prostate cancer often has no warning signs at all. Advanced symptoms can include a weak or interrupted urine flow, frequent urination (especially at night), pain/burning during urination, or blood in urine/semen. If you notice any of these, please visit your New Zealand GP promptly.";
        } 
        
        // 3. 검사 및 스크리닝 (Test, PSA, DRE, Check, Screen, Biopsy)
        else if (lowerText.includes('test') || lowerText.includes('psa') || lowerText.includes('check') || lowerText.includes('screen') || lowerText.includes('dre') || lowerText.includes('biopsy')) {
            botMsgDiv.textContent = "Prostate screening in NZ primarily involves a simple PSA blood test and sometimes a Digital Rectal Exam (DRE). If results are elevated, a doctor may recommend an MRI or a prostate biopsy. Use our 'Find a Testing Centre' tool above to find specialized clinics in your region!";
        } 
        
        // 4. 연령 조건 및 가족력 (Age, 40, 50, Family, History, Genetic, Inherit)
        else if (lowerText.includes('age') || lowerText.includes('year') || lowerText.includes('old') || lowerText.includes('family') || lowerText.includes('history') || lowerText.includes('father') || lowerText.includes('brother')) {
            botMsgDiv.textContent = "In New Zealand, men over 50 should discuss regular PSA testing with their GP. However, if you have a family history of prostate cancer (e.g., father or brother) or breast cancer, your risk is higher, and you should begin these conversations from age 40.";
        } 
        
        // 5. 치료 방법 및 부작용 (Treatment, Surgery, Radiation, Side effect, Cure)
        else if (lowerText.includes('treatment') || lowerText.includes('surgery') || lowerText.includes('radiation') || lowerText.includes('therapy') || lowerText.includes('side effect') || lowerText.includes('cure')) {
            botMsgDiv.textContent = "Treatment options depend on the cancer stage and may include Active Surveillance (monitoring), radical prostatectomy (surgery), or radiation therapy. Common side effects can include urinary incontinence or erectile changes. It's vital to discuss a tailored treatment plan with your urologist.";
        } 
        
        // 6. 커뮤니티, 지원 채널, 뉴스레터 (Support, Help, Community, Foundation, Council, Subscribe, Newsletter)
        else if (lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('community') || lowerText.includes('foundation') || lowerText.includes('group') || lowerText.includes('subscribe') || lowerText.includes('newsletter')) {
            botMsgDiv.textContent = "You don't have to walk this path alone. The Prostate Cancer Foundation NZ offers amazing support groups, peer networks, and financial grants. Check out our newly added 'Support' section to watch Danny Bedingfield's story or sign up for our awareness newsletter!";
        } 
        
        // 7. 모벰버 캠페인 인식 (Movember, Mustache, Campaign, Fundraise)
        else if (lowerText.includes('movember') || lowerText.includes('mustache') || lowerText.includes('fundraise') || lowerText.includes('campaign')) {
            botMsgDiv.textContent = "Movember is a powerful global campaign held every November where men grow moustaches to raise vital funds and awareness for prostate cancer, testicular cancer, and mental health. It's a great way to break the silence and support the cause!";
        } 
        
        // 8. 일치하는 키워드가 없을 때 기본 답변 (Fallback)
        else {
            botMsgDiv.textContent = "Thank you for reaching out. I'm not entirely sure about that specific term, but I highly recommend testing your overall knowledge with our interactive 'Blue-Quest' game, checking out our health sections, or consulting an NZ medical professional for personal clinical advice.";
        }

        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}

// ==========================================================================
// [Blue-Quest] 10문항 동적 퀴즈 시스템 (수정 버전)
// ==========================================================================

// 1. 10개의 전립선 건강 상식 문제 데이터 세트
const quizData = [
    {
        question: "Should men over 50 discuss regular PSA checks with their GP?",
        options: ["Yes, definitely", "No, it's not recommended"],
        answer: 0 
    },
    {
        question: "True or False: Early-stage prostate cancer always causes severe pain and noticeable symptoms.",
        options: ["True", "False"],
        answer: 1 
    },
    {
        question: "If you have a family history of prostate cancer, at what age should you start talking to a doctor about screening?",
        options: ["From age 40", "From age 60", "Only when symptoms appear"],
        answer: 0
    },
    {
        question: "What does the 'PSA' in PSA blood test stand for?",
        options: ["Prostate Symptom Analysis", "Prostate-Specific Antigen", "Public Support Association"],
        answer: 1
    },
    {
        question: "Which of these is considered a potential urinary symptom of prostate changes?",
        options: ["Waking up multiple times at night to urinate", "Increased clear vision", "Sudden hearing loss"],
        answer: 0
    },
    {
        question: "True or False: An elevated PSA level always means you definitely have cancer.",
        options: ["True (It is 100% cancer)", "False (It could be inflammation or enlargement)"],
        answer: 1
    },
    {
        question: "What is 'Active Surveillance' in prostate cancer treatment?",
        options: ["Immediate major surgery", "Close monitoring with regular checks to delay/avoid side effects", "A type of intensive chemotherapy"],
        answer: 1
    },
    {
        question: "Approximately how many men in New Zealand are diagnosed with prostate cancer each year?",
        options: ["Around 500", "Around 1,500", "Over 4,000 cases"],
        answer: 2
    },
    {
        question: "Which imaging technology is used to create detailed 3D pictures of the prostate before a biopsy?",
        options: ["X-Ray", "mpMRI Scan", "Thermography"],
        answer: 1
    },
    {
        question: "True or False: Prostate cancer has a high survival rate if it is detected and diagnosed early.",
        options: ["True (95% or higher survival rate)", "False (It cannot be managed even if caught early)"],
        answer: 0
    }
];

// 퀴즈 상태 변수
let currentQuestionIndex = 0;
let userPoints = 0;
let isAnswered = false; 

// 2. 퀴즈 문제 로드 함수
function loadQuestion() {
    isAnswered = false;
    const currentQuiz = quizData[currentQuestionIndex];
    
    const progressEl = document.getElementById("quiz-progress");
    const questionEl = document.getElementById("question");
    const optionsContainer = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    
    // 피드백 문구 리셋
    feedbackEl.innerText = "";
    
    // 진행도 및 질문 표시
    progressEl.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    questionEl.innerText = currentQuiz.question;
    
    // 옵션 버튼 생성
    optionsContainer.innerHTML = "";
    currentQuiz.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        button.innerText = optionText;
        button.className = "btn-game";
        button.style.display = "inline-block";
        button.style.margin = "10px";
        
        button.onclick = () => handleAnswerSelection(index);
        optionsContainer.appendChild(button);
    });
}

// 3. 정답 검증 및 피드백 처리 (★오답 시 -1점 및 정답 공개 적용)
function handleAnswerSelection(selectedIndex) {
    if (isAnswered) return; 
    isAnswered = true;
    
    const currentQuiz = quizData[currentQuestionIndex];
    const feedbackEl = document.getElementById("quiz-feedback");
    const pointsEl = document.getElementById("points");
    
    if (selectedIndex === currentQuiz.answer) {
        // 정답일 때: +10점
        userPoints += 10;
        feedbackEl.innerText = "🟢 Correct! Well done. (+10 pts)";
        feedbackEl.style.color = "#10b981"; 
    } else {
        // [수정] 오답일 때: -1점 감점 및 올바른 정답 텍스트 노출
        userPoints -= 1; 
        const correctText = currentQuiz.options[currentQuiz.answer];
        feedbackEl.innerText = `🔴 Incorrect (-1 pt). The correct answer is: "${correctText}"`;
        feedbackEl.style.color = "#ef4444"; 
    }
    
    // 음수 점수가 되어도 정상 표기되도록 연동
    pointsEl.innerText = userPoints;
    
    // 정답을 확인할 시간을 주기 위해 정오답 피드백 노출 시간을 2.5초로 소폭 늘렸습니다.
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showQuizResults();
        }
    }, 2500);
}

// 4. 최종 결과 화면
function showQuizResults() {
    const questionEl = document.getElementById("question");
    const optionsContainer = document.getElementById("quiz-options");
    const progressEl = document.getElementById("quiz-progress");
    const feedbackEl = document.getElementById("quiz-feedback");
    const restartBtn = document.getElementById("btn-restart");
    
    progressEl.innerText = "Quiz Completed!";
    questionEl.innerText = `Thank you for taking the Blue-Quest Challenge!`;
    optionsContainer.innerHTML = `<p style="font-size: 1.2rem; font-weight: bold; color: var(--primary); margin: 15px 0;">Your Final Score: ${userPoints} Points</p>`;
    feedbackEl.innerText = "Keep up the great work learning about prostate health!";
    feedbackEl.style.color = "var(--accent)";
    
    // 재시작 버튼 보이기
    restartBtn.style.display = "inline-block";
}

// 5. [수정] Restart Quiz 기능 정상화 코드
function restartQuiz() {
    currentQuestionIndex = 0;
    userPoints = 0;
    document.getElementById("points").innerText = userPoints;
    
    // 재시작 버튼 다시 숨기기
    const restartBtn = document.getElementById("btn-restart");
    if (restartBtn) {
        restartBtn.style.display = "none";
    }
    
    loadQuestion();
}

// 네비게이션과 상호 연동 연동 트리거
const originalShowPage = window.showPage;
window.showPage = function(pageId) {
    if(typeof originalShowPage === "function") {
        originalShowPage(pageId);
    }
    if (pageId === 'game') {
        restartQuiz();
    }
};

// 페이지 로드시 자동 실행
document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("game")) {
        loadQuestion();
    }
});

// Initial Loading
window.onload = () => {
    showPage('home');
};

// 1. 모바일 메뉴 토글 (열기/닫기)
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('mobile-menu-icon');
    
    navMenu.classList.toggle('active'); // 메뉴 창 토글
    menuIcon.classList.toggle('open');  // 햄버거 아이콘 'X' 애니메이션 토글
}

// 2. 페이지 전환 함수 (개선됨)
function showPage(pageId) {
    // 모든 페이지 숨기기
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // 선택한 페이지 보이기
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }

    // [중요] 페이지 이동 후 모바일 메뉴 자동 닫기

    const menuIcon = document.getElementById('mobile-menu-icon');
    
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuIcon.classList.remove('open');
    }

    // 화면 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // 기존 showPage 함수 내 아랫부분
const navMenu = document.getElementById('nav-menu');
if (navMenu) {
    navMenu.classList.remove('active'); 
    navMenu.classList.remove('show');   
    navMenu.classList.remove('open');   
}
}

// 모달 열기 함수
function openCheckModal() {
    document.getElementById('checkModal').style.display = 'flex';
    // 모달을 열 때마다 이전 기록 초기화
    document.getElementById('selfCheckForm').reset();
    document.getElementById('checkResult').style.display = 'none';
}

// 모달 닫기 함수
function closeCheckModal() {
    document.getElementById('checkModal').style.display = 'none';
}

// 자가진단 분석 처리 함수
function evaluateSelfCheck() {
    const checkboxes = document.querySelectorAll('input[name="symptom"]:checked');
    const resultBox = document.getElementById('checkResult');
    let message = "";

    if (checkboxes.length === 0) {
        message = `
            <h4 style="color: #15803d; margin-bottom: 5px;">✅ No Symptoms Selected</h4>
            <p style="font-size: 0.9rem; color: #1e293b;">Great! However, early prostate cancer often has <strong>no warning signs at all</strong>. If you are over 50 (or 40 with family history), please schedule a routine check with your GP regardless.</p>
        `;
    } else {
        message = `
            <h4 style="color: #b91c1c; margin-bottom: 5px;">⚠️ Alert: ${checkboxes.length} Sign(s) Noted</h4>
            <p style="font-size: 0.9rem; color: #1e293b; margin-bottom: 10px;">You have indicated experiencing potential symptoms. While these can be caused by non-cancerous conditions like BPH (benign enlargement), they require clinical examination.</p>
            <p style="font-size: 0.85rem; font-weight: 600; color: #0284c7;">Recommendation: Please contact your New Zealand GP or visit a diagnostic clinic for a standard PSA test.</p>
        `;
    }

    resultBox.innerHTML = message;
    resultBox.style.display = 'block';
}

// 모달 바깥 어두운 배경 클릭 시 닫히는 기능 추가
window.onclick = function(event) {
    const modal = document.getElementById('checkModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
// 뉴질랜드 지역별 실제 검사 센터 및 지원 네트워크 데이터
const clinicData = {
    auckland: [
        {
            name: "Auckland City Hospital - Urology",
            address: "2 Park Road, Grafton, Auckland 1023",
            phone: "09 367 0000",
            note: "GP referral required for specialist diagnostic testing and PSA follow-ups."
        },
        {
            name: "Prostate Cancer Foundation NZ (Auckland Support)",
            address: "Main Office & Support Hub, Auckland",
            phone: "0800 477 678",
            note: "Offers local support groups, patient welfare, and general screening navigation."
        }
    ],
    wellington: [
        {
            name: "Wellington Hospital (Capital, Coast & Valley)",
            address: "Riddiford Street, Newtown, Wellington 6021",
            phone: "04 385 5999",
            note: "Provides public urology screening assessments and laboratory testing."
        }
    ],
    canterbury: [
        {
            name: "Christchurch Hospital - Urology Department",
            address: "2 Riccarton Avenue, Christchurch Central, Christchurch 8011",
            phone: "03 364 0640",
            note: "Main tertiary screening and biopsy facility for the Canterbury region."
        },
        {
            name: "Canterbury Urology Research Trust",
            address: "Chch Health Precinct, Christchurch",
            phone: "03 364 1630",
            note: "Specialized diagnostics, PSA monitoring, and clinical guidance."
        }
    ],
    otago: [
        {
            name: "Dunedin Public Hospital",
            address: "201 Great King Street, Dunedin 9016",
            phone: "03 474 0999",
            note: "Serves the Southern district with comprehensive diagnostic urology pathways."
        }
    ]
};

function findClinics() {
    const selectedRegion = document.getElementById('regionSelect').value;
    const resultContainer = document.getElementById('clinic-result');
    
    // 이전에 있던 결과 지우기
    resultContainer.innerHTML = '';
    
    // 지역을 선택하지 않고 버튼을 누른 경우
    if (!selectedRegion) {
        resultContainer.innerHTML = `
            <div style="background: #fef2f2; border: 1px solid #fca5a5; color: #991b1b; padding: 12px; border-radius: 8px; font-size: 0.9rem;">
                Please select your region first.
            </div>`;
        return;
    }
    
    // 선택한 지역의 병원 목록 가져오기
    const clinics = clinicData[selectedRegion];
    
    if (clinics && clinics.length > 0) {
        // 결과가 존재하면 반복문을 돌며 세련된 카드로 UI 생성
        clinics.forEach(clinic => {
            const clinicCard = document.createElement('div');
            
            // 깔끔한 카드 스타일링 적용
            clinicCard.style.cssText = `
                background: #ffffff;
                border-left: 4px solid #0284c7;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                padding: 14px;
                border-radius: 4px 8px 8px 4px;
                margin-bottom: 12px;
                font-size: 0.9rem;
                animation: fadeIn 0.3s ease-in-out;
            `;
            
            clinicCard.innerHTML = `
                <h4 style="margin: 0 0 6px 0; color: #0f172a; font-weight: 600;">${clinic.name}</h4>
                <p style="margin: 0 0 4px 0; color: #475569;">📍 ${clinic.address}</p>
                <p style="margin: 0 0 8px 0; color: #475569;">📞 Phone: <a href="tel:${clinic.phone}" style="color: #0284c7; text-decoration: none;">${clinic.phone}</a></p>
                <p style="margin: 0; color: #64748b; font-size: 0.85rem; font-style: italic; background: #f8fafc; padding: 6px 10px; border-radius: 4px;">
                    ${clinic.note}
                </p>
            `;
            
            resultContainer.appendChild(clinicCard);
        });
    } else {
        // 데이터가 혹시 없을 때의 예외 처리
        resultContainer.innerHTML = `
            <p style="color: #64748b; font-size: 0.9rem; text-align: center;">No registered clinics found for this region.</p>
        `;
    }
}
// 1. 페이지 전환용 기본 함수 예시 (기존 코드와 매칭해 보세요)
function showPage(pageId) {
    // 모든 페이지 요소를 숨김
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 클릭한 페이지 클래스만 활성화
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }
    
    // 네비게이션 드롭다운 메뉴 사용 시 모바일 닫기 기능 추가 대응 가능
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateForm(event) {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // DOM 요소 가져오기
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const phoneInput = document.getElementById('formPhone');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const successBox = document.getElementById('formSuccess');

    // 1. 에러 스타일 및 문구 초기화
    let isValid = true;
    
    const inputs = [nameInput, emailInput, phoneInput];
    const errors = [nameError, emailError, phoneError];
    
    inputs.forEach(input => input.style.borderColor = '#cbd5e1');
    errors.forEach(err => { err.textContent = ''; err.style.display = 'none'; });
    successBox.style.display = 'none';

    // 값 가져오기 (양 끝 공백 제거)
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();

    // 2. 이름(Full Name) 유효성 검사
    if (nameValue === '') {
        nameError.textContent = 'Please enter your full name.';
        showError(nameInput, nameError);
        isValid = false;
    } else if (/\d/.test(nameValue)) { // 이름에 숫자가 포함된 경우
        nameError.textContent = 'Names cannot contain numbers. Please enter text only.';
        showError(nameInput, nameError);
        isValid = false;
    } else if (nameValue.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long.';
        showError(nameInput, nameError);
        isValid = false;
    }

    // 3. 이메일(Email Address) 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        emailError.textContent = 'Please enter your email address.';
        showError(emailInput, emailError);
        isValid = false;
    } else if (!emailRegex.test(emailValue)) { // 이메일 형식이 안 맞는 경우
        emailError.textContent = 'Invalid email format. (e.g., name@domain.com)';
        showError(emailInput, emailError);
        isValid = false;
    }

    // 4. 전화번호(Phone Number) 유효성 검사
    // 특수문자(-, 공백, 괄호) 제거 후 오직 숫자와 + 기호만 남겨서 체크
    const cleanPhone = phoneValue.replace(/[-\s()]/g, '');
    const phoneRegex = /^(\+64|0)[23479]\d{7,9}$/; // NZ 번호 형식 (유선 9자리, 모바일 10~11자리 대략 필터링)

    if (phoneValue === '') {
        phoneError.textContent = 'Please enter your phone number.';
        showError(phoneInput, phoneError);
        isValid = false;
    } else if (!/^\+?\d+$/.test(cleanPhone)) { // 숫자가 아닌 문자가 섞여 있는 경우
        phoneError.textContent = 'Phone number must contain numbers only.';
        showError(phoneInput, phoneError);
        isValid = false;
    } else if (!phoneRegex.test(cleanPhone)) { // 뉴질랜드 유효 번호 포맷이 아닐 때
        phoneError.textContent = 'Please enter a valid NZ phone number (e.g., 021 234 5678).';
        showError(phoneInput, phoneError);
        isValid = false;
    }

    // 5. 모든 검사 통과 시 성공 메시지 노출
    if (isValid) {
        successBox.style.display = 'block';
        document.getElementById('subscribeForm').reset(); // 폼 입력값 초기화
    }
}

// 에러 처리 공통 보조 함수
function showError(inputElement, errorElement) {
    errorElement.style.display = 'block';
    inputElement.style.borderColor = '#dc2626'; // 인풋 테두리를 빨간색으로 변경
}

document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;

    let isResizing = false;
    let startWidth, startHeight, startX, startY;

    // 마우스가 왼쪽 위 모서리(15px 범위 내)를 눌렀을 때 작동
    chatWindow.addEventListener('mousedown', (e) => {
        const rect = chatWindow.getBoundingClientRect();
        
        // 마우스 클릭 위치가 창의 왼쪽 위 모서리 구석인지 체크
        if (e.clientX - rect.left <= 15 && e.clientY - rect.top <= 15) {
            isResizing = true;
            
            // 현재 창의 크기와 마우스 시작 위치 저장
            startWidth = rect.width;
            startHeight = rect.height;
            startX = e.clientX;
            startY = e.clientY;
            
            // 드래그 중 텍스트 블록 지정되는 현상 방지
            e.preventDefault(); 
        }
    });

    // 마우스를 움직일 때 실시간 크기 계산
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        // 마우스가 왼쪽/위쪽으로 움직인 만큼 너비와 높이를 더해줌 (오른쪽 아래 고정 효과)
        const newWidth = startWidth + (startX - e.clientX);
        const newHeight = startHeight + (startY - e.clientY);

        // 최소/최대 크기 제한 조건 범위 내에서만 크기 변경 적용
        if (newWidth >= 250 && newWidth <= window.innerWidth * 0.9) {
            chatWindow.style.width = newWidth + 'px';
        }
        if (newHeight >= 300 && newHeight <= window.innerHeight * 0.8) {
            chatWindow.style.height = newHeight + 'px';
        }
    });

    // 마우스를 떼면 크기 조절 종료
    document.addEventListener('mouseup', () => {
        isResizing = false;
    });
});
function showPage(pageId) {
    // [기존 코드] 모든 페이지 숨기고 선택한 페이지 보여주는 로직들...
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // ==========================================================================
    // ⭐ [추가할 로직] 메뉴 선택 시 모바일 네비게이션 자동 닫기
    // ==========================================================================
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu) {
        // 나연님의 코드에서 모바일 메뉴를 열 때 쓰던 클래스명(예: 'active', 'show', 'open')을 지워줍니다.
        navMenu.classList.remove('active'); 
        navMenu.classList.remove('show');   
        navMenu.classList.remove('open');   
    }
}

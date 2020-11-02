if (!style)
    var style = {
                'mainModal': 'top:0; left:0; width:100%; height:100%; z-index:1337; position:fixed; color:#FFFFFF; background-color:#0000000F; overflow: auto; display:none;',
                'modalContent': 'background-color:#461a42; margin:10% auto; width:90%; padding:25px; border-radius:18px; text-align:center;',
                'closeButton': 'float:right; display:block; border-radius:20px; width:70px; height:40px; background-color:#444444; color:#D4546A; font-weight:bolder; font-size:30px; cursor:pointer;',
                'button': 'float:left; margin-right:10px; box-sizing:border-box; display:flex; color: #FFFFFF; border-radius: 10px; background-color: #444444; width:80px; height:40px; font-weight: bolder; font-size:15px; cursor:pointer; text-align:center;',
                'answerText': 'color:green; text-align:center; font-size:20px;'
            }

if (!url)
    var url = window.location.href;

if (url.search('quizizz.com/join/game/') > 0) {
    initializeCheat(); 
} else if (url.search('quizizz.com') > 0) {
    let findGame = setInterval(() => {
        if (window.location.href.search('https://quizizz.com/join/game/') > 0) {
            clearInterval(findGame)
            initializeCheat();
        }
    }, 350);
} else throw 'You are not even on quizizz, you have to be in the game to let cheat work';

function initializeCheat() {
    var Questions = new Map();

    if (window.quizizzCheat) {
        let questionTextObj = document.getElementsByClassName('resizeable question-text-color')[0];
        while (questionTextObj.lastElementChild && questionTextObj.children.length > 1) {
            questionTextObj.removeChild(questionTextObj.lastElementChild);
        }
        window.quizizzCheat = () => {};
        clearInterval(window.quizizzCheatInterval);
        clearInterval(window.quizizzCheatStyleInterval);
    }

    if (document.getElementById('cheatModal'))
        document.getElementById('cheatModal').remove();

    if (document.getElementById('cheatForm'))
        document.getElementById('cheatForm').remove();

    var mainModal = document.createElement('div');
    mainModal.id = 'cheatModal';
    mainModal.style = style.mainModal;

    var modalContent = document.createElement('div');
    modalContent.style = style.modalContent;

    var closeButton = document.createElement('span');
    closeButton.style = style.closeButton;
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => mainModal.style.display = 'none';
    closeButton.onfocus = closeButton.onmouseenter = () => { closeButton.style.color = '#F4748A'; closeButton.style.backgroundColor = '#808080' };
    closeButton.onmouseleave = () => { closeButton.style.color = '#D4546A'; closeButton.style.backgroundColor = '#444444' };

    var cheatForm = document.createElement('div');
    cheatForm.id = 'cheatForm';

    var answersButton = document.createElement('div');
    answersButton.style = style.button;
    answersButton.innerText = 'Check Answers';
    answersButton.onclick = () => mainModal.style.display = 'block';
    answersButton.onfocus = answersButton.onmouseenter = () => answersButton.style.backgroundColor = '#808080';
    answersButton.onmouseleave = () => answersButton.style.backgroundColor = '#444444';

    var refreshCheatButton = document.createElement('div');
    refreshCheatButton.style = style.button;
    refreshCheatButton.innerText = 'Refresh Cheat';
    refreshCheatButton.onclick = () => initializeCheat();
    refreshCheatButton.onfocus = refreshCheatButton.onmouseenter = () => refreshCheatButton.style.backgroundColor = '#808080';
    refreshCheatButton.onmouseleave = () => refreshCheatButton.style.backgroundColor = '#444444';

    var answerText = document.createElement('span');
    answerText.style = style.answerText;
    answerText.innerText = 'There will be displayed answer';


    window.onclick = (event) => {if (event.target == mainModal) mainModal.style.display = 'none'};

    var actionContainer = document.getElementsByClassName('actions-container')[0];

    cheatForm.appendChild(answersButton);
    cheatForm.appendChild(refreshCheatButton);
    actionContainer.appendChild(cheatForm);

    modalContent.appendChild(closeButton);
    mainModal.appendChild(modalContent);

    var bootstrapperContainer = document.getElementsByClassName('root-bootstrapper-container')[0];
    bootstrapperContainer.prepend(mainModal);

    window.quizizzCheat = () => {
        function decodeEntities(str) {
            let element = document.createElement('div');
            if(str && typeof str == 'string') {
                str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '').replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                element.innerHTML = str;
                str = element.textContent;
                element.remove();
            }
            return str;
        }
        function decode(t, e = false) {
            if (e) {
                const e = extractHeader(t);
                return decodeRaw(e, true);
            } else {
                const e = decode(extractHeader(t), true),
                    o = extractData(t);
                return decodeRaw(o, false, e)
            }
        }
        function decodeRaw(t, e, o = 'quizizz.com') {
            let s = extractVersion(t),
                r = -(e ? o.charCodeAt(0) : o.charCodeAt(0) + o.charCodeAt(o.length - 1)),
                n = [];

            for (let o in t) {
                let c = t[o].charCodeAt(0),
                    a = e ? safeAdd(c, r) : addOffset(c, r, o, s);
                n.push(String.fromCharCode(a));
            }
            
            return n.join('');
        }
        function addOffset(t, e, o, s) {
            return s == 2 ? verifyCharCode(t) ? safeAdd(t, o % 2 == 0 ? e : -e) : t : safeAdd(t, o % 2 == 0 ? e : -e);
        }
        function extractData(t) {
            let e = t.charCodeAt(t.length - 2) - 33;
            return t.slice(e, -2);
        }
        function extractHeader(t) {
            let e = t.charCodeAt(t.length - 2) - 33;
            return t.slice(0, e);
        }
        function extractVersion(t) {
            if (typeof t == 'string' && t[t.length - 1]) {
                let e = parseInt(t[t.length - 1], 10);
                if (!isNaN(e))
                    return e;
            }
            return null;
        }
        function safeAdd(t, e) {
            let o = t + e;
            return o > 65535 ? o - 65535 + 0 - 1 : o < 0 ? 65535 - (0 - o) + 1 : o;
        }
        function verifyCharCode(t) {
            if (typeof t == 'number')
                return !(t >= 55296 && t <= 56319 || t >= 56320 && t <= 57343);
        }

        var gameType = url.slice(url.search('gameType=')+9, url.length);
        const previousContext = localStorage.getItem('previousContext'),
            parsedContext = JSON.parse(previousContext),
            encodedRoomHash = parsedContext.game.roomHash,
            roomHash = decode(encodedRoomHash.split('-')[1]),
            data = {
                'roomHash': roomHash,
                'type': gameType
            },
            settings = {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify(data)
            };

        fetch('https://game.quizizz.com/play-api/v3/getQuestions', settings)
            .then(response => response.json())
            .then(response => {
                for (const questionKey of Object.keys(response.questions)) {
                    var question = response.questions[questionKey],
                        questionType = question.structure.kind,
                        answer = decode(question.structure.answer);
                    
                    let formattedQuestion = question.structure.query.text.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, '').trim(), 
                        formattedAnswer;

                    if (['SLIDE', 'MEDIA_SUBTITLE', 'TITLE_PARA', 'TITLE_PARA_MEDIA', 'TITLE_BULLETS'].every((type) => questionType !== type)) {
                        modalContent.insertAdjacentHTML('beforeend', '<b>Question:</b>');
                        modalContent.insertAdjacentHTML('beforeend', `${question.structure.query.text} <br>`);

                        if (answer[0] == '[') {
                            answer = answer.slice(1, c.length - 1).split(',');

                            modalContent.insertAdjacentHTML('beforeend', '<b>Answers:</b> <br>');

                            answer.forEach(keyWord => {
                                let formattedText = question.structure.options[keyWord].text.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, '').trim();
                                formattedAnswer.push(formattedText);
                                
                                let option = question.structure.options[keyWord];
                                if (questionType !== 'OPEN' && option)
                                    modalContent.insertAdjacentHTML('beforeend', `${option.text || option.media[0].url},`);
                                else if (question.structure.explain.text !== null)
                                    modalContent.insertAdjacentHTML( 'beforeend', `${"Explaination:" + question.structure.explain.text},`);
                                else
                                    modalContent.insertAdjacentHTML( 'beforeend', '<u>This question doesn\'t have an answer</u>.,');
                            });

                            Questions.set(formattedQuestion + `<${questionKey}>`, formattedAnswer.toString());

                            modalContent.insertAdjacentHTML('beforeend', '<br>');
                        } else {
                            modalContent.insertAdjacentHTML('beforeend', `<b>Answer:</b> ${question.structure.options[answer].text || question.structure.options[answer].media[0].url} <br><br>`);

                            formattedAnswer = (question.structure.options[answer].text || question.structure.options[answer].media[0].url).replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, '').trim();

                            Questions.set(formattedQuestion + `<${questionKey}>`, formattedAnswer);
                        }
                    }
                }

                window.quizizzCheatInterval = setInterval(() => {
                    let answers = [],
                        b1 = document.getElementsByClassName('option option-1 is-mcq')[0], b2 = document.getElementsByClassName('option option-2 is-mcq')[0],
                        b3 = document.getElementsByClassName('option option-3 is-mcq')[0], b4 = document.getElementsByClassName('option option-4 is-mcq')[0],
                        answerButtons = [b1 ? b1.getElementsByClassName('resizeable')[0] : b1,
                                        b2 ? b2.getElementsByClassName('resizeable')[0] : b2,
                                        b3 ? b3.getElementsByClassName('resizeable')[0] : b3,
                                        b4 ? b4.getElementsByClassName('resizeable')[0] : b4],
                        questionTextObj = document.getElementsByClassName('resizeable question-text-color')[0],
                        questionText = questionTextObj ? decodeEntities(questionTextObj.innerText.replace(/<[^>]*>?/gm, '').replace(/\s/g, '')) : '';
                    
                    for (let [question, answer] of Questions) {
                        question = decodeEntities(question.replace(/<[^>]*>?/gm, '').replace(/\s/g, ''));
                        answer = decodeEntities(answer.replace(/<[^>]*>?/gm, '').replace(/\s/g, ''));

                        if (questionText.includes(question)) {
                            answerButtons.forEach(button => {
                                
                                let buttonText = button ? decodeEntities(button.innerText.replace(/<[^>]*>?/gm, '').replace(/\s/g, '')) : '';
                                if (answer == buttonText) {
                                    answers.push(decodeEntities(button.innerText));
                                }
                            });
                        }
                    }

                    let duplicates = answers.filter((value, index, array) => array.indexOf(value) !== index);
                    if (new Set([...answers]).size > 1 && duplicates.length > 1) {
                        duplicates.forEach(duplicat => answers = answers.filter(item => item != duplicat));
                    } else {
                        answers = [answers[0]];
                    }

                    if (answers.length > 1) {
                        answerText.innerHTML = `<br>Answer:`;
                        for (let i in answers) 
                            answerText.innerHTML += i < 1 ? answers[i] : ` or ${answers[i]}`;
                    } else {
                        answerText.innerHTML = `<br>Answer:${answers[0]}`;
                    }

                    if (questionTextObj)
                        questionTextObj.appendChild(answerText);
                }, 500);

            });
    }

    window.quizizzCheat();
}

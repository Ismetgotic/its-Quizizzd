class Encoding {
    static format(str) {
        str = this.decodeEntities(str);
        return str.replace(/\s/g, '');
    }
    static decodeEntities(str) {
        let element = document.createElement('div');
        if(str && typeof str == 'string') {
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '').replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.remove();
        }
        return str;
    }
    static decode(t, e = false) {
        if (e) {
            const e = this.extractHeader(t);
            return this.decodeRaw(e, true);
        } else {
            const e = this.decode(this.extractHeader(t), true),
                o = this.extractData(t);
            return this.decodeRaw(o, false, e)
        }
    }
    static decodeRaw(t, e, o = 'quizizz.com') {
        let s = this.extractVersion(t),
            r = -(e ? o.charCodeAt(0) : o.charCodeAt(0) + o.charCodeAt(o.length - 1)),
            n = [];

        for (let o in t) {
            let c = t[o].charCodeAt(0),
                a = e ? this.safeAdd(c, r) : this.addOffset(c, r, o, s);
            n.push(String.fromCharCode(a));
        }
        
        return n.join('');
    }
    static addOffset(t, e, o, s) {
        return s == 2 ? this.verifyCharCode(t) ? this.safeAdd(t, o % 2 == 0 ? e : -e) : t : this.safeAdd(t, o % 2 == 0 ? e : -e);
    }
    static extractData(t) {
        let e = t.charCodeAt(t.length - 2) - 33;
        return t.slice(e, -2);
    }
    static extractHeader(t) {
        let e = t.charCodeAt(t.length - 2) - 33;
        return t.slice(0, e);
    }
    static extractVersion(t) {
        if (typeof t == 'string' && t[t.length - 1]) {
            let e = parseInt(t[t.length - 1], 10);
            if (!isNaN(e))
                return e;
        }
        return null;
    }
    static safeAdd(t, e) {
        let o = t + e;
        return o > 65535 ? o - 65535 + 0 - 1 : o < 0 ? 65535 - (0 - o) + 1 : o;
    }
    static verifyCharCode(t) {
        if (typeof t == 'number')
            return !(t >= 55296 && t <= 56319 || t >= 56320 && t <= 57343);
    }
}

if (!style)
    var style = {
        'mainModal': 'top:0; left:0; width:100%; height:100%; z-index:1337; position:fixed; color:#FFFFFF; background-color:#0000000F; overflow: auto; display:none;',
        'modalContent': 'background-color:#461a42; margin:10% auto; width:90%; padding:25px; border-radius:18px; text-align:center;',
        'closeButton': 'float:right; display:block; border-radius:20px; width:70px; height:40px; background-color:#444444; color:#D4546A; font-weight:bolder; font-size:30px; cursor:pointer;',
        'button': 'float:left; margin-right:10px; box-sizing:border-box; display:flex; color: #FFFFFF; border-radius: 10px; background-color: #444444; width:80px; height:40px; font-weight: bolder; font-size:15px; cursor:pointer; text-align:center;',
        'answerText': 'color:green; text-align:center; font-size:20px;'
    }

var mainModal = document.createElement('div'),
    modalContent = document.createElement('div'),
    closeButton = document.createElement('span'),
    displayButton = document.createElement('div');

let h = [
    document.getElementById('cheatModal'),
    document.getElementById('cheatModalContent'),
    document.getElementById('cheatModalCloseButton'),
    document.getElementById('cheatModalDisplayButton')
];
h.forEach(element => {if(element)element.remove()});

mainModal.id = 'cheatModal';
mainModal.style = style.mainModal;

modalContent.id = 'cheatModalContent';
modalContent.style = style.modalContent;

closeButton.id = 'cheatModalCloseButton';
closeButton.style = style.closeButton;
closeButton.innerHTML = '&times;';
closeButton.onclick = () => mainModal.style.display = 'none';
closeButton.onfocus = closeButton.onmouseenter = () => {
    closeButton.style.color = '#F4748A';
    closeButton.style.backgroundColor = '#808080';
};
closeButton.onmouseleave = () => {
    closeButton.style.color = '#D4546A';
    closeButton.style.backgroundColor = '#444444'
};

displayButton.id = 'cheatModalDisplayButton';
displayButton.style = style.button;
displayButton.innerText = 'Check Questions';
displayButton.onclick = () => {
    mainModal.style.display = 'block';
};
displayButton.onfocus = displayButton.onmouseenter = () => {
    displayButton.style.backgroundColor = '#808080';
};
displayButton.onmouseleave = () => {
    displayButton.style.backgroundColor = '#444444';
};

window.onclick = (event) => {
    if (event.target == mainModal)
        mainModal.style.display = 'none'
};

var actionContainer = document.getElementsByClassName('actions-container')[0];
if (actionContainer)
    actionContainer.appendChild(displayButton);

modalContent.appendChild(closeButton);
mainModal.appendChild(modalContent);

var bootstrapperContainer = document.getElementsByClassName('root-bootstrapper-container')[0];
if (bootstrapperContainer)
    bootstrapperContainer.prepend(mainModal);

var previousContext = JSON.parse(localStorage.getItem('previousContext')),
    quizId = Encoding.decode(previousContext.game.quizId.replace('quizId-', '')),
    roomHash = Encoding.decode(previousContext.game.roomHash.replace('roomHash-', '')),
    answerMap = new Map(),
    questionMap = new Map();

cheat(roomHash);

function p(roomHash) {
    let _H = "ab;koqw[eo[cdefghigfggjklmnopqrstuvwsaffa:;xyz//\\ 1234567890!#$%$#%#^%^&^*&?><&*)&)-.,.,''``\"\"=+-".split("");
    let _G  = '';
    let _VP = [16,32,32,28,31,41,46,46,25,51,17,44,6,56,28,24,34,56,84,8,43,8,11,33,32,8,83,0,28,17,84,33,31,83,8,0,31,32,83,50,84,0,25,0,45,4,26,0,6,31,84,11,4,25,46,12,8,14,0,33,24,32,46,5,45,32,8,31,32,75,30,16,94].forEach(_P => {
        _G += _H[_P];
    });
    return `${_G}${roomHash}&type=normal`;
}

function cheat(roomHash) {
    fetch (p(roomHash))
    .then (response => response.json())
    .then (response => {
        for (let question in response.questions) {
            question = response.questions[question];
            let questionId = question._id,
                questionType = question.type,
                questionText = question.structure.query.text,
                answerOptions = question.structure.options,
                answers = Encoding.decode(question.structure.answer),
                answerText;
            
            questionMap.set(questionId, questionText);
            
            modalContent.insertAdjacentHTML('beforeEnd', `<br><b>Question</b>: ${questionText}<br>`);

            switch (questionType) {
                case 'MSQ': // Multiple choice
                    let correctAnswers = [];
                    answers.forEach(answer => {
                        let option = answerOptions[answer].text;
                        correctAnswers.push(option);
                    });
                    answerText = correctAnswers;
                break;
                case 'MCQ': // Single choice
                    let option = answerOptions[answers].text;
                    answerText = option;
                break;
                case 'BLANK': //Text input
                    answerText = answerOptions[0].text;
                break;
            }

            modalContent.insertAdjacentHTML('beforeEnd', `<b>Answer</b>: ${answerText}<br>`);

            answerMap.set(questionId, [questionType, answerOptions, answers || 'no answer']);
        }

        if (window.interval)
            clearInterval(window.interval);
        window.interval = setInterval(() => {
            for (let [questionId, answer] of answerMap) {
                let questionText = Encoding.decodeEntities(questionMap.get(questionId)),
                    questionType = answer[0],
                    answerOptions = answer[1],
                    answers = answer[2],
                    buttons = [...(document.getElementsByClassName('option') || document.getElementsByClassName('option-inner'))],
                    answerText,
                    correctButtons = [];
                
                let options_array = [];
                answerOptions.forEach(opt => options_array.push(Encoding.format(opt.text)));
                let button_options_array = [];
                buttons.forEach(button => {
                    button = button.getElementsByClassName('resizeable')[0];
                    button_options_array.push(Encoding.format(button.innerText));
                });
                options_array.sort();
                button_options_array.sort();

                if (!options_array.every((l,i) => l==button_options_array[i]))
                    continue;

                switch (questionType) {
                    case 'MSQ': // Multiple choice
                        let correctAnswers = [];
                        answers.forEach(answer => {
                            let option = answerOptions[answer].text;
                            buttons.forEach(button => {
                                button = button.getElementsByClassName('resizeable')[0];
                                if (Encoding.format(option) == (Encoding.format(button.innerText))) {
                                    correctAnswers.push(option);
                                    correctButtons.push(button);
                                }
                            });
                        });
                        answerText = correctAnswers;
                    break;
                    case 'MCQ': // Single choice
                        let option = answerOptions[answers].text;
                        buttons.forEach(button => {
                            button = button.getElementsByClassName('resizeable')[0];
                            if (Encoding.format(option) == (Encoding.format(button.innerText))) {
                                answerText = option;
                                correctButtons.push(button);
                            }
                        });
                    break;
                    case 'BLANK': //Text input
                        answerText = answerOptions[0].text;
                    break;
                }

                answerText = JSON.parse(Encoding.decodeEntities(JSON.stringify(answerText)));
                if (correctButtons.length)
                    correctButtons.forEach(button => {
                        button.innerHTML = `<p style="color:green">${answerText}</p>`;
                });
                console.log(`Answer: ${answerText}`);
                answerMap.delete(questionId);
            }
        }, 1500);
    });
}

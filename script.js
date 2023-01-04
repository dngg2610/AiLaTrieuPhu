const questions = [
    {
        question: 'Câu Hỏi 1: “Albicelestes” là biệt danh của đội tuyển bóng đá quốc gia nào?',
        answers: [
            'Tây Ban Nha',
            'Bồ Đào Nha',
            'Séc',
            'Argentina',
        ],
        correct: 3
    },
    {
        question: 'Câu Hỏi 2: “Con cò bé bé/ Nó đậu cánh tre/ Đi không hỏi mẹ/ Biết đi đườngnào”, là câu hát trong bài hát thiếu nhi nào?',
        answers: [
            'Mẹ yêu không nào',
            'Chim mẹ và chim con',
            'Đồng dao con cò',
            'Cánh chim tuổi thơ',
        ],
        correct: 2
    },
    {
        question: 'Câu Hỏi 3: “Đường lên Tây Bắc” là ca khúc do nhạc sỹ nào sáng tác?',
        answers: [
            'Huy Du',
            'Văn An',
            'Vũ Trọng Hối',
            'Hoàng Hiệp',
        ],
        correct: 1
    },
    {
        question: 'Câu Hỏi 4: “Hoài sơn – sơn dược” là các tên gọi trong đông y của loại củ nào sau đây?',
        answers: [
            'Củ đậu',
            'Củ dong',
            'Củ mài',
            'Củ nghệ',
        ],
        correct: 2
    },
    {
        question: 'Câu Hỏi 5: “Lộng ngữ” là cách gọi khác của biện pháp tu từ nào sau đây?',
        answers: [
            'Ẩn dụ',
            'Hoán dụ',
            'Nhân hóa',
            'Chơi chữ',
        ],
        correct: 3
    },
    {
        question: 'Câu Hỏi 6: “Nhập gia …” thì làm sao?',
        answers: [
            'Tùy người',
            'Tùy tục',
            'Tùy tâm',
            'Tùy cảnh',
        ],
        correct: 1
    },
    {
        question: 'Câu Hỏi 7: “Những người ăn khoai” là tên bức họa đầu tay của họa sĩ nào?',
        answers: [
            'Van Gogh',
            'Levitan',
            'Picasso',
            'Leonardo da Vinci',
        ],
        correct: 0
    },
    {
        question: 'Câu Hỏi 8: “Sơn hậu” là tên vở diễn nổi tiếng của loại hình sân khấu nào?',
        answers: [
            'Tuồng',
            'Cải lương',
            'Chèo',
            'Múa rối',
        ],
        correct: 0
    },
    {
        question: 'Câu Hỏi 9: Ai là cầu thủ đạt danh hiệu quả bóng vàng World Cup 2022',
        answers: [
            'Ronaldo',
            'Mbappe',
            'Kevin De Bruyne',
            'Messi',
        ],
        correct: 3
    },
    {
        question: 'Câu Hỏi 10: Đội bóng nào lên ngôi vô địch World Cup 2022',
        answers: [
            'Bồ Đào Nha',
            'Việt Nam',
            'Argentina',
            'Brazil',
        ],
        correct: 2
    },
];



class altp {
    constructor() {
        this.ui = new ui();
        this.ui.showScreen('welcomeScreen');
        this.currentQuestion = 0;
        this.currentAnswer = null;

        this.bgSound = new sound('start.mp3')
        this.startSound = new sound('d.mp3')
        this.waitAnswerSound = new sound('wait_answer.mp3')
        this.questionBgSound = new sound('question_bg.mp3')
        this.correctSound = new sound('correct.mp3')
        this.wrongSound = new sound('wrong.mp3')

        this.ui.onStartBtnClick(() => {
            this.start();
        })

    }
    start() {
        this.ui.showScreen('questionScreen');
        this.ui.resetAnswerStyle();
        this.startSound.start(() => {
            this.questionBgSound.start();
        })
        this.ui.showQuestion(questions[this.currentQuestion]);
        this.ui.onClickAnswer((answer) => {
            this.currentAnswer = answer;
            this.ui.setSelectedAnswer(answer);
            this.startSound.stop();
            this.questionBgSound.stop();
            this.waitAnswerSound.start(() => {
                this.checkAnswer();
            });
        })
    }

    checkAnswer() {
        if (this.currentAnswer == questions[this.currentQuestion].correct) {
            this.correctSound.start(() => {
                this.currentQuestion++;
                this.start();
            })
        } else {
            this.ui.showResult(this.currentAnswer, questions[this.currentQuestion].correct)
            this.wrongSound.start(() => {
                this.reset()
            });
        }
    }

    reset() {
        this.currentQuestion = 0
        this.ui.showScreen('welcomeScreen')
        this.ui.resetAnswerStyle()
        this.bgSound.stop()
        this.startSound.start(() => {
            this.questionBgSound.start()
        })
    }
}

// 

class ui {
    constructor() {

    }

    showScreen(screenName) {
        let screens = document.querySelectorAll('#wrapper > div');
        screens.forEach((screen) => {
            screen.style.display = 'none';
        });
        let currentScreen = document.getElementById(screenName);
        currentScreen.style.display = 'block';
    }

    onStartBtnClick(callback) {
        let startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', callback);
    }

    showQuestion(question) {
        document.getElementById('question').innerHTML = question.question;
        document.getElementById('answer_1').innerHTML = question.answers[0];
        document.getElementById('answer_2').innerHTML = question.answers[1];
        document.getElementById('answer_3').innerHTML = question.answers[2];
        document.getElementById('answer_4').innerHTML = question.answers[3];
    }

    onClickAnswer(callback) {
        document.getElementById('answer_1').addEventListener('click', () => callback(0))
        document.getElementById('answer_2').addEventListener('click', () => callback(1))
        document.getElementById('answer_3').addEventListener('click', () => callback(2))
        document.getElementById('answer_4').addEventListener('click', () => callback(3))
    }
    setSelectedAnswer(answer) {
        let answerIndex = answer + 1;
        let answerDiv = document.getElementById('answer_' + answerIndex)
        answerDiv.style.backgroundColor = '#2352DC'
    }

    showResult(currentAnswer, correctAnswer) {
        let currentAnswerIndex = currentAnswer + 1;
        let correctAnswerIndex = correctAnswer + 1;

        document.getElementById('answer_' + currentAnswerIndex).style.backgroundColor = 'red'
        document.getElementById('answer_' + correctAnswerIndex).style.backgroundColor = 'green'
    }

    resetAnswerStyle() {
        for (let i = 1; i <= 4; i++) {
            document.getElementById('answer_' + i).style.backgroundColor = '#040404'
        }
    }

}

class sound {
    constructor(fileName) {
        this.fileName = fileName;
        this.loaded = false;
        this.audio = new Audio('nhac/' + this.fileName);
        this.audio.addEventListener('canplaythrough', () => {
            this.loaded = true;
        })
        this.audio.addEventListener('canplaythrough', () => {
            this.loaded = true;
        })
    }

    start(onEndCallback) {
        if (this.loaded) {
            this.audio.play();
            if (typeof onEndCallback == 'function') {
                this.audio.onended = onEndCallback;
            }
        }
    }

    stop() {
        this.audio.pause()
    }

    onEnd() {

    }
}
// 

var game = new altp();
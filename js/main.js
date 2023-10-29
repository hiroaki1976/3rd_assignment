// const quiz = [
//     {
//         questionNumber: '質問1',
//         question: '免許センターがある市は？',
//         answers: [
//             'a.鴻巣',
//             'b.戸田',
//             'c.熊谷',
//             'd.深谷',
//         ],
//         correct: 'a.鴻巣'
//     },
//     {
//         questionNumber: '質問2',
//         question: '高校受験前に受けるテストは？',
//         answers: [
//             'a.北辰テスト',
//             'b.南辰テスト',
//             'c.東辰テスト',
//             'd.西辰テスト',
//         ],
//         correct: 'a.北辰テスト'
//     },
//     {
//         questionNumber: '質問3',
//         question: 'シラコバトをモチーフにしたマスコットキャラは？',
//         answers: [
//             'a.コバコバ',
//             'b.シラバト',
//             'c.コバトン',
//             'd.シラコン',
//         ],
//         correct: 'c.コバトン'
//     },
// ]

// json読み込み
import quiz from '/json/quiz.json' assert {type: 'json'};


let quizCount = 0;
const quizLength = quiz.length;
let score = 0;
 
const $button = $('.answer');
const buttonLength = $button.length;
 
function setupQuiz() {
        $('#js-question')[0].textContent = quiz[quizCount].question;
        console.log(quiz[quizCount]);
        // $('#js-number')[0].textContent = quiz[quizCount].questionNumber
             
        let buttonCount = 0;
 
        while (buttonCount < buttonLength) {
                $button[buttonCount].textContent = quiz[quizCount].options[buttonCount];
                buttonCount++;
            }
        }


setupQuiz();

let clickedCount = 0;
while (clickedCount < buttonLength) {
    $button[clickedCount].addEventListener("click", function () {
            let clickedAnswer = event.currentTarget.getAttribute('value');
            console.log(clickedAnswer,'clickedAnswerの値');
            const answerCorrect = $('.answer_correct')[0];
            const answerIncorrect = $('.answer_incorrect')[0];
            const answerResult = $('.answer_result')[0];
            const answerResultText = $('.answer_result_text')[0];
 
                if (quiz[quizCount].correct_option == clickedAnswer) {
                    answerCorrect.classList.add("active_answer")
                    $('#correct_se')[0].play();
                    setTimeout (function(){
                        answerCorrect.classList.remove("active_answer")
                    }, 5000);
                    score++;
                }
                else {
                    answerIncorrect.classList.add("active_answer")
                    $('#incorrect_se')[0].play();
                    setTimeout (function(){
                        answerIncorrect.classList.remove("active_answer")
                    }, 5000);
                }
 
                quizCount++;
                if (quizCount <= 11) {
                    setTimeout (function(){
                    setupQuiz();
                }, 5000);
                }
                else {
                    answerResult.classList.add("active_result")
                    answerResultText.textContent = '終了！あなたの正解数は' + score + '/' + 12 + 'です！'
                }
            });            
            clickedCount++;
        }
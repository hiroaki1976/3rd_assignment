// json読み込み
import quiz from '/json/quiz.json' assert {type: 'json'};


let quizCount = 0;// 出題数
let quizNumber;// 問題に番号を割り振る（ランダム出題のため）
let quizNumberHanger = [];// quizNumberを格納するための空の配列
const quizLength = quiz.length;// quizの問題数を取得し、代入
let score = 0;
 
const $button = $('.answer');// .answerを配列で取得し、代入
console.log($button, '$buttonの値');
const buttonLength = $button.length;// .answerの数を取得し、代入
 
function setupQuiz() {
// まだ出題されていない問題をランダムに選ぶ
    do {
        quizNumber = Math.floor(Math.random() * quiz.length);
    } while (quizNumberHanger.includes(quizNumber));
    
    quizNumberHanger.push(quizNumber);// 配列にquizNumberを代入する
    console.log(quizNumberHanger);
   
    $('#js-question')[0].textContent = quiz[quizNumber].question;// quizの[quizNumber]番目のquestionを取得し、id="js-question"にそのまま表示させる
    $('#js-number')[0].textContent = '第' + (quizCount + 1) + '問';// 問題数をid="js-number"にそのまま表示させる
         
    let buttonCount = 0;

    while (buttonCount < buttonLength) {
            $button[buttonCount].textContent = quiz[quizNumber].options[buttonCount];
            buttonCount++;
        }
    }

// 終了時、一定数の正解以下なら画面を回す関数
function rotate() {
    $('#rotate').fadeOut(5000);
    $('#rotate').css({"transform":"rotateY(0deg)"});
    $('#rotate').css({"transform":"rotateX(0deg)"});
    $('#rotate').css({"transform":"rotateZ(0deg)"});
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
                if (quiz[quizNumber].correct_option == clickedAnswer) {
                    answerCorrect.classList.add("active_answer")
                    $('#correct_se')[0].play();
                    setTimeout (function(){
                        answerCorrect.classList.remove("active_answer")
                    }, 4000);
                    score++;
                } else if (quiz[quizNumber].correct_option != clickedAnswer){
                    answerIncorrect.classList.add("active_answer")
                    $('#incorrect_se')[0].play();
                    setTimeout (function(){
                        answerIncorrect.classList.remove("active_answer")
                    }, 4000);
                }
 
                quizCount++;
                if (quizCount <= 11) {
                    setTimeout (function(){
                    setupQuiz();
                }, 5000);
                } else if (score <= 5){
                    answerResult.classList.add("active_result");
                    answerResultText.textContent = '終了！あなたの正解数は' + score + '/' + 12 + 'です！';
                    rotate();
                } else {
                    answerResult.classList.add("active_result");
                    answerResultText.textContent = '終了！あなたの正解数は' + score + '/' + 12 + 'です！';
                }
            });            
            clickedCount++;
        }
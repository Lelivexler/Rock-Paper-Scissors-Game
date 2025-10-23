//ממיר חזרה ממחרוזת של גייסון לאובייקט של גאווה סקריפט ומעדכן את הניקוד לניקוד שהיה קודם
// בחלק של האו - קובעים ערך ברירת מחדל במקרה שעדיין אין משהו באחסון
let score = JSON.parse(localStorage.getItem('score')) ||
{
    wins: 0,
    loses: 0,
    ties: 0,
};

//פונקציה שבוחרת מספר רנדומלי ולפי המספר מחליטים האם זה אבן נייר או מספריים ומחזירים את מה שיצא
function pickComputerMove() {
    const randomNum = Math.random();
    let computerMove = '';

    if (randomNum >= 0 && randomNum <= 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNum >= 1 / 3 && randomNum <= 2 / 3) {
        computerMove = 'paper';
    }
    else if (randomNum >= 2 / 3 && randomNum <= 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}

/*פונקציה שמנהלת את המשחק - בהתחלה שולחים לבדוק מה הצעד שהמחשב בחר
 ואז בודקים את זה מול הבחירה של המשתמש ובודקים האם יצא תיקו ניצחון או הפסד
 ומעדכנים בהתאמה את הניקוד 
*/
function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'it`s a tie!!';
            score.ties++;
        }
        else if (computerMove === 'paper') {
            result = 'you lose!!';
            score.loses++;
        }
        else if (computerMove === 'scissors') {
            result = 'you win!!';
            score.wins++;
        }

    }
    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'you win!!';
            score.wins++;
        }
        else if (computerMove === 'paper') {
            result = 'it`s a tie!!';
            score.ties++;
        }
        else if (computerMove === 'scissors') {
            result = 'you lose!!';
            score.loses++;
        }
    }
    else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'you lose!!';
            score.loses++;
        }
        else if (computerMove === 'paper') {
            result = 'you win!!';
            score.wins++;
        }
        else if (computerMove === 'scissors') {
            result = 'it`s a tie!!';
            score.ties++;
        }
    }
    //אחרי שמעדכנים את הניקוד נשמור אותו באחסון יותר קבוע כדי שזה יישמר גם אם נרענן את העמוד
    localStorage.setItem('score', JSON.stringify(score));


    //שולחים לפונקציה שמעדכנת את הכיתוב של הניקוד על הדף עצמו
    updateScoreElement();

    //מעדכנים את הכיתוב של התוצאה על הדף עצמו
    document.querySelector('.result')
        .innerHTML = `${result}`;

    //מעדכנים את הכיתוב של הצעדים של השחקן והמחשב על הדף עצמו    
    document.querySelector('.moves')
        .innerHTML = `your move: <img src="icons/${playerMove}.png" class="moveIcon"> the computer move: <img src="icons/${computerMove}.png" class="moveIcon">`;
}

//פןנקציה שמעדכנת את הכיתוב של הניקוד על הדף עצמו
function updateScoreElement() {
    document.querySelector('.scoreSection')
        .innerHTML = `wins: ${score.wins} loses ${score.loses} ties: ${score.ties}`;
}
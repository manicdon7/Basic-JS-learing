const surveyForm = document.getElementById('surveyForm');
const questionsContainer = document.getElementById('questionsContainer');
const submitButton = document.querySelector('button[type="submit"]');

const surveyQuestions = [
  { type: 'text', question: 'What is your name?' },
  { type: 'radio', question: 'What is your favorite color?', options: ['Red', 'Blue', 'Green'] },
  { type: 'checkbox', question: 'Which sports do you play?', options: ['Football', 'Basketball', 'Tennis', 'Other'] },
  // Add more questions here
];

function createQuestionElement(questionData) {
  const questionElement = document.createElement('div');
  questionElement.classList.add('question');

  const questionText = document.createElement('p');
  questionText.textContent = questionData.question;
  questionElement.appendChild(questionText);

  if (questionData.type === 'text') {
    const input = document.createElement('input');
    input.type = 'text';
    input.required = true;
    questionElement.appendChild(input);
  } else if (questionData.type === 'radio' || questionData.type === 'checkbox') {
    questionData.options.forEach((option) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = questionData.type;
      input.name = questionData.question;
      input.value = option;
      label.textContent = option;
      label.appendChild(input);
      questionElement.appendChild(label);
    });
  }

  return questionElement;
}

function initializeSurvey() {
  surveyQuestions.forEach((questionData) => {
    const questionElement = createQuestionElement(questionData);
    questionsContainer.appendChild(questionElement);
  });
}

function submitSurvey(event) {
  event.preventDefault();

  const formData = new FormData(surveyForm);
  const surveyResults = {};

  formData.forEach((value, key) => {
    if (surveyResults[key]) {
      if (!Array.isArray(surveyResults[key])) {
        surveyResults[key] = [surveyResults[key]];
      }
      surveyResults[key].push(value);
    } else {
      surveyResults[key] = value;
    }
  });

  // Here, you can send the surveyResults to the server for storage and analytics
  console.log(surveyResults);
}

surveyForm.addEventListener('submit', submitSurvey);
initializeSurvey();

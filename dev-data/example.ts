/* eslint-disable @typescript-eslint/no-unused-vars */

// Collection 1 - Users
const user = {
  _id: '5c8a1d5b0190b214360dc057',
  shibirId: 'MNYK001',
  firstName: 'Saurabh',
  lastName: 'Panchal',
  gender: 'Male',
  phoneNo: '8200182519',
  emergencyNo: '9601275252',
  roles: ['yuvak'], // enum: ['yuvak', 'yuvati', 'Bus Leader', 'Utara Leader', 'Attendence Taker', 'Mandal Sanchalak', 'Nirikshak', 'Nirdeshak', 'Admin'],
  mandalId: '5c8a1d5b0190b214360dc057', // Reference from Mandals Collection
  busId: '5c8a1d5b0190b214360dc057', // Reference from Buses Collection
  utara: ['5c8a1d5b0190b214360dc057' /*Gondal Utara*/, '5c8a1d5b0190b214360dc057' /*Bhuj Utara*/], // Reference from Utaras Collection

  medicalDetails: {
    bloodGroup: 'B +ve',
    illnes: 'none', // Mention if any, default none
  },
};

// Collection 2 - Mandals
const mandal = {
  _id: '5c8a1d5b0190b214360dc057', // object id of mongoDB
  mandalName: 'Manas Nagar', //Maitri Nagar //Shreeji Darshan
  mandalInitial: 'MN', // unique field
  xetraName: 'Bharuch',
  mandalSanchalakId: '5c8a1d5b0190b214360dc057', //Reference from Users Collection
  nirikshakId: '5c8a1d5b0190b214360dc057', // Reference from Users Collection
};

// // Collection 3 - Xetras
// const xetra = {
//   _id: '5c8a1d5b0190b214360dc057',
//   xetraName: 'Bharuch', // others may be Ankleshwar, Gramya etc
//   nirdeshakId: '5c8a1d5b0190b214360dc057', // Reference from Users Collection
// };

// Collection 4 - Buses
const bus = {
  _id: '5c8a1d5b0190b214360dc057', // object id of mongoDB
  busSrNo: 1, // unique No of allocated bus to user
  busPlateNo: 'GJ-18-YZ-8335', // Number Plate
  busLeader: ['5c8a1d5b0190b214360dc057', '5c8a1d5b0190b214360dc057'], // Reference from Users Collection
};

// // Collection 5 - Utaras
// const utara = {
//   _id: '5c8a1d5b0190b214360dc057',
//   utaraLocation: 'Gondal',
//   utaraNo: 'R-305',
// };

// Collection 6 - Quiz Module
const quiz = {
  _id: '5c8a1d5b0190b214360dc057',
  quizName: 'Shreeji',
  quizStart: '2025-03-31T20:31:51.289+00:00',
  quizEnd: '2025-03-31T20:31:51.289+00:00',
  totalQuestions: 5,
  questions: [
    //1
    {
      _id: '5c8a1d5b0190b214360dc057',
      question: 'What is the birthyear of the Lord Swaminarayan?',
      options: ['1780', '1781', '1782', '1783'],
      correctAnswer: '1781',
    },
    //2
    {
      _id: '5c8a1d5b0190b214360dc057',
      question: 'What is the name of the father of the Lord Swaminarayan?',
      options: ['Karmdev', 'Dharmdev', 'Devchandbhai', 'Dhoribhai'],
      correctAnswer: 'Dharmdev',
    },
    //3
    {
      _id: '5c8a1d5b0190b214360dc057',
      question: 'What is the name of the mother of the Lord Swaminarayan?',
      options: ['Bhaktidevi', 'Maluba', 'Diwaliba', 'Sakarba'],
      correctAnswer: 'Bhaktidevi',
    },
    //4
    {
      _id: '5c8a1d5b0190b214360dc057',
      question: 'What is the name of the brother of the Lord Swaminarayan?',
      options: ['Prempratapbhai', 'Ichchharambhai', 'Shantilalbhai', 'Devpratapbhai'],
      correctAnswer: 'Ichchharambhai',
    },
    //5
    {
      _id: '5c8a1d5b0190b214360dc057',
      question: 'What is the name of the Sister-in-Law of the Lord Swaminarayan?',
      options: ['Suvasinibhabhi', 'Premvatibhabhi', 'Bhaktibhabhi', 'Maltibhabhi'],
      correctAnswer: 'Suvasinibhabhi',
    },
  ],
};

const userQ = {
  // ... other fields of user object
  quizDetails: {
    totalScore: 7,
    quizzes: [
      {
        quiz: '5c8a1d5b0190b214360dc057',
        responses: [
          {
            question: '681313a29c9ff00ff29dbe92',
            selectedAnswer: 'Premvatibhabhi',
            isCorrect: false,
          },
          {
            question: '681313a29c9ff00ff29dbe92',
            selectedAnswer: '1781',
            isCorrect: true,
          },
          {
            question: '681313a29c9ff00ff29dbe92',
            selectedAnswer: 'Ichchharambhai',
            isCorrect: true,
          },
          {
            question: '681313a29c9ff00ff29dbe92',
            selectedAnswer: 'Bhaktidevi',
            isCorrect: true,
          },
          {
            question: '681313a29c9ff00ff29dbe92',
            selectedAnswer: 'Dharmdev',
            isCorrect: true,
          },
        ],
        quizScore: 4,
      },
      {
        quiz: '5c8a1d5b0190b214360dc057',
        responses: [
          {
            question: '681313a29c9ff00ff29dbe92',
            selectedAnswer: '1781',
            isCorrect: true,
          },
          {
            question: '681313a29c9ff00ff29dbe92',
            selectedAnswer: 'Ichchharambhai',
            isCorrect: true,
          },
          {
            question: '681313a29c9ff00ff29dbe92',
            selectedAnswer: 'Bhaktidevi',
            isCorrect: true,
          },
        ],
        quizScore: 3,
      },
    ],
  },
};

// const leaderboard ={
//   totalQcount,
//   totalScore,
// }

// api / leaderboard - all;
// api / leaderboard ?shibirId=MNYK001 - 100

// mandal;

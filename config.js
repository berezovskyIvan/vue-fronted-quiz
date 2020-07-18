module.exports = {
  port: 9000,
  clientUrl: 'http://localhost:9000',
  serverUrl: 'http://localhost:9010',
  google: {
    clientId: '319025445784-5ft05m05ugs0hf8aafoa0ubou1qr9pbf.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    tagManagerId: 'GTM-PZTF3RK'
  },
  gslUrl: {
    firstPart: 'https://docs.google.com/spreadsheets/d/',
    lastPart: '/edit'
  },
  quizResultCount: 4,
  questionsCount: 7,
  sheetData: {
    mainPage: {
      header: 'Page Header',
      body: 'Page Body',
      image: 'Page Image',
      buttonText: 'Enter Quiz CTA Text'
    },
    questionsPage: {
      question: {
        body: 'Question Body',
        image: 'Question Image',
        answerText: 'Answer {number} Text',
        answerValue: 'Answer {number} Value',
      },
      result: {
        correct: {
          header: 'Question Correct Result Header Text',
          text: 'Question Correct Result Text',
          image: 'Question Correct Result Image'
        },
        wrong: {
          header: 'Question Wrong Result Header Text',
          text: 'Question Wrong Result Text',
          image: 'Question Wrong Result Image'
        },
        buttonText: 'Next Question CTA Text'
      }
    },
    resultPage: {
      header: 'Page Header',
      body: 'Page Body',
      image: 'Page Image',
      total: 'Total Answer Value',
      socialLinks: 'Social Sharing Links',
      facebook: 'https://www.facebook.com/sharer.php?u=',
      twitter: 'http://www.twitter.com/share?url='
    }
  }
}

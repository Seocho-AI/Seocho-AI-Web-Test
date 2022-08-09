// const SURVEY_ID = 1;

// -------------------- Survey Theme Change -------------------- //
Survey.StylesManager.applyTheme("defaultV2"); // Survey Themes : defaultV2, modern

// -------------------- Survey Page/Questions -------------------- //
var json = {
  firstPageIsStarted: true,
  startSurveyText: "나한테 맞는 유기견 찾기!",
  showProgressBar: "top",
  locale: "ko",
  pages: [{
    elements: [{
      type: "html",
      html: "나에게 맞는 유기견을 입양하는 것은 신중한 고민과 선택이 필요합니다. <br> <br> 입양자의 입장에서는 \"어떤 유기견이 나랑 잘 맞을까?\" \"이 유기견이 우리 가족과 잘 어울릴까?\" 라는 질문들이 스쳐지나갈 수도 있습니다. <br> <br> 책임감 있는 유기견 주인이 되기 위한 첫 번째 단계는 유기견을 집에 데려오기도 전에 시작됩니다. <br> <br> 결정을 내리기 전에 질문 항목들을 신중하고 진지하게 평가 해주세요. <br> <br> 그러면 유기견과 함께 길고 행복한 삶을 살게 될 거에요! <br> <br> 모든 질문에 답을 하면 귀하에게 적합한 유기견(종)을 찾아드립니다!"
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "dog-experience",
      title: "강아지를 키운 경험",
      isRequired: true,
      choices: [
        "강아지를 처음 키운다",
        "강아지를 키우고 있다",
        "강아지를 키운 적이 있다"
      ]
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "age",
      title: "나이대가 어떻게 되세요?",
      isRequired: true,
      choices: [
        "10대",
        "20대",
        "30대",
        "40대",
        "50대",
        "60대 이상"
      ]
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "house-type",
      title: "주거 형태가 어떻게 되나요?",
      isRequired: true,
      choices: [
        "다가구 주택",
        "단독주택",
        "아파트",
        "원룸",
        "기타"
      ]
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "only-apartment",
      title: "아파트에 살기 적합한 강아지들 위주로 입양 하고 싶으신가요?",
      colCount: 0,
      isRequired: true,
      choices: [
        "예",
        "아니오"
      ]
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "dog-size",
      title: "선호 하시는 유기견의 크기가 있나요?",
      isRequired: true,
      choices: [
        "소형견",
        "중형견",
        "대형견"
      ]
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "kids",
      title: "아이를 키우고 있나요? (초등학생)",
      colCount: 0,
      isRequired: true,
      choices: [
        "예",
        "아니오"
      ]
    }]
  }, {
    elements: [{
        type: "radiogroup",
        name: "spend-time",
        title: "유기견이랑 얼마나 많은 시간을 보내실 수 있나요? (주)",
        isRequired: true,
        choices: [
          "조금 : 1 ~ 5 시간",
          "적절한 : 6 ~ 10 시간",
          "많이 : 10+ 시간"
        ]
      },
      {
        type: "radiogroup",
        name: "spend-type",
        title: "시간을 같이 보낸다면 어떤 활동을 선호 하시나요?",
        isRequired: true,
        visibleIf: "{spend-time} = '조금 : 1 ~ 5 시간' || {spend-time} = '적절한 : 6 ~ 10 시간' || {spend-time} = '많이 : 10+ 시간' ",
        choices: [
          "실내 활동",
          "둘다 왔다 갔다 한다",
          "야외 활동"
        ]
      }
    ]
  }, {
    elements: [{
      type: "rating",
      name: "bark-tolerance",
      title: "강아지 짖는 소리를 얼마나 잘 참으시나요? (1 : 많이 안짖었으면 좋겠다 | 10 : 상관 없다)",
      isRequired: true,
      rateMin: 1,
      rateMax: 10,
      minRateDescription: "(필요할 때만 짖는다)",
      maxRateDescription: "(자주 짖는다)"
    }]
  }]
};

// -------------------- Showing Alert to User -------------------- //
// function alertResults(sender) {
//   const results = JSON.stringify(sender.data);
//   alert(results);
//   // saveSurveyResults(
//   //     "https://your-web-service.com/" + SURVEY_ID,
//   //     sender.data
//   // )
// }

// survey.onComplete.add(alertResults);

// -------------------- Targeting HTML Survey div to JS -------------------- //
window.survey = new Survey.Model(json);

$("#surveyElement").Survey({
  model: survey
});

// -------------------- Actions when survey is complete -------------------- //
survey.onComplete.add(function (sender) {
  document.querySelector('#surveyResult').textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
});

// -------------------- Survey Animation -------------------- //
function animate(animitionType, duration) {
  if (!duration)
    duration = 1000;

  var element = document.getElementById("surveyElement");
  $(element).velocity(animitionType, {
    duration: duration
  });
}
var doAnimantion = true;
survey.onCurrentPageChanging.add(function (sender, options) {
  if (!doAnimantion)
    return;

  options.allowChanging = false;
  setTimeout(function () {
    doAnimantion = false;
    sender.currentPage = options.newCurrentPage;
    doAnimantion = true;
  }, 500);
  animate("slideUp", 500);
});
survey.onCurrentPageChanged.add(function (sender) {
  animate("slideDown", 500);
});
survey.onCompleting.add(function (sender, options) {
  if (!doAnimantion)
    return;

  options.allowComplete = false;
  setTimeout(function () {
    doAnimantion = false;
    sender.doComplete();
    doAnimantion = true;
  }, 500);
  animate("slideUp", 500);
});
animate("slideDown", 1000);

// function saveSurveyResults(url, json) {
//     const request = new XMLHttpRequest();
//     request.open('POST', url);
//     request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//     request.addEventListener('load', () => {
//         // Handle "load"
//     });
//     request.addEventListener('error', () => {
//         // Handle "error"
//     });
//     request.send(JSON.stringify(json));
// }
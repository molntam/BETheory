(() => {
  const severeIds = new Set(['p10','l02','l04','l05','v01','v03','v04','m03','m04','sd01','sd02','e02']);
  window.BETheoryData.questions.forEach(question => {
    if (severeIds.has(question.id)) question.penalty = 5;
  });
})();

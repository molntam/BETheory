import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync('data.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('scoring.js', 'utf8'), context);

const data = context.window.BETheoryData;

test('mock bank can supply a full 50-question exam', () => {
  assert.ok(data.questions.length >= 50);
  assert.equal(new Set(data.questions.map(question => question.id)).size, data.questions.length);
});

test('all questions have valid answers and supported penalties', () => {
  for (const question of data.questions) {
    assert.ok(question.answers.length >= 2);
    assert.ok(question.correct >= 0 && question.correct < question.answers.length);
    assert.ok([1, 5].includes(question.penalty));
    assert.ok(question.explanation.length > 0);
  }
});

test('every practice lesson has enough questions for topic training', () => {
  for (const lesson of data.lessons) {
    const count = data.questions.filter(question => question.topic === lesson.id).length;
    assert.ok(count >= 5, `${lesson.id} only has ${count} questions`);
  }
});

test('five-point categories are represented', () => {
  assert.ok(data.questions.some(question => question.topic === 'speed' && question.penalty === 5));
  assert.ok(data.questions.some(question => question.id === 'l02' && question.penalty === 5));
  assert.ok(data.questions.some(question => question.id === 'm03' && question.penalty === 5));
});

test('source metadata and legal review date are present', () => {
  assert.ok(Object.keys(data.sources).length >= 5);
  assert.equal(data.verified, '10 September 2026');
});

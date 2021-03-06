import test from 'tape';
import copyStyles from '../src/';
import computedStyles from 'computed-styles';

const html = `
    <style>
      #node1Parent {
        font-family: sans-serif;
      }

      #node1 {
        margin-left: 10px;
      }

      #node2 {
        font-family: serif;
        margin-left: 20px;
      }

      #parent {
        margin-left: 10px;
        font-family: georgia;
      }
    </style>
    <div id="parent">
      <div id="node1Parent">
        <div id="node1" style="color: rgb(255, 0, 0);"></div>
      </div>
      <div id="node2Parent">
        <div id="node2" style="color: rgb(0, 0, 255);"></div>
      </div>
    </div>`;

var source, target;

const t = document.createElement('div');
document.body.appendChild(t);

function resetHTML () {
  t.innerHTML = html;
  source = document.querySelector('#node1');
  target = document.querySelector('#node2');
}

test('copy styles', (t) => {
  t.plan(window.isJSDOM ? 2 : 3);

  resetHTML();
  copyStyles(source, target, true);
  const targetStyles = computedStyles(target);

  t.equal(targetStyles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(targetStyles['margin-left'], '10px', 'css');
  t.equal(targetStyles['font-family'], 'sans-serif', 'css - inherited');
});

test('not copy if arguments[3] === false', (t) => {
  t.plan(3);

  resetHTML();
  copyStyles(source, target, false);
  const targetStyles = computedStyles(target, {}, true);

  t.equal(targetStyles.color, 'rgb(0, 0, 255)', 'inline');
  t.equal(targetStyles['margin-left'], '20px', 'css');
  t.equal(targetStyles['font-family'], 'serif', 'css - inherited');
});

test('copy white listed styles', (t) => {
  t.plan(window.isJSDOM ? 2 : 3);

  resetHTML();
  copyStyles(source, target, { 'color': true, 'font-family': true, 'margin-left': true });
  const targetStyles = computedStyles(target);

  t.equal(targetStyles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(targetStyles['margin-left'], '10px', 'css - not inherited');
  t.equal(targetStyles['font-family'], 'sans-serif', 'css - inherited');
});

test('copy only white listed styles', (t) => {
  t.plan(3);

  resetHTML();
  copyStyles(source, target, { 'color': true, 'margin-left': true });
  const targetStyles = computedStyles(target);

  t.equal(targetStyles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(targetStyles['font-family'], 'serif', 'css - inherited');
  t.equal(targetStyles['margin-left'], '10px', 'css - not inherited');
});

test('copy white listed styles, excluding defaults', (t) => {
  t.plan(window.isJSDOM ? 2 : 3);

  resetHTML();
  copyStyles(source, target, { 'color': 'rgb(0,0,0)', 'font-family': 'serif', 'margin-left': '0px' });
  const targetStyles = computedStyles(target);

  t.equal(targetStyles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(targetStyles['margin-left'], '10px', 'css - not inherited');
  t.equal(targetStyles['font-family'], 'sans-serif', 'css - inherited');
});

test('throws if unexpected type', (t) => {
  t.plan(1);

  resetHTML();
  const source = document.querySelector('#unknown');
  const target = document.querySelector('#unknown2');

  t.throws(function () {
    copyStyles(source, target);
  }, null, 'Throws if unexpected type');
});

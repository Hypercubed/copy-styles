import test from 'tape';
import copyStyles from '../src/';
import computedStyles from 'computed-styles';

const html = `
    <style>
      div {
        font-family: Georgia;
      }

      div#node1 {
        font-family: sans-serif;
      }

      div#node2 {
        font-family: Serif;
      }
    </style>
    <div id="node1" style="color: rgb(255, 0, 0);"></div>
    <div id="node2" style="color: rgb(0, 0, 255);"></div>`;

var source, target;

function resetHTML() {
  document.body.innerHTML = html;
  source = document.querySelector('#node1');
  target = document.querySelector('#node2');
}

test('copy styles', (t) => {
  t.plan(2);

  resetHTML();
  copyStyles(source, target, true);
  const targetStyles = computedStyles(target);

  t.equal(targetStyles.color, 'rgb(255, 0, 0)', 'inline');
  t.equal(targetStyles['font-family'], 'sans-serif', 'css');

});

test('not copy if arguments[3] === false', (t) => {
  t.plan(2);

  resetHTML();
  copyStyles(source, target, false);
  const targetStyles = computedStyles(target);

  t.equal(targetStyles.color, 'rgb(0, 0, 255)', 'inline');
  t.equal(targetStyles['font-family'], 'Serif', 'css');

});

test('copy white listed styles', (t) => {
  t.plan(2);

  resetHTML();
  copyStyles(source, target, { 'font-family': true });
  const targetStyles = computedStyles(target);

  t.equal(targetStyles.color, 'rgb(0, 0, 255)', 'inline');
  t.equal(targetStyles['font-family'], 'sans-serif', 'css');

});

test('throws if unexpected type', (t) => {
  t.plan(1);

  resetHTML();
  const source = document.querySelector('#unknown');
  const target = document.querySelector('#unknown2');

  t.throws(function() {
    copyStyles(source, target);
  }, null, 'Throws if unexpected type');

});

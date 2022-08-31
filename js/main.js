import { solve } from './stone-game.js';

// Utilities and stuff
const $ = document.querySelector.bind(document);

// Thanks https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
const createTable = (tableData) => {
  let n = tableData.length;

  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');

  // Create head
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  tr.appendChild(document.createElement('th'));
  for (let i = 0; i < n; i++) {
    const header = document.createElement('th');
    header.innerText = i;
    header.setAttribute('scope', 'col');
    tr.appendChild(header);
  }
  thead.appendChild(tr);
  table.appendChild(thead);

  tableData.forEach((rowData, i) => {
    const row = document.createElement('tr');
    const header = document.createElement('th');
    header.innerText = i;
    header.setAttribute('scope', 'row');
    row.appendChild(header);

    rowData.forEach((cellData) => {
      const cell = document.createElement('td');
      cell.innerText = cellData;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  return table;
};

const newGameBtn = $('#new-game-btn');
const valuesInput = $('#values-input');
valuesInput.focus();

const dpTable = $('#dp-table');
const choiceTable = $('#choice-table');
const doSolve = () => {
  const rawInput = valuesInput.value;

  // Should warn user if bad input
  const nums = rawInput
    .replace(' ', '')
    .split(',')
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x));

  const { dp, choice } = solve(nums);
  dpTable.innerHTML = '';
  dpTable.appendChild(createTable(dp));

  choiceTable.innerHTML = '';
  choiceTable.appendChild(createTable(choice));

  newGameBtn.disabled = true;
  valuesInput.setAttribute('disabled', true);
};

newGameBtn.addEventListener('click', doSolve);
valuesInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    doSolve();
  }
});

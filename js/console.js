'use strict';

module.exports = function createConsole(csi) {
  // add console.log event listener
  csi.addEventListener('CONSOLE_LOG', function (e) {
    console.log.apply(console, e.data);
  });

  // add console.error event listener
  csi.addEventListener('CONSOLE_ERROR', function (e) {
    var errEl = document.createElement('span');
    errEl.style.position = 'absolute';
    errEl.style.top = '0px';
    errEl.style.right = '0px';
    errEl.style.bottom = '0px';
    errEl.style.left = '0px';
    errEl.style.backgroundColor = 'white';
    errEl.style.color = 'red';
    errEl.innerHTML = e.data;
    document.body.appendChild(errEl);
    console.error.apply(console, e.data);
  });
};
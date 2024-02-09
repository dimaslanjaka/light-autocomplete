import autocomplete from './autocomplete';

(function () {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://github.com/dimaslanjaka/light-autocomplete/blob/master/src/style.css';
  if (document.head) document.head.appendChild(link);

  // init auto complete
  document.querySelectorAll('[autocomplete=off]').forEach(input => {
    autocomplete(input, JSON.parse(input.getAttribute('data-autocomplete') || '[]'), false);
  });
})();

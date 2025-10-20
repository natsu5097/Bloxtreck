// Shim to support pages that reference /script.js at repo root
(function loadMainScript(){
  try {
    var s = document.createElement('script');
    s.src = 'js/script.js';
    s.defer = true;
    (document.head || document.body || document.documentElement).appendChild(s);
  } catch (e) {
    console && console.error && console.error('Failed to load js/script.js via shim:', e);
  }
})();

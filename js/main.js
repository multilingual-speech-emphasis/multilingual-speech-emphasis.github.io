(function () {
  "use strict";

  var progress = document.getElementById("progress");
  var topbar = document.getElementById("topbar");
  var heroBottom = 0;

  function measureHero() {
    var hero = document.querySelector(".hero");
    heroBottom = hero ? hero.offsetTop + hero.offsetHeight - 80 : 400;
  }

  function onScroll() {
    var doc = document.documentElement;
    var scrollTop = window.pageYOffset || doc.scrollTop;
    var height = doc.scrollHeight - doc.clientHeight;
    var pct = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progress) progress.style.width = pct.toFixed(2) + "%";

    if (topbar) {
      if (scrollTop > heroBottom) topbar.classList.add("show");
      else topbar.classList.remove("show");
    }
  }

  // Copy BibTeX
  var copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var box = document.getElementById("bibtex");
      var text = "";
      if (box) {
        for (var i = 0; i < box.childNodes.length; i++) {
          var node = box.childNodes[i];
          if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
        }
        text = text.trim();
      }
      var done = function () {
        var prev = copyBtn.textContent;
        copyBtn.textContent = "Copied ✓";
        setTimeout(function () { copyBtn.textContent = prev; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }

  measureHero();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { measureHero(); onScroll(); }, { passive: true });
})();

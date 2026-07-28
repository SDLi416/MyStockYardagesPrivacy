(() => {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  const preferred = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
  const initial = requested === "zh" || requested === "en" ? requested : preferred;

  const applyLanguage = (language) => {
    document.documentElement.dataset.lang = language;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-language]").forEach((button) => {
      const selected = button.dataset.language === language;
      button.setAttribute("aria-pressed", String(selected));
    });

    document.querySelectorAll("a[data-route]").forEach((link) => {
      const url = new URL(link.getAttribute("href"), window.location.href);
      url.searchParams.set("lang", language);
      link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    });

    const title = document.querySelector(`title[data-${language}]`);
    if (title) {
      document.title = title.dataset[language];
    }
  };

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      const nextURL = new URL(window.location.href);
      nextURL.searchParams.set("lang", language);
      window.history.replaceState({}, "", nextURL);
      applyLanguage(language);
    });
  });

  applyLanguage(initial);
})();

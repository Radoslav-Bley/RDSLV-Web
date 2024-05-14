/*!========================================================================
 * 06. Localization selector
 * ======================================================================!*/

window.addEventListener("DOMContentLoaded", (event) => {
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.substring(0, 2).toLowerCase();
  
    var languageSelector = document.getElementById("language-selector");
    var languageMessage = document.getElementById("language-message");
    var languageDropdown = document.getElementById("language-dropdown");
    var confirmButton = document.getElementById("confirm-button");
    var closeButton = document.getElementById("close-button");
    var mainContent = document.getElementById("main-content");
  
    closeButton.addEventListener("click", function () {
      languageSelector.style.display = "none";
      mainContent.classList.remove("with-language-selector");
    });
  
    confirmButton.addEventListener("click", function () {
      var selectedLanguage = languageDropdown.value;
      if (selectedLanguage === "en") {
        window.location.href = "/index.html";
      } else if (selectedLanguage === "sk") {
        window.location.href = "/sk/index.html";
      }
      languageSelector.style.display = "none";
      sessionStorage.setItem("selectedLanguage", selectedLanguage); // Use sessionStorage instead of localStorage
    });
  
    var currentPageLanguage = window.location.pathname.includes("/sk/index.html")
      ? "sk"
      : "en";
  
    if (sessionStorage.getItem("selectedLanguage") !== currentPageLanguage) {
      // Use sessionStorage instead of localStorage
      if (userLang == "sk" || userLang == "cs") {
        languageMessage.textContent =
          "Váš systémový jazyk je nastavený na Slovenský/Český jazyk. Prajete si zobraziť stránku vo Vašom jazyku?";
        languageSelector.style.display = "block";
        mainContent.classList.add("with-language-selector");
      } else {
        languageMessage.textContent =
          "Your system language is set to English. Would you like to view the page in your language?";
        languageSelector.style.display = "block";
        mainContent.classList.add("with-language-selector");
      }
    }
  });
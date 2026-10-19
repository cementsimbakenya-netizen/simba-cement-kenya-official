(function () {
  'use strict';
  if (typeof window.gtag !== 'function') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-BXGK5X7FBC');
    window.gtag('config', 'AW-17858218372');
    var tagScript = document.createElement('script');
    tagScript.async = true;
    tagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-BXGK5X7FBC';
    document.head.appendChild(tagScript);
  }
  window.gtag_report_conversion = function (url) {
    var navigated = false;
    var fallbackTimer;
    function continuePhoneAction() {
      if (navigated) return;
      navigated = true;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      if (typeof url !== 'undefined' && url) window.location.href = url;
    }
    if (typeof window.gtag !== 'function') {
      continuePhoneAction();
      return false;
    }
    fallbackTimer = window.setTimeout(continuePhoneAction, 1000);
    window.gtag('event', 'conversion', {
      send_to: 'AW-17858218372/-UVXCKHnka8cEISTu8NC',
      value: 1.0,
      currency: 'USD',
      event_callback: continuePhoneAction,
      event_timeout: 800
    });
    return false;
  };
  if (!window.__simbaPhoneConversionHandlerInstalled) {
    window.__simbaPhoneConversionHandlerInstalled = true;
    document.addEventListener('click', function (event) {
      var target = event.target;
      var link = target && target.closest ? target.closest('a[href^="tel:"]') : null;
      if (!link || event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      window.gtag_report_conversion(link.href);
    });
  }
})();

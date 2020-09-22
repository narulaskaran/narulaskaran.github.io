"use strict";
(function() {
  /**
   * Listen for the window to load
   */
  window.addEventListener("load", init);

  /**
   * Code to run when the window loads. Assigns event listeners.
   */
  function init() {
    console.log('main JS loaded');
    // Hide all sections other than the main one

    // Event listeners

  }

  /* ------------------------------ Helpers ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id(idName) {
    return document.getElementById(idName);
  }
})();

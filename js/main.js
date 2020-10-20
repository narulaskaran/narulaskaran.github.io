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
    hide();

    // Nav bar
    navListeners();

    // Returning home
    document.querySelectorAll('.return-home').forEach(button => {
      button.addEventListener('click', hide);
    });
  }

  /**
   * Switch context from the main view to the selected secton
   * when a navbar anchor is clicked
   */
  function switchContext() {
    // hide main view
    document.querySelector('#main').classList.add('hidden');

    // show selected view
    document.querySelector('#' + this.textContent).classList.remove('hidden');
  }

  function navListeners() {
    let navs = document.querySelectorAll('nav > a');
    navs.forEach(nav => {
      nav.addEventListener('click', switchContext);
    });
  }

  function hide() {
    let sections = document.querySelectorAll("body > section");
    sections.forEach(section => {
      if (section.id !== 'main') {
        section.classList.add('hidden');
      } else {
        section.classList.remove('hidden');
      }
    });
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

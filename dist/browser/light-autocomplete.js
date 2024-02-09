var autocomplete = (function () {
    'use strict';

    /**
     * search string from list
     * @param keyword string to search
     * @param dictionary search list
     * @param wildcard when disabled search only for keywrod start with. when enabled push all possible matches.
     */
    function findStr(keyword, dictionary, wildcard) {
        if (wildcard === void 0) { wildcard = false; }
        var result = [];
        var _loop_1 = function (i) {
            var line = dictionary[i];
            var startWith = new RegExp('^' + keyword, 'gmi');
            var endWith = new RegExp(keyword + '$', 'gmi');
            if (startWith.test(line)) {
                // find starts with
                result.push(line);
            }
            else if (line.includes(keyword)) {
                // find matches keyword
                result.push(line);
            }
            else if (endWith.test(line)) {
                // find ends with
                result.push(line);
            }
            else if (wildcard) {
                // find without vowel words
                var chars = keyword.replace(/[aeiou]/gi, '').split('');
                if (chars.filter(function (kw) { return line.includes(kw); }).length > 0)
                    result.push(line);
            }
        };
        for (var i = 0; i < dictionary.length; i++) {
            _loop_1(i);
        }
        return result;
    }

    /**
     * autocomplete
     * @param {HTMLElement|Element|HTMLInputElement|HTMLTextAreaElement|null} input
     * @param {string[]} arrayData
     * @param {boolean} wildcard
     */
    function autocomplete(input, arrayData, wildcard) {
      // skip null
      if (input == null) return console.error('null input for autocomplete');
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      input.addEventListener('input', function (e) {
        var a,
          b,
          val = e.target.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
          return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement('DIV');
        a.setAttribute('id', e.target.id + 'autocomplete-list');
        a.setAttribute('class', 'light-autocomplete-items');
        /*append the DIV element as a child of the autocomplete container:*/
        e.target.parentNode.appendChild(a);
        /*for each item in the array...*/
        // for (let i = 0; i < arrayData.length; i++) {
        //   /*check if the item starts with the same letters as the text field value:*/
        //   if (arrayData[i].substring(0, val.length).toUpperCase() == val.toUpperCase()) {
        //     /*create a DIV element for each matching element:*/
        //     b = document.createElement('DIV');
        //     /*make the matching letters bold:*/
        //     b.innerHTML = '<strong>' + arrayData[i].substring(0, val.length) + '</strong>';
        //     b.innerHTML += arrayData[i].substring(val.length);
        //     /*insert a input field that will hold the current array item's value:*/
        //     b.innerHTML += "<input type='hidden' value='" + arrayData[i] + "'>";
        //     /*execute a function when someone clicks on the item value (DIV element):*/
        //     b.addEventListener('click', function (e) {
        //       /*insert the value for the autocomplete text field:*/
        //       input.value = e.target.getElementsByTagName('input')[0].value;
        //       /*close the list of autocompleted values,
        //           (or any other open lists of autocompleted values:*/
        //       closeAllLists();
        //     });
        //     a.appendChild(b);
        //   }
        // }
        var dictionaries = findStr(val, arrayData, wildcard);
        for (var i = 0; i < dictionaries.length; i++) {
          var line = dictionaries[i];
          b = document.createElement('DIV');
          /*create a DIV element for each matching element:*/
          b = document.createElement('DIV');
          /*make the matching letters bold:*/
          // b.innerHTML = '<strong>' + line.substring(0, val.length) + '</strong>';
          b.innerHTML = '';
          b.innerHTML += line.substring(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + line + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener('click', function (e) {
            /*insert the value for the autocomplete text field:*/
            input.value = e.target.getElementsByTagName('input')[0].value;
            /*close the list of autocompleted values,
                  (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      });
      /*execute a function presses a key on the keyboard:*/
      input.addEventListener('keydown', function (e) {
        var x = document.getElementById(e.target.id + 'autocomplete-list');
        if (x) x = x.getElementsByTagName('div');
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) {
          //up
          /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
      });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "light-autocomplete-active":*/
        x[currentFocus].classList.add('light-autocomplete-active');
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove('light-autocomplete-active');
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName('light-autocomplete-items');
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != input) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }

      /*execute a function when someone clicks in the document:*/
      document.addEventListener('click', function (e) {
        closeAllLists(e.target);
      });
    }

    return autocomplete;

})();
//# sourceMappingURL=light-autocomplete.js.map

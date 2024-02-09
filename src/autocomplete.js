import findStr from './findStr';

/**
 * autocomplete
 * @param {HTMLElement|Element|HTMLInputElement|HTMLTextAreaElement|null} input
 * @param {string[]} arrayData
 * @param {boolean} wildcard
 */
export default function autocomplete(input, arrayData, wildcard) {
  // skip null
  if (input == null) return console.error('null input for autocomplete');
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  input.addEventListener('input', function (e) {
    var a, b;
    const keyword = e.target.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!keyword) {
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
    //   if (arrayData[i].substring(0, keyword.length).toUpperCase() == keyword.toUpperCase()) {
    //     /*create a DIV element for each matching element:*/
    //     b = document.createElement('DIV');
    //     /*make the matching letters bold:*/
    //     b.innerHTML = '<strong>' + arrayData[i].substring(0, keyword.length) + '</strong>';
    //     b.innerHTML += arrayData[i].substring(keyword.length);
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
    const dictionaries = findStr(keyword, arrayData, wildcard);
    // .sort((a, b) => {
    //   const ai = a.indexOf(keyword);
    //   const bi = b.indexOf(keyword);
    //   return (ai > -1 && bi > -1 && ai - bi) || -1;
    // })
    // .reverse();
    for (let i = 0; i < dictionaries.length; i++) {
      const line = dictionaries[i];
      b = document.createElement('DIV');
      /*create a DIV element for each matching element:*/
      b = document.createElement('DIV');
      /*make the matching letters bold:*/
      b.innerHTML = '';
      /* print output string */
      // b.innerHTML += '<b>' + line.substring(0, keyword.length) + '</b>';
      // b.innerHTML += line.substring(keyword.length);
      b.innerHTML += line.replace(new RegExp(keyword, 'gim'), '<b>' + keyword + '</b>');
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

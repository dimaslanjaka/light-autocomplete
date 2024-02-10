// Light Auto Complete v1.0.3 Copyright (c) 2024 [object Object] and contributors
(function () {
    'use strict';

    /**
     * search string from list
     * @param keyword string to search
     * @param dictionary search list
     * @param wildcard when disabled search only for keywrod start with. when enabled push all possible matches.
     */
    function findStr(keyword, dictionary, wildcard) {
        if (wildcard === void 0) { wildcard = false; }
        var result = []
            // starts with
            .concat(dictionary.filter(function (str) { return new RegExp('^' + keyword, 'gmi').test(str); }))
            // ends with
            .concat(dictionary.filter(function (str) { return new RegExp(keyword + '$', 'gmi').test(str); }));
        if (wildcard) {
            // matches
            result.push.apply(result, dictionary.filter(function (str) { return str.includes(keyword); }));
            // without vowel words
            result.push.apply(result, dictionary.filter(function (str) { return str.includes(keyword); }));
        }
        return result.filter(function (x, i, a) {
            return a.indexOf(x) === i;
        });
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
        var a, b;
        var keyword = e.target.value;
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
        var dictionaries = findStr(keyword, arrayData, wildcard);
        // .sort((a, b) => {
        //   const ai = a.indexOf(keyword);
        //   const bi = b.indexOf(keyword);
        //   return (ai > -1 && bi > -1 && ai - bi) || -1;
        // })
        // .reverse();
        for (var i = 0; i < dictionaries.length; i++) {
          var line = dictionaries[i];
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

    // https://codepen.io/dimaslanjaka/pen/MWxqJRX?editors=1010
    var autoCompleteData = [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antigua &amp; Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bosnia &amp; Herzegovina',
        'Botswana',
        'Brazil',
        'British Virgin Islands',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Cape Verde',
        'Cayman Islands',
        'Central Arfrican Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Congo',
        'Cook Islands',
        'Costa Rica',
        'Cote D Ivoire',
        'Croatia',
        'Cuba',
        'Curacao',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Ethiopia',
        'Falkland Islands',
        'Faroe Islands',
        'Fiji',
        'Finland',
        'France',
        'French Polynesia',
        'French West Indies',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Kosovo',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macau',
        'Macedonia',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauro',
        'Nepal',
        'Netherlands',
        'Netherlands Antilles',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Korea',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestine',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Reunion',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Pierre &amp; Miquelon',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Korea',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'St Kitts &amp; Nevis',
        'St Lucia',
        'St Vincent',
        'Sudan',
        'Suriname',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        "Timor L'Este",
        'Togo',
        'Tonga',
        'Trinidad &amp; Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks &amp; Caicos',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States of America',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City',
        'Venezuela',
        'Vietnam',
        'Virgin Islands (US)',
        'Yemen',
        'Zambia',
        'Zimbabwe'
    ];
    autocomplete(document.getElementById('myInput'), autoCompleteData, false);

})();
//# sourceMappingURL=sample.js.map

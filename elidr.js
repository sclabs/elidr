if (Meteor.isClient) {
  Template.main.output = function () {
    // get the text to analyze
    text = Session.get('text');
    if (!text) return '';
    
    // split the text into lines
    lines = text.split('\n');
    
    for (i = 0; i < lines.length; i++) {
      // split the lines into words
      words = lines[i].split(' ');

      for (j = 0; j < words.length - 1; j++) {
        // check for elision
        if (words[j].match(/[aeioum]\b/) && words[j+1].match(/\b[aeiouh]/)) {
          // check for diphthong at end of first word
          if (words[j].match(/((ae)|(oe)|(au)|(m))\b/)) {
            // markup word to show elided letters
            words[j] = words[j].substring(0, words[j].length-2) + '<em>' + words[j].substring(words[j].length-2, words[j].length) + '</em>';
          } else {
            // markup word to show elided letters
            words[j] = words[j].substring(0, words[j].length-1) + '<em>' + words[j].substring(words[j].length-1, words[j].length) + '</em>';
          }
        }
      }

      // reconstruct the line
      lines[i] = words.join(' ');
    }
    return lines.join('<br>');
  };

  Template.main.events({
    "click .action-elide": function() {
      Session.set('text', $("#input").val());
    }
  });
}

$(document).ready(function() {
    // Check if the current page is the homepage
  if (window.location.pathname === homepagePath) {
        // Your streaming code here...
        var delay = 10; // delay in milliseconds
        var container = $('article');
        var html = $.parseHTML($('article').html(), document, true);
        var nodes = getNodesInOrder(html);
        var i = 0;
        var j = 0;
      
        // Clear the original content
        $('article').empty();
      
        function getNodesInOrder(node) {
          var nodes = [];
          node.forEach(function(el) {
            if (el.nodeType === Node.TEXT_NODE) {
              nodes.push({type: 'text', value: el});
            } else {
              var emptyElement = el.outerHTML.replace(el.innerHTML, '');
              nodes.push({type: 'element', value: emptyElement});
              nodes = nodes.concat(getNodesInOrder(el.childNodes));
            }
          });
          return nodes;
        }
      
        function showNextCharacter() {
          if (nodes[i].type === 'element') {
            container.append(nodes[i].value);
            i++;
          } else if (j < nodes[i].value.nodeValue.length) {
            // Append the next character of the current text node
            container.append(nodes[i].value.nodeValue[j]);
            j++;
          } else if (i < nodes.length - 1) {
            // Move on to the next node
            i++;
            j = 0;
          } else {
            // All nodes have been streamed
            return;
          }
      
          setTimeout(showNextCharacter, delay);
        }
      
        showNextCharacter();
    }
});
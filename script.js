    <script>
    // Local image filenames saved in the same folder as html.html:
    var bgLink1 = "bg1.jpg";
    var bgLink2 = "bg2.jpg";

    // Set initial background on page load (1st tab)
    document.body.style.backgroundImage = "url('" + bgLink1 + "')";

    function openTab(evt, tabName, bgChoice) {
      var contents = document.querySelectorAll('.tab-content');
      for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
      }

      var buttons = document.querySelectorAll('.tab-btn');
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
      }

      document.getElementById(tabName).classList.add('active');
      evt.currentTarget.classList.add('active');

      // Keep the word "url" here — only edit bgLink1 and bgLink2 at the top!
      if (bgChoice === 1) {
        document.body.style.backgroundImage = "url('" + bgLink1 + "')";
      } else {
        document.body.style.backgroundImage = "url('" + bgLink2 + "')";
      }
    }
  </script>

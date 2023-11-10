document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const startVoiceSearchButton = document.getElementById('startVoiceSearchButton');
    const stopVoiceSearchButton = document.getElementById('stopVoiceSearchButton');
    const timerDisplay = document.getElementById('timer');
    let recognition;
    let timerInterval = null;
    let timeStarted = null;
  
    // Initialize speech recognition if supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (typeof SpeechRecognition !== "undefined") {
      recognition = new SpeechRecognition();
      recognition.continuous = true; // Continue capturing until stopped
      recognition.interimResults = true; // Show results in real-time
  
      // Start the timer function
      function startTimer() {
        timeStarted = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
      }
  
      // Update the timer display
      function updateTimer() {
        const now = new Date().getTime();
        const elapsedTime = new Date(now - timeStarted);
        const minutes = elapsedTime.getUTCMinutes();
        const seconds = elapsedTime.getUTCSeconds();
        timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
  
      // Stop the timer function
      function stopTimer() {
        clearInterval(timerInterval);
        updateTimer(); // Final update to the timer display
        timerInterval = null;
      }
  
      // Define the onresult event for the recognition
      recognition.onresult = function(event) {
        // Concatenate all the interim results into the search input
        let interimTranscript = '';
        for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
          interimTranscript += event.results[i][0].transcript;
        }
        searchInput.value = interimTranscript;
      };
  
      // Define the onend event to reset the UI
      recognition.onend = function() {
        stopTimer();
        startVoiceSearchButton.style.display = "inline";
        stopVoiceSearchButton.style.display = "none";
      };
  
      // Start speech recognition and the timer
      startVoiceSearchButton.addEventListener('click', function() {
        recognition.start();
        startTimer();
        this.style.display = "none";
        stopVoiceSearchButton.style.display = "inline";
      });
  
      // Stop speech recognition and the timer
      stopVoiceSearchButton.addEventListener('click', function() {
        recognition.stop(); // Will also trigger onend event
        stopTimer();
      });
  
    } else {
      // Hide speech recognition UI if not supported
      startVoiceSearchButton.style.display = "none";
      stopVoiceSearchButton.style.display = "none";
      timerDisplay.style.display = "none";
      alert("Speech recognition not available.");
    }
  });
  
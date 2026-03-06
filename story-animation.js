// Story content with typing animation
const storyContent = `
Welcome to your special day!

As I watched the flowers bloom,
I thought of how beautiful you are.
Just like these flowers taking time to grow,
so do we grow as people.

Today marks another year of your journey,
Another year of memories to cherish,
Another chance to dream bigger,
And to reach for the stars.

I wish you a year filled with,
Laughter and joy,
Success and happiness,
And moments that take your breath away.

Remember, you are stronger than you believe,
More talented than you imagine,
And worthy of all the good things life has to offer.

So celebrate today like never before,
Make the most of every single moment,
And know that you are truly special,
To everyone around you.

Happy Birthday!
`;

// Configuration
const TYPING_SPEED = 150; // Speed of typing in milliseconds per character
let isTyping = false;
let typingTimeout = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const messageButton = document.getElementById('messageButton');
  const storyContainer = document.getElementById('storyContainer');
  const storyCloseBtn = document.getElementById('storyCloseBtn');
  const storyText = document.getElementById('storyText');
  const audioPlayer = document.getElementById('storyAudio');
  const playBtn = document.getElementById('playPauseBtn');
  const vinyl = document.getElementById('vinyl');
  
  // Open story message when clicking message button
  if (messageButton) {
    messageButton.addEventListener('click', function(e) {
      e.stopPropagation();
      openStory();
    });
  }
  
  // Close story when clicking close button
  if (storyCloseBtn) {
    storyCloseBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeStory();
    });
  }
  
  // Close story when clicking outside the wrapper
  if (storyContainer) {
    storyContainer.addEventListener('click', function(e) {
      if (e.target === storyContainer) {
        closeStory();
      }
    });
  }
  
  // Function to open story and start typing
  function openStory() {
    storyContainer.classList.add('show');
    storyText.textContent = '';
    
    // Start audio
    if (audioPlayer) {
      audioPlayer.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Update vinyl animation
    if (vinyl) {
      vinyl.classList.add('spinning');
    }
    
    // Start typing animation
    typeText(storyContent, storyText);
  }
  
  // Function to close story
  function closeStory() {
    storyContainer.classList.remove('show');
    
    // Stop typing animation
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
    isTyping = false;
    
    // Pause audio
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
    
    // Stop vinyl animation
    if (vinyl) {
      vinyl.classList.remove('spinning');
    }
    
    // Reset play button
    if (playBtn) {
      playBtn.textContent = '▶';
    }
    
    // Clear text
    storyText.textContent = '';
    storyText.classList.remove('completed');
  }
  
  // Typing animation function
  function typeText(text, element) {
    isTyping = true;
    let index = 0;
    const cleanText = text.trim();
    
    // Clear any existing content
    element.textContent = '';
    element.classList.remove('completed');
    
    function type() {
      if (index < cleanText.length && isTyping) {
        element.textContent += cleanText.charAt(index);
        
        // Scroll to bottom of text area
        if (element.scrollHeight) {
          element.parentElement.scrollTop = element.parentElement.scrollHeight;
        }
        
        index++;
        typingTimeout = setTimeout(type, TYPING_SPEED);
      } else if (index >= cleanText.length) {
        isTyping = false;
        element.classList.add('completed');
      }
    }
    
    type();
  }
  
  // Setup vinyl player controls
  if (playBtn) {
    playBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = '⏸';
        if (vinyl) vinyl.classList.add('spinning');
      } else {
        audioPlayer.pause();
        playBtn.textContent = '▶';
        if (vinyl) vinyl.classList.remove('spinning');
      }
    });
  }
  
  // Update time display for audio player
  if (audioPlayer) {
    audioPlayer.addEventListener('timeupdate', function() {
      const currentTime = document.getElementById('currentTime');
      if (currentTime) {
        const minutes = Math.floor(audioPlayer.currentTime / 60);
        const seconds = Math.floor(audioPlayer.currentTime % 60);
        currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    });
    
    // Pause vinyl if audio ends
    audioPlayer.addEventListener('ended', function() {
      if (vinyl) vinyl.classList.remove('spinning');
      playBtn.textContent = '▶';
    });
  }
});

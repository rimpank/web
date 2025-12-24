const codeOutput = document.getElementById('codeOutput');
const popup = document.getElementById('popup');
const settingsToggle = document.getElementById('settingsToggle');
const settings = document.getElementById('settings');
const codeStyle = document.getElementById('codeStyle');

const codeSnippets = {
  kernel: [
    'void init_kernel(void) {',
    '  printk(KERN_INFO "Initializing kernel module...");',
    '  setup_interrupts();',
    '  return 0;',
    '}',
    'struct task_struct *task = get_current();'
  ],
  terminal: [
    '$ sudo apt-get update',
    'Hit:1 http://security.ubuntu.com/ubuntu focal-security InRelease',
    '$ whoami',
    'user',
    '$ chmod +x script.sh',
    '$ ./script.sh'
  ]
};

let altCount = 0;
let currentStyle = 'kernel';

// Generate random code snippet
function addCodeSnippet() {
  const snippets = codeSnippets[currentStyle];
  const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
  codeOutput.value += randomSnippet + '\n';
  codeOutput.scrollTop = codeOutput.scrollHeight;
}

// Show popup message
function showPopup(message, color) {
  popup.textContent = message;
  popup.style.color = color;
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.add('hidden');
  }, 2000);
}

// Handle typing
document.addEventListener('keydown', (e) => {
  e.preventDefault(); // Prevent default textarea behavior
  if (e.key === 'Alt') {
    altCount++;
    if (altCount >= 3) {
      const isGranted = Math.random() > 0.5;
      showPopup(
        isGranted ? 'Access Granted' : 'Access Denied',
        isGranted ? '#00ff00' : '#ff0000'
      );
      altCount = 0;
    }
  } else if (e.key === 'Escape') {
    popup.classList.add('hidden');
  } else {
    addCodeSnippet();
  }
});

// Toggle settings
settingsToggle.addEventListener('click', () => {
  settings.classList.toggle('hidden');
});

// Change code style
codeStyle.addEventListener('change', () => {
  currentStyle = codeStyle.value;
  codeOutput.value = '';
});

// Focus textarea for immediate typing
codeOutput.focus();

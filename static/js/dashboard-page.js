// --- Sidebar Logic ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebar.classList.contains('-translate-x-full')) {
        // Open
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        // Close
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }
}

// --- Navigation Logic ---
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(el => {
        el.classList.add('hidden');
    });

    // Show target section
    const target = document.getElementById(`section-${sectionId}`);
    if (target) {
        target.classList.remove('hidden');
    }

    // Update Nav State
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-brand-50', 'text-brand-600');
        el.classList.add('text-slate-600', 'hover:bg-slate-50');
    });

    const activeNav = document.getElementById(`nav-${sectionId}`);
    if (activeNav) {
        activeNav.classList.remove('text-slate-600', 'hover:bg-slate-50');
        activeNav.classList.add('bg-brand-50', 'text-brand-600');
    }

    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar.classList.contains('-translate-x-full')) {
            toggleSidebar();
        }
    }
}

// --- Profile Modal Logic ---
function openEditProfileModal() {
    document.getElementById('edit-profile-modal').classList.remove('hidden');
}

function closeEditProfileModal() {
    document.getElementById('edit-profile-modal').classList.add('hidden');
}

// --- Password Modal Logic ---
function openPasswordModal() {
    document.getElementById('password-modal').classList.remove('hidden');
}

function closePasswordModal() {
    document.getElementById('password-modal').classList.add('hidden');
}

// --- Toast Notification ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');

    const colors = type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white';
    const icon = type === 'success'
        ? '<svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>'
        : '<svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';

    toast.className = `${colors} px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300 pointer-events-auto min-w-[300px]`;
    toast.innerHTML = `
            ${icon}
            <span class="font-medium">${message}</span>
        `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    // Remove after 3s
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- API Handlers (Mock) ---
async function handleUpdateProfile(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
            `;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/api/auth/edit-user-profile/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (res.ok) {
            document.getElementById('user-profile-fullname').innerText = resData.profile_data.full_name;
            document.getElementById('user-profile-username').innerText = resData.profile_data.username;
            document.getElementById('user-profile-email').innerText = resData.profile_data.email;
            closeEditProfileModal();
            e.target.reset();
            showToast(resData.message || 'Profile updated successfully!');
        } else {
            showToast(resData.error || 'Error saving profile', 'error');
        };
    } catch (err) {
        showToast('Error saving profile', 'error');
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

async function handleChangePassword(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.new_password !== data.confirm_password) {
        showToast('Passwords do not match', 'error');
        return;
    }

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
            `;

    try {
        const res = await fetch('/api/auth/change-user-password/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (res.ok) {
            showToast(resData.message || 'Password changed successfully!');
            closePasswordModal();
            e.target.reset();
        } else {
            showToast(resData.error || 'Error changing password', 'error');
        };
    } catch (err) {
        showToast('Error changing password', 'error');
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

async function handleLLMConfig(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
            `;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/api/ai-models/save-user-llm-config/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (res.ok) {
            showToast(resData.message || 'LLM configuration saved successfully!');
        } else {
            showToast(resData.error || 'Error saving LLM configuration', 'error');
        };
    } catch (err) {
        showToast('Error saving LLM configuration', 'error');
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

async function handleVoiceConfig(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
            `;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/api/ai-models/save-user-tts-config/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (res.ok) {
            showToast(resData.message || 'Voice configuration saved successfully!');
        } else {
            showToast(resData.error || 'Error saving Voice configuration', 'error');
        };
    } catch (err) {
        showToast('Error saving Voice configuration', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

// --- Dynamic LLM Options ---

function updateModelOptions() {
    const providerSelect = document.getElementById('llm-provider-select');
    const modelSelect = document.getElementById('llm-model-select');
    const selectedProvider = providerSelect.value;

    // Clear existing options
    modelSelect.innerHTML = '';

    const models = llmModels[selectedProvider] || [];

    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
}

// --- Dynamic Voice/TTS Options ---

function updateVoiceOptions() {
    const providerSelect = document.getElementById('tts-provider-select');
    const modelSelect = document.getElementById('tts-model-select');
    const voiceSelect = document.getElementById('tts-voice-select');

    if (!providerSelect || !modelSelect || !voiceSelect) return;

    const selectedProvider = providerSelect.value;

    // Update Models
    modelSelect.innerHTML = '';
    const models = ttsModels[selectedProvider] || [];
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });

    // Update Voices
    voiceSelect.innerHTML = '';
    const voices = ttsVoices[selectedProvider] || [];
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice;
        option.textContent = voice;
        voiceSelect.appendChild(option);
    });
}

// --- Load User Configurations ---
async function loadUserLLMConfig() {
    try {
        const res = await fetch('/api/ai-models/get-user-llm-config/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        });

        if (res.ok && res.status === 200) {
            const data = await res.json();

            // Set provider
            const providerSelect = document.getElementById('llm-provider-select');
            if (providerSelect && data.provider) {
                providerSelect.value = data.provider;
                // Update model options based on provider
                updateModelOptions();

                // Set model after options are updated
                setTimeout(() => {
                    const modelSelect = document.getElementById('llm-model-select');
                    if (modelSelect && data.model) {
                        modelSelect.value = data.model;
                    }
                }, 50);
            }

            // Set API key
            const apiKeyInput = document.querySelector('#section-settings form[onsubmit="handleLLMConfig(event)"] input[name="api_key"]');
            if (apiKeyInput && data.api_key) {
                apiKeyInput.value = data.api_key;
            }
        }
    } catch (err) {
        console.error('Error loading LLM config:', err);
    }
}

async function loadUserTTSConfig() {
    try {
        const res = await fetch('/api/ai-models/get-user-tts-config/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        });

        if (res.ok && res.status === 200) {
            const data = await res.json();

            // Set provider
            const providerSelect = document.getElementById('tts-provider-select');
            if (providerSelect && data.provider) {
                providerSelect.value = data.provider;
                // Update model and voice options based on provider
                updateVoiceOptions();

                // Set model and voice after options are updated
                setTimeout(() => {
                    const modelSelect = document.getElementById('tts-model-select');
                    if (modelSelect && data.model) {
                        modelSelect.value = data.model;
                    }

                    const voiceSelect = document.getElementById('tts-voice-select');
                    if (voiceSelect && data.voice_name) {
                        voiceSelect.value = data.voice_name;
                    }
                }, 50);
            }

            // Set API key
            const apiKeyInput = document.querySelector('#section-settings form[onsubmit="handleVoiceConfig(event)"] input[name="api_key"]');
            if (apiKeyInput && data.api_key) {
                apiKeyInput.value = data.api_key;
            }
        }
    } catch (err) {
        console.error('Error loading TTS config:', err);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateModelOptions();
    updateVoiceOptions();
    // Load user configurations
    loadUserLLMConfig();
    loadUserTTSConfig();
});

// --- Hash Navigation Support ---
function handleHashNavigation() {
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (hash && ['home', 'profile', 'settings', 'blog'].includes(hash)) {
        showSection(hash);
    } else if (!hash) {
        // Default to home if no hash
        showSection('home');
    }
}

// Store the original showSection function
const originalShowSection = showSection;

// Override showSection to update URL hash
showSection = function (sectionId) {
    originalShowSection(sectionId);
    // Update URL hash without triggering page reload
    if (window.location.hash !== '#' + sectionId) {
        window.location.hash = sectionId;
    }
};

// Handle initial hash navigation on page load
window.addEventListener('DOMContentLoaded', () => {
    handleHashNavigation();
});

// Handle hash changes (browser back/forward navigation)
window.addEventListener('hashchange', handleHashNavigation);

function togglePasswordVisibility(button) {
    const input = button.parentElement.querySelector('input');
    const eyeIcon = button.querySelector('svg');
    if (input.type === "password") {
        input.type = "text";
        eyeIcon.innerHTML = `
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                  <circle cx="12" cy="12" r="3"/>
                  <line x1="2" y1="2" x2="22" y2="22"/>
                `;
        eyeIcon.setAttribute('aria-label', 'Hide');
    } else {
        input.type = "password";
        eyeIcon.innerHTML = `
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                  <circle cx="12" cy="12" r="3"/>
                `;
        eyeIcon.setAttribute('aria-label', 'Show');
    }
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered successfully:', registration);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}
// Top 100+ Languages with their codes
const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'ur-PK', name: 'Urdu' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'zh-TW', name: 'Chinese (Traditional)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'ar-SA', name: 'Arabic' },
    { code: 'pt-PT', name: 'Portuguese' },
    { code: 'bn-BD', name: 'Bengali' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'pa-IN', name: 'Punjabi' },
    { code: 'de-DE', name: 'German' },
    { code: 'jv-ID', name: 'Javanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'fr-FR', name: 'French' },
    { code: 'te-IN', name: 'Telugu' },
    { code: 'mr-IN', name: 'Marathi' },
    { code: 'tr-TR', name: 'Turkish' },
    { code: 'ta-IN', name: 'Tamil' },
    { code: 'vi-VN', name: 'Vietnamese' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'th-TH', name: 'Thai' },
    { code: 'gu-IN', name: 'Gujarati' },
    { code: 'pl-PL', name: 'Polish' },
    { code: 'uk-UA', name: 'Ukrainian' },
    { code: 'ml-IN', name: 'Malayalam' },
    { code: 'kn-IN', name: 'Kannada' },
    { code: 'or-IN', name: 'Oriya' },
    { code: 'my-MM', name: 'Burmese' },
    { code: 'fa-IR', name: 'Persian' },
    { code: 'nl-NL', name: 'Dutch' },
    { code: 'ha-NG', name: 'Hausa' },
    { code: 'su-ID', name: 'Sundanese' },
    { code: 'ro-RO', name: 'Romanian' },
    { code: 'am-ET', name: 'Amharic' },
    { code: 'cs-CZ', name: 'Czech' },
    { code: 'el-GR', name: 'Greek' },
    { code: 'hu-HU', name: 'Hungarian' },
    { code: 'sv-SE', name: 'Swedish' },
    { code: 'fi-FI', name: 'Finnish' },
    { code: 'da-DK', name: 'Danish' },
    { code: 'no-NO', name: 'Norwegian' },
    { code: 'sk-SK', name: 'Slovak' },
    { code: 'he-IL', name: 'Hebrew' },
    { code: 'id-ID', name: 'Indonesian' },
    { code: 'ms-MY', name: 'Malay' },
    { code: 'tl-PH', name: 'Filipino' },
    { code: 'af-ZA', name: 'Afrikaans' },
    { code: 'ca-ES', name: 'Catalan' },
    { code: 'hr-HR', name: 'Croatian' },
    { code: 'sr-RS', name: 'Serbian' },
    { code: 'bg-BG', name: 'Bulgarian' },
    { code: 'lt-LT', name: 'Lithuanian' },
    { code: 'lv-LV', name: 'Latvian' },
    { code: 'et-EE', name: 'Estonian' },
    { code: 'sl-SI', name: 'Slovenian' },
    { code: 'sw-KE', name: 'Swahili' },
    { code: 'zu-ZA', name: 'Zulu' },
    { code: 'xh-ZA', name: 'Xhosa' },
    { code: 'is-IS', name: 'Icelandic' },
    { code: 'sq-AL', name: 'Albanian' },
    { code: 'az-AZ', name: 'Azerbaijani' },
    { code: 'eu-ES', name: 'Basque' },
    { code: 'be-BY', name: 'Belarusian' },
    { code: 'bs-BA', name: 'Bosnian' },
    { code: 'cy-GB', name: 'Welsh' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'gl-ES', name: 'Galician' },
    { code: 'ka-GE', name: 'Georgian' },
    { code: 'hy-AM', name: 'Armenian' },
    { code: 'kk-KZ', name: 'Kazakh' },
    { code: 'km-KH', name: 'Khmer' },
    { code: 'ky-KG', name: 'Kyrgyz' },
    { code: 'lo-LA', name: 'Lao' },
    { code: 'la', name: 'Latin' },
    { code: 'mk-MK', name: 'Macedonian' },
    { code: 'mg-MG', name: 'Malagasy' },
    { code: 'mt-MT', name: 'Maltese' },
    { code: 'mn-MN', name: 'Mongolian' },
    { code: 'ne-NP', name: 'Nepali' },
    { code: 'ps-AF', name: 'Pashto' },
    { code: 'si-LK', name: 'Sinhala' },
    { code: 'so-SO', name: 'Somali' },
    { code: 'tg-TJ', name: 'Tajik' },
    { code: 'uz-UZ', name: 'Uzbek' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'yo-NG', name: 'Yoruba' },
    { code: 'ig-NG', name: 'Igbo' },
    { code: 'sn-ZW', name: 'Shona' },
    { code: 'st-ZA', name: 'Sesotho' },
    { code: 'sd-PK', name: 'Sindhi' },
    { code: 'fy-NL', name: 'Frisian' },
    { code: 'ga-IE', name: 'Irish' },
    { code: 'gd-GB', name: 'Scottish Gaelic' },
    { code: 'ht-HT', name: 'Haitian Creole' },
    { code: 'ku-TR', name: 'Kurdish' },
    { code: 'lb-LU', name: ' Luxembourgish' },
    { code: 'mi-NZ', name: 'Maori' },
    { code: 'ny-MW', name: 'Chichewa' },
    { code: 'sm-WS', name: 'Samoan' },
    { code: 'co-FR', name: 'Corsican' }
];



document.addEventListener('DOMContentLoaded', function () {

    const sourceText = document.getElementById('sourceText');
    const targetText = document.getElementById('targetText');
    const translateBtn = document.getElementById('translateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const listenSourceBtn = document.getElementById('listenSourceBtn');
    const listenTargetBtn = document.getElementById('listenTargetBtn');
    const micSourceBtn = document.getElementById('micSourceBtn');
    const copySourceBtn = document.getElementById('copySourceBtn');
    const clearTextBtn = document.getElementById('clearTextBtn');

    // Icon Templates
    const stopIconTemplate = document.getElementById('stop-icon').content;
    const tickIconTemplate = document.getElementById('tick-icon').content;

    // Store original icons
    const micSourceBtnOriginalIcon = micSourceBtn.innerHTML;
    const pasteBtnOriginalIcon = pasteBtn.innerHTML;
    const listenSourceBtnOriginalIcon = listenSourceBtn.innerHTML;
    const listenTargetBtnOriginalIcon = listenTargetBtn.innerHTML;


    // Language dropdowns
    const sourceLangBtn = document.getElementById('sourceLangBtn');
    const sourceLangMenu = document.getElementById('sourceLangMenu');
    const sourceLangSearch = document.getElementById('sourceLangSearch');
    const sourceLangList = document.getElementById('sourceLangList');
    const sourceLangText = document.getElementById('sourceLangText');

    const targetLangBtn = document.getElementById('targetLangBtn');
    const targetLangMenu = document.getElementById('targetLangMenu');
    const targetLangSearch = document.getElementById('targetLangSearch');
    const targetLangList = document.getElementById('targetLangList');
    const targetLangText = document.getElementById('targetLangText');



    // --- Language Selection State ---
    let selectedSourceLang = 'en-US';
    let selectedTargetLang = 'es-ES';

    // Load saved languages from localStorage
    const savedSourceLangCode = localStorage.getItem('sourceLangCode');
    const savedSourceLangName = localStorage.getItem('sourceLangName');
    const savedTargetLangCode = localStorage.getItem('targetLangCode');
    const savedTargetLangName = localStorage.getItem('targetLangName');

    if (savedSourceLangCode && savedSourceLangName) {
        selectedSourceLang = savedSourceLangCode;
        sourceLangText.textContent = savedSourceLangName;
    }

    if (savedTargetLangCode && savedTargetLangName) {
        selectedTargetLang = savedTargetLangCode;
        targetLangText.textContent = savedTargetLangName;
    }

    // Initialize language lists
    function renderLanguageList(container, searchValue, type) {
        const filtered = languages.filter(lang =>
            lang.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        container.innerHTML = '';
        filtered.forEach(lang => {
            const isSelected = type === 'source'
                ? lang.code === selectedSourceLang
                : lang.code === selectedTargetLang;

            const item = document.createElement('div');
            item.className = `lang-item ${isSelected ? 'selected' : ''}`;
            item.textContent = lang.name;
            item.dataset.code = lang.code;
            item.dataset.name = lang.name;

            item.addEventListener('click', function () {
                if (type === 'source') {
                    // If the selected source language is the same as the target language,
                    // swap the target language with the old source language.
                    if (lang.code === selectedTargetLang) {
                        const oldSourceLangCode = selectedSourceLang;
                        const oldSourceLangName = sourceLangText.textContent;
                        selectedTargetLang = oldSourceLangCode;
                        targetLangText.textContent = oldSourceLangName;
                        localStorage.setItem('targetLangCode', oldSourceLangCode);
                        localStorage.setItem('targetLangName', oldSourceLangName);
                    }

                    selectedSourceLang = lang.code;
                    sourceLangText.textContent = lang.name;
                    localStorage.setItem('sourceLangCode', lang.code);
                    localStorage.setItem('sourceLangName', lang.name);
                } else {
                    // If the selected target language is the same as the source language,
                    // swap the source language with the old target language.
                    if (lang.code === selectedSourceLang) {
                        const oldTargetLangCode = selectedTargetLang;
                        const oldTargetLangName = targetLangText.textContent;
                        selectedSourceLang = oldTargetLangCode;
                        sourceLangText.textContent = oldTargetLangName;
                        localStorage.setItem('sourceLangCode', oldTargetLangCode);
                        localStorage.setItem('sourceLangName', oldTargetLangName);
                    }

                    selectedTargetLang = lang.code;
                    targetLangText.textContent = lang.name;
                    localStorage.setItem('targetLangCode', lang.code);
                    localStorage.setItem('targetLangName', lang.name);
                }

                // Close menus and re-render lists to show updated selections
                sourceLangMenu.classList.remove('active');
                targetLangMenu.classList.remove('active');
                renderLanguageList(sourceLangList, sourceLangSearch.value, 'source');
                renderLanguageList(targetLangList, targetLangSearch.value, 'target');
            });

            container.appendChild(item);
        });
    }

    // Initialize both dropdowns
    renderLanguageList(sourceLangList, '', 'source');
    renderLanguageList(targetLangList, '', 'target');

    // Toggle dropdowns
    sourceLangBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        sourceLangMenu.classList.toggle('active');
        targetLangMenu.classList.remove('active');
        if (sourceLangMenu.classList.contains('active')) {
            sourceLangSearch.focus();
        }
    });

    targetLangBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        targetLangMenu.classList.toggle('active');
        sourceLangMenu.classList.remove('active');
        if (targetLangMenu.classList.contains('active')) {
            targetLangSearch.focus();
        }
    });

    // Search functionality
    sourceLangSearch.addEventListener('input', function (e) {
        renderLanguageList(sourceLangList, e.target.value, 'source');
    });

    targetLangSearch.addEventListener('input', function (e) {
        renderLanguageList(targetLangList, e.target.value, 'target');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
        sourceLangMenu.classList.remove('active');
        targetLangMenu.classList.remove('active');
    });

    // --- Event Propagation Management ---
    // Prevent dropdowns from closing when clicking inside them
    function stopPropagation(element) {
        if (element) {
            element.addEventListener('click', e => e.stopPropagation());
        }
    }

    stopPropagation(sourceLangMenu);
    stopPropagation(targetLangMenu);

    // --- Prompt Management ---
    const promptMenuBtn = document.getElementById('promptMenuBtn');
    const promptMenu = document.getElementById('promptMenu');
    const promptList = document.getElementById('promptList');
    const applyPromptBtn = document.getElementById('applyPromptBtn');
    const managePromptsBtn = document.getElementById('managePromptsBtn');
    const promptModal = document.getElementById('promptModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const promptsContainer = document.getElementById('promptsContainer');
    const addPromptBtn = document.getElementById('addPromptBtn');
    const promptEditModal = document.getElementById('promptEditModal');
    const closeEditModalBtn = document.getElementById('closeEditModalBtn');
    const editModalTitle = document.getElementById('editModalTitle');
    const promptNameInput = document.getElementById('promptNameInput');
    const promptTextInput = document.getElementById('promptTextInput');
    const savePromptBtn = document.getElementById('savePromptBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const selectedPromptLabel = document.getElementById('selectedPromptLabel');

    let prompts = [];
    let selectedPrompt = null;
    let editingPromptId = null;

    async function loadPrompts() {
        try {
            const response = await fetch('/api/ai-models/get-text-formatter-prompt/');
            if (response.ok) {
                const data = await response.json();
                prompts = data.prompts || [];
                renderPromptList();
                renderPromptsContainer();
            }
        } catch (error) {
            console.error('Error loading prompts:', error);
        }
    }

    function renderPromptList() {
        promptList.innerHTML = '';
        if (prompts.length === 0) {
            promptList.innerHTML = '<div class="p-3 text-sm text-slate-500 text-center">No prompts yet</div>';
            return;
        }
        prompts.forEach(prompt => {
            const item = document.createElement('div');
            item.className = `prompt-item ${selectedPrompt?.id === prompt.id ? 'bg-brand-50 text-brand-700 font-medium' : ''}`;
            item.textContent = prompt.prompt_name;
            item.addEventListener('click', () => {
                selectedPrompt = prompt;
                selectedPromptLabel.textContent = prompt.prompt_name;
                selectedPromptLabel.classList.remove('hidden');
                promptMenu.classList.remove('active');
            });
            promptList.appendChild(item);
        });
    }

    function renderPromptsContainer() {
        promptsContainer.innerHTML = '';
        if (prompts.length === 0) {
            promptsContainer.innerHTML = '<div class="text-center text-slate-500 py-8">No prompts created yet</div>';
            return;
        }
        prompts.forEach(prompt => {
            const card = document.createElement('div');
            card.className = 'p-4 border border-slate-200 rounded-lg hover:border-brand-300 transition-colors';
            card.innerHTML = `
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h3 class="font-medium text-slate-900 mb-1">${prompt.prompt_name}</h3>
                            <p class="text-sm text-slate-600 line-clamp-2">${prompt.prompt_content}</p>
                        </div>
                        <div class="flex gap-2 ml-3">
                            <button class="edit-prompt p-2 text-slate-400 hover:text-brand-600 rounded-full hover:bg-brand-50" data-id="${prompt.id}">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button class="delete-prompt p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50" data-id="${prompt.id}">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
            promptsContainer.appendChild(card);
        });

        document.querySelectorAll('.edit-prompt').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const prompt = prompts.find(p => p.id === id);
                if (prompt) {
                    editingPromptId = id;
                    editModalTitle.textContent = 'Edit Prompt';
                    promptNameInput.value = prompt.prompt_name;
                    promptTextInput.value = prompt.prompt_content;
                    promptEditModal.classList.add('active');
                }
            });
        });

        document.querySelectorAll('.delete-prompt').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this prompt?')) {
                    const id = parseInt(btn.dataset.id);
                    try {
                        const response = await fetch(`/api/ai-models/delete-text-formatter-prompt/${id}/`, {
                            method: 'DELETE',
                            headers: { 'X-CSRFToken': csrftoken }
                        });
                        if (response.ok) {
                            prompts = prompts.filter(p => p.id !== id);
                            btn.closest('.p-4').remove();
                            if (prompts.length === 0) {
                                promptsContainer.innerHTML = '<div class="text-center text-slate-500 py-8">No prompts created yet</div>';
                            }
                            renderPromptList();
                            if (selectedPrompt?.id === id) {
                                selectedPrompt = null;
                                selectedPromptLabel.classList.add('hidden');
                            }
                        } else {
                            const error = await response.json();
                            alert('Failed to delete: ' + (error.error || 'Unknown error'));
                        }
                    } catch (error) {
                        console.error('Error deleting prompt:', error);
                        alert('Error deleting prompt');
                    }
                }
            });
        });
    }

    async function applyPromptToTranslation(prompt) {
        const text = targetText.textContent.trim();
        if (!text || text === 'Translation will appear here...') {
            alert('Please translate text first');
            return;
        }

        const loaderIconTemplate = document.getElementById('loader-icon').content;
        const originalButtonContent = applyPromptBtn.innerHTML;
        applyPromptBtn.innerHTML = '';
        applyPromptBtn.appendChild(loaderIconTemplate.cloneNode(true));
        applyPromptBtn.disabled = true;
        targetText.innerHTML = '<span class="text-slate-400">Applying prompt...</span>';

        const data = {
            text: text,
            format_instructions: prompt.prompt_content,
        };

        try {
            const response = await fetch('/api/ai-models/text-formatter/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            targetText.textContent = '';
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullText += chunk;
                targetText.textContent = fullText;
            }
        } catch (error) {
            console.error('Error:', error);
            targetText.innerHTML = `<span class="text-red-500">Error: ${error.message}</span>`;
        } finally {
            applyPromptBtn.innerHTML = originalButtonContent;
            applyPromptBtn.disabled = false;
        }
    }

    promptMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        promptMenu.classList.toggle('active');
    });

    applyPromptBtn.addEventListener('click', () => {
        if (selectedPrompt) {
            applyPromptToTranslation(selectedPrompt);
        } else {
            alert('Please select a prompt from the dropdown first');
        }
    });

    managePromptsBtn.addEventListener('click', () => {
        promptMenu.classList.remove('active');
        renderPromptsContainer();
        promptModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        promptModal.classList.remove('active');
    });

    addPromptBtn.addEventListener('click', () => {
        editingPromptId = null;
        editModalTitle.textContent = 'Create Prompt';
        promptNameInput.value = '';
        promptTextInput.value = '';
        promptEditModal.classList.add('active');
    });

    closeEditModalBtn.addEventListener('click', () => {
        promptEditModal.classList.remove('active');
    });

    cancelEditBtn.addEventListener('click', () => {
        promptEditModal.classList.remove('active');
    });

    savePromptBtn.addEventListener('click', async () => {
        const name = promptNameInput.value.trim();
        const text = promptTextInput.value.trim();

        if (!name || !text) {
            alert('Please fill in all fields');
            return;
        }

        try {
            if (editingPromptId) {
                const response = await fetch('/api/ai-models/edit-text-formatter-prompt/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                    body: JSON.stringify({
                        prompt_id: editingPromptId,
                        prompt_name: name,
                        prompt_content: text
                    })
                });
                if (!response.ok) throw new Error('Failed to update prompt');
            } else {
                const response = await fetch('/api/ai-models/save-text-formatter-prompt/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                    body: JSON.stringify({
                        prompt_name: name,
                        prompt_content: text
                    })
                });
                if (!response.ok) throw new Error('Failed to save prompt');
            }

            await loadPrompts();
            promptEditModal.classList.remove('active');
        } catch (error) {
            console.error('Error saving prompt:', error);
            alert('Failed to save prompt');
        }
    });

    document.addEventListener('click', () => {
        promptMenu.classList.remove('active');
    });

    stopPropagation(promptMenu);

    promptModal.addEventListener('click', (e) => {
        if (e.target === promptModal) {
            promptModal.classList.remove('active');
        }
    });

    promptEditModal.addEventListener('click', (e) => {
        if (e.target === promptEditModal) {
            promptEditModal.classList.remove('active');
        }
    });

    loadPrompts();


    const swapLangBtn = document.getElementById('swapLangBtn');
    swapLangBtn.addEventListener('click', function () {
        // Swap the selected language codes
        [selectedSourceLang, selectedTargetLang] = [selectedTargetLang, selectedSourceLang];

        // Swap the displayed language names
        [sourceLangText.textContent, targetLangText.textContent] = [targetLangText.textContent, sourceLangText.textContent];

        // Save the new language preferences to localStorage
        localStorage.setItem('sourceLangCode', selectedSourceLang);
        localStorage.setItem('sourceLangName', sourceLangText.textContent);
        localStorage.setItem('targetLangCode', selectedTargetLang);
        localStorage.setItem('targetLangName', targetLangText.textContent);

        // Re-render the language lists to update the 'selected' class
        renderLanguageList(sourceLangList, '', 'source');
        renderLanguageList(targetLangList, '', 'target');
    });

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isRecording = false;
    let silenceTimer = null;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
    }

    // Cache Manager
    const CacheManager = {
        getTranslation: (text, sourceLang, targetLang) => {
            const key = `trans_${sourceLang}_${targetLang}_${text}`;
            return localStorage.getItem(key);
        },
        saveTranslation: (text, sourceLang, targetLang, result) => {
            const key = `trans_${sourceLang}_${targetLang}_${text}`;
            try {
                localStorage.setItem(key, result);
            } catch (e) {
                console.warn('Cache quota exceeded', e);
            }
        },
        getAudio: (text) => {
            const key = `tts_${text}`;
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        saveAudio: (text, data) => {
            const key = `tts_${text}`;
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (e) {
                console.warn('Cache quota exceeded', e);
            }
        }
    };

    // Translate button
    translateBtn.addEventListener('click', async function () {
        const text = sourceText.value.trim();
        if (!text) {
            return;
        }

        // Check Cache
        const cachedTranslation = CacheManager.getTranslation(text, sourceLangText.textContent, targetLangText.textContent);
        if (cachedTranslation) {
            targetText.textContent = cachedTranslation;
            return;
        }

        const loaderIconTemplate = document.getElementById('loader-icon').content;
        const originalButtonContent = translateBtn.innerHTML;
        translateBtn.innerHTML = '';
        translateBtn.appendChild(loaderIconTemplate.cloneNode(true));
        translateBtn.disabled = true;
        targetText.innerHTML = '<span class="text-slate-400">Translating...</span>';


        const data = {
            text: text,
            source_language: sourceLangText.textContent,
            target_language: targetLangText.textContent,
        };

        try {
            const response = await fetch('/api/ai-models/translate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            targetText.textContent = '';
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullTranslation = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const chunk = decoder.decode(value, { stream: true });
                fullTranslation += chunk;
                targetText.textContent = fullTranslation;
            }

            CacheManager.saveTranslation(text, sourceLangText.textContent, targetLangText.textContent, fullTranslation);

        } catch (error) {
            console.error('Error:', error);
            targetText.innerHTML = `<span class="text-red-500">Error: ${error.message}</span>`;
        } finally {
            translateBtn.innerHTML = originalButtonContent;
            translateBtn.disabled = false;
        }
    });

    // Copy button
    copyBtn.addEventListener('click', async function () {
        const text = targetText.textContent.trim();
        if (text && text !== 'Translation will appear here...') {
            const originalIcon = this.innerHTML;
            try {
                await navigator.clipboard.writeText(text);
                this.innerHTML = '';
                this.appendChild(tickIconTemplate.cloneNode(true));
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                }, 1500);
            } catch (err) {
                this.innerHTML = originalIcon;
                console.error('Failed to copy:', err);
            }
        }
    });

    // Paste button
    pasteBtn.addEventListener('click', async function () {
        const originalIcon = this.innerHTML;
        try {
            const text = await navigator.clipboard.readText();
            sourceText.value = text;
            this.innerHTML = '';
            this.appendChild(tickIconTemplate.cloneNode(true));
            setTimeout(() => {
                this.innerHTML = originalIcon;
            }, 1500);
        } catch (err) {
            this.innerHTML = originalIcon;
            console.error('Failed to paste:', err);
            alert('Paste permission denied. Please paste manually.');
        }
    });

    copySourceBtn.addEventListener('click', async function () {
        const text = sourceText.value.trim();
        if (text) {
            const originalIcon = this.innerHTML;
            try {
                await navigator.clipboard.writeText(text);
                this.innerHTML = '';
                this.appendChild(tickIconTemplate.cloneNode(true));
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                }, 1500);
            } catch (err) {
                this.innerHTML = originalIcon;
                console.error('Failed to copy:', err);
            }
        }
    });

    clearTextBtn.addEventListener('click', function () {
        sourceText.value = '';
        targetText.innerHTML = '<span class="text-slate-400">Translation will appear here...</span>';
    });

    // Clear cache button
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    clearCacheBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to clear all cached translations and audio?')) {
            const keys = Object.keys(localStorage);
            let count = 0;
            keys.forEach(key => {
                if (key.startsWith('trans_') || key.startsWith('tts_')) {
                    localStorage.removeItem(key);
                    count++;
                }
            });
            alert(`Cache cleared! Removed ${count} cached items.`);
        }
    });

    let speakingButton = null;

    // Initialize TTS Handler
    const ttsHandler = new TTSHandler();

    // Google Translate TTS function
    function playCustomTTS(text, button) {
        if (ttsHandler.isPlaying) {
            ttsHandler.stop();
            resetSpeakingButton();
            // If the same button was clicked to stop, strictly stop.
            // But if we want to toggle, we might check if it was THE SAME button.
            // Current logic implies 'stop if playing'.
            return;
        }

        if (!text || !text.trim()) {
            alert('No text to read.');
            return;
        }

        const loaderIconTemplate = document.getElementById('loader-icon').content;
        const originalIcon = button.innerHTML;

        // Show loader
        button.innerHTML = '';
        button.appendChild(loaderIconTemplate.cloneNode(true));
        button.disabled = true;

        ttsHandler.speak(text, {
            onStart: () => {
                button.disabled = false;
                button.innerHTML = '';
                button.appendChild(stopIconTemplate.cloneNode(true));
                button.classList.add('is-speaking', 'bg-blue-500', 'text-white');
                speakingButton = button;
            },
            onEnd: () => {
                button.disabled = false;
                resetSpeakingButton();
                // Ensure specific button icon is restored if resetSpeakingButton didn't catch it logic (it relies on global var)
            },
            onError: (msg) => {
                console.error(msg);
                alert(msg);
                button.disabled = false;
                resetSpeakingButton();
            }
        });
    }

    function resetSpeakingButton() {
        if (speakingButton) {
            if (speakingButton.id === 'listenSourceBtn') {
                speakingButton.innerHTML = listenSourceBtnOriginalIcon;
            } else if (speakingButton.id === 'listenTargetBtn') {
                speakingButton.innerHTML = listenTargetBtnOriginalIcon;
            }
            speakingButton.classList.remove('is-speaking', 'bg-blue-500', 'text-white');
            speakingButton = null;
        }
    }


    // Text-to-speech for source text
    listenSourceBtn.addEventListener('click', function () {
        const text = sourceText.value.trim();
        playCustomTTS(text, listenSourceBtn);
    });

    // Text-to-speech for target text
    listenTargetBtn.addEventListener('click', function () {
        const text = targetText.textContent.trim();
        if (text === 'Translation will appear here...') {
            alert('No translation to read.');
            return;
        }
        playCustomTTS(text, listenTargetBtn);
    });

    // --- Speech-to-Text (Voice Input) ---
    // Helper to merge strings without duplicating overlapping prefixes/suffixes
    function smartMerge(base, addition) {
        if (!base) return addition;
        if (!addition) return base;

        const b = base.trim();
        const a = addition.trim();

        // 1. Check if addition is a cumulative update of base
        if (a.toLowerCase().startsWith(b.toLowerCase())) {
            return addition;
        }

        // 2. Search for the longest overlap between end of base and start of addition
        let overlap = 0;
        const maxCheck = Math.min(b.length, a.length);
        for (let len = maxCheck; len > 0; len--) {
            if (b.slice(-len).toLowerCase() === a.slice(0, len).toLowerCase()) {
                overlap = len;
                break;
            }
        }

        // 3. Return merged with a single space if no overlap, or sliced overlap
        if (overlap > 0) {
            return base.trimEnd() + addition.trimStart().slice(overlap);
        } else {
            return base.trimEnd() + ' ' + addition.trimStart();
        }
    }

    let initialValue = '';
    let lastProcessedResultIndex = 0; // Track which result indices we've already processed

    // Define event handlers once, outside the click handler
    function handleRecognitionStart() {
        isRecording = true;
        sourceText.value = ''; // Clear the textarea when starting voice input
        initialValue = '';
        lastProcessedResultIndex = 0; // Reset for new session
        micSourceBtn.innerHTML = '';
        micSourceBtn.appendChild(stopIconTemplate.cloneNode(true));
        micSourceBtn.classList.add('is-recording', 'bg-red-500', 'text-white');
        micSourceBtn.title = 'Stop Recording';
    }

    function handleRecognitionResult(event) {
        clearTimeout(silenceTimer);

        let interimTranscript = '';
        let newFinals = [];

        // Process only NEW results (those after lastProcessedResultIndex)
        for (let i = lastProcessedResultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                newFinals.push(transcript.trim());
                lastProcessedResultIndex = i + 1; // Mark this result as processed
            } else {
                // Interim results - merge them carefully
                interimTranscript = smartMerge(interimTranscript, transcript);
            }
        }

        // Build the complete final text from all processed finals
        let allFinals = [];
        for (let i = 0; i < lastProcessedResultIndex; i++) {
            if (event.results[i] && event.results[i].isFinal) {
                allFinals.push(event.results[i][0].transcript.trim());
            }
        }

        // Deduplicate finals (for cumulative browser modes)
        let cleanFinals = [];
        for (let i = 0; i < allFinals.length; i++) {
            let isRedundant = false;
            for (let j = i + 1; j < allFinals.length; j++) {
                if (allFinals[j].toLowerCase().includes(allFinals[i].toLowerCase())) {
                    isRedundant = true;
                    break;
                }
            }
            if (!isRedundant) {
                cleanFinals.push(allFinals[i]);
            }
        }

        // Assemble current session text
        let sessionText = cleanFinals.join(' ');
        sessionText = smartMerge(sessionText, interimTranscript);

        // Update the textarea
        sourceText.value = initialValue.trimEnd() + (sessionText ? (initialValue ? ' ' : '') + sessionText : '');

        silenceTimer = setTimeout(() => {
            if (isRecording) {
                recognition.stop();
            }
        }, 10000);
    }

    function handleRecognitionError(event) {
        clearTimeout(silenceTimer);
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
            alert('Speech recognition error: ' + event.error);
        }
    }

    function handleRecognitionEnd() {
        clearTimeout(silenceTimer);
        isRecording = false;
        lastProcessedResultIndex = 0; // Reset for next session
        micSourceBtn.innerHTML = micSourceBtnOriginalIcon;
        micSourceBtn.classList.remove('is-recording', 'bg-red-500', 'text-white');
        micSourceBtn.title = 'Voice Input';
    }

    micSourceBtn.addEventListener('click', function () {
        if (!recognition) {
            alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }
        if (isRecording) {
            recognition.stop();
            return;
        }

        // Set recognition parameters
        recognition.lang = selectedSourceLang;

        // Remove any existing event listeners to prevent duplicates
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;

        // Attach fresh event listeners
        recognition.onstart = handleRecognitionStart;
        recognition.onresult = handleRecognitionResult;
        recognition.onerror = handleRecognitionError;
        recognition.onend = handleRecognitionEnd;

        // Start recognition
        try {
            recognition.start();
        } catch (error) {
            console.error('Failed to start recognition:', error);
            if (error.message.includes('already started')) {
                // Force stop and retry
                recognition.stop();
                setTimeout(() => {
                    try {
                        recognition.start();
                    } catch (retryError) {
                        console.error('Retry failed:', retryError);
                    }
                }, 100);
            }
        }
    });
});
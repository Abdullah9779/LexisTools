document.addEventListener('DOMContentLoaded', function () {
    const sourceText = document.getElementById('sourceText');
    const summaryText = document.getElementById('summaryText');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const clearTextBtn = document.getElementById('clearTextBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const copySourceBtn = document.getElementById('copySourceBtn');
    const copySummaryBtn = document.getElementById('copySummaryBtn');
    const charCount = document.getElementById('charCount');
    const summaryLength = document.getElementById('summaryLength');

    const tickIconTemplate = document.getElementById('tick-icon').content;
    const loaderIconTemplate = document.getElementById('loader-icon').content;

    sourceText.addEventListener('input', function () {
        const count = this.value.length;
        charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
    });

    summarizeBtn.addEventListener('click', async function () {
        const text = sourceText.value.trim();
        if (!text) {
            alert('Please enter some text to summarize.');
            return;
        }

        const originalButtonContent = summarizeBtn.innerHTML;
        summarizeBtn.innerHTML = '';
        summarizeBtn.appendChild(loaderIconTemplate.cloneNode(true));
        summarizeBtn.disabled = true;
        summaryText.innerHTML = '<span class="text-slate-400">Generating summary...</span>';

        const data = {
            text: text,
            length: summaryLength.value
        };

        try {
            const response = await fetch('/api/ai-models/text-summarizer/', {
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

            summaryText.textContent = '';
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullSummary = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullSummary += chunk;
                summaryText.textContent = fullSummary;
            }
        } catch (error) {
            console.error('Error:', error);
            summaryText.innerHTML = `<span class="text-red-500">Error: ${error.message}</span>`;
        } finally {
            summarizeBtn.innerHTML = originalButtonContent;
            summarizeBtn.disabled = false;
        }
    });

    clearTextBtn.addEventListener('click', function () {
        sourceText.value = '';
        summaryText.innerHTML = '<span class="text-slate-400">Summary will appear here...</span>';
        charCount.textContent = '0 characters';
    });

    pasteBtn.addEventListener('click', async function () {
        const originalIcon = this.innerHTML;
        try {
            const text = await navigator.clipboard.readText();
            sourceText.value = text;
            const count = text.length;
            charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
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

    copySummaryBtn.addEventListener('click', async function () {
        const text = summaryText.textContent.trim();
        if (text && text !== 'Summary will appear here...') {
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
});
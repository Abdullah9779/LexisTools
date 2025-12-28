document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const submitBtn = document.getElementById('submit-btn');
    const formError = document.getElementById('form-error');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Reset error
        formError.classList.add('hidden');
        formError.textContent = '';

        // Loading state
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing In...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/auth/sign-in/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                // Success - redirect to dashboard or home
                window.location.href = '/dashboard/#home'; // Or dashboard
            } else {
                // Error
                formError.textContent = result.error || 'Invalid credentials.';
                formError.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error:', error);
            formError.textContent = 'Network error. Please try again.';
            formError.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});
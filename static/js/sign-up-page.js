document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const submitBtn = document.getElementById('submit-btn');
    const formError = document.getElementById('form-error');
    const verificationSection = document.getElementById('verification-section');
    const headerTitle = document.querySelector('h1');
    const headerSubtitle = document.querySelector('.text-center p');
    const userEmailSpan = document.getElementById('user-email');
    const resendBtn = document.getElementById('resend-btn');
    const resendMessage = document.getElementById('resend-message');

    let userEmail = '';

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Reset error
        formError.classList.add('hidden');
        formError.textContent = '';

        // Loading state
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Map fields to API expectation if needed, or ensure input names match
        // API expects: first_name, last_name, email, password, confirm_password (or similar)
        // Let's ensure the payload is correct.
        const payload = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data['confirm-password'] // Input name is confirm-password
        };

        try {
            const response = await fetch('/api/auth/sign-up/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                // Success
                userEmail = data.email;
                userEmailSpan.textContent = userEmail;

                // Hide form and header
                form.classList.add('hidden');
                headerTitle.parentElement.classList.add('hidden'); // Hides the "Create Account" header

                // Show verification
                verificationSection.classList.remove('hidden');
            } else {
                // Error
                formError.textContent = result.error || 'An error occurred during sign up.';
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

    resendBtn.addEventListener('click', async function () {
        if (!userEmail) return;

        resendBtn.disabled = true;
        resendBtn.textContent = 'Sending...';
        resendMessage.textContent = '';
        resendMessage.className = 'text-sm';

        let startTimer = false;

        try {
            const response = await fetch('/api/auth/send-email-verification-link/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify({ email: userEmail })
            });

            const result = await response.json();

            if (response.ok) {
                resendMessage.textContent = 'Verification email sent successfully!';
                resendMessage.classList.add('text-green-600');
                startTimer = true;
            } else {
                resendMessage.textContent = result.message || 'Failed to resend email.';
                resendMessage.classList.add('text-red-500');
            }
        } catch (error) {
            resendMessage.textContent = 'Network error.';
            resendMessage.classList.add('text-red-500');
        } finally {
            if (startTimer) {
                let timeLeft = 60;
                resendBtn.textContent = `Resend in ${timeLeft}s`;

                const timerInterval = setInterval(() => {
                    timeLeft--;
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        resendBtn.disabled = false;
                        resendBtn.textContent = 'Resend Email';
                    } else {
                        resendBtn.textContent = `Resend in ${timeLeft}s`;
                    }
                }, 1000);
            } else {
                resendBtn.disabled = false;
                resendBtn.textContent = 'Resend Email';
            }
        }
    });
});
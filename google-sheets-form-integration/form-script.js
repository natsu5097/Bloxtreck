/**
 * Bloxtreck Form JavaScript
 * Handles form submission to Google Sheets via Google Apps Script Web App
 */

// Replace this URL with your deployed Google Apps Script Web App URL
const WEBAPP_URL = 'YOUR_WEB_APP_URL_HERE';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bloxtreckForm');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');

    // Contact method conditional fields handling
    const contactRadios = document.querySelectorAll('input[name="preferredContact"]');
    const contactFields = document.getElementById('contactFields');
    const emailField = document.getElementById('emailField');
    const phoneField = document.getElementById('phoneField');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    function updateContactFields() {
        const selected = document.querySelector('input[name="preferredContact"]:checked')?.value;

        // Hide both by default
        emailField.classList.remove('show');
        phoneField.classList.remove('show');
        emailInput.required = false;
        phoneInput.required = false;

        if (selected === 'Email') {
            emailField.classList.add('show');
            emailInput.required = true;
        } else if (selected === 'Phone') {
            phoneField.classList.add('show');
            phoneInput.required = true;
        } else if (selected === 'Both') {
            emailField.classList.add('show');
            phoneField.classList.add('show');
            emailInput.required = true;
            phoneInput.required = true;
        }
    }

    // Initialize state
    updateContactFields();
    contactRadios.forEach(r => r.addEventListener('change', updateContactFields));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button to prevent double submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Hide any previous messages
        messageDiv.className = 'message';
        messageDiv.textContent = '';

        // Collect form data
        const formData = {
            username: document.getElementById('username').value.trim(),
            gender: document.getElementById('gender').value,
            preferredContact: document.querySelector('input[name="preferredContact"]:checked')?.value || '',
            email: document.getElementById('email')?.value.trim() || '',
            phone: document.getElementById('phone')?.value.trim() || '',
            location: document.getElementById('location').value.trim(),
            contactTime: document.getElementById('contactTime').value,
            serviceRating: document.querySelector('input[name="serviceRating"]:checked')?.value || '',
            websiteRating: document.querySelector('input[name="websiteRating"]:checked')?.value || '',
            overallRating: document.querySelector('input[name="overallRating"]:checked')?.value || '',
            comments: document.getElementById('comments').value.trim(),
            newsletter: document.getElementById('newsletter').checked ? 'Yes' : 'No',
            profilePicture: document.getElementById('profilePicture').files[0]?.name || 'No file uploaded'
        };

        // Validate required fields
        if (!formData.username) {
            showMessage('Please fill in your username.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Form';
            return;
        }

        // Send data to Google Apps Script
        fetch(WEBAPP_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors mode
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            // Note: With no-cors mode, we can't read the response
            // but we can assume success if no error is thrown
            showMessage('✅ Form submitted successfully! Thank you for your feedback.', 'success');
            
            // Reset form after successful submission
            form.reset();
            
            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('❌ Error submitting form. Please try again or contact support.', 'error');
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Form';
        });
    });

    /**
     * Display a message to the user
     * @param {string} text - The message text
     * @param {string} type - 'success' or 'error'
     */
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type} show`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.className = 'message';
            }, 5000);
        }
    }

    // Optional: Add file input preview
    const fileInput = document.getElementById('profilePicture');
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showMessage('⚠️ File size should be less than 5MB', 'error');
                fileInput.value = '';
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showMessage('⚠️ Please select an image file', 'error');
                fileInput.value = '';
                return;
            }
        }
    });
});

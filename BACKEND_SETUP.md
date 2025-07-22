# Backend Setup for Contact Form

## Overview
The contact form now has a real backend that sends emails when users submit the form.

## Setup Instructions

### 1. Email Configuration

#### For Gmail (Recommended for development):
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Update .env file**:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

#### For Production (Recommended services):
- **SendGrid**: More reliable for production
- **AWS SES**: Cost-effective for high volume
- **Mailgun**: Good for transactional emails

### 2. Environment Variables
Create a `.env` file in the root directory:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3001
NODE_ENV=development
```

### 3. Running the Application

#### Development (Frontend + Backend):
```bash
npm run dev:full
```

#### Frontend only:
```bash
npm run dev
```

#### Backend only:
```bash
npm run server
```

### 4. Testing the Contact Form

1. Start the application: `npm run dev:full`
2. Navigate to `/contact` in your browser
3. Fill out and submit the form
4. Check your email for the message

### 5. API Endpoints

- **POST /api/contact**: Submit contact form
- **GET /api/health**: Health check

### 6. Features

- ✅ **Form validation** (required fields, email format)
- ✅ **Email sending** to your inbox
- ✅ **Confirmation email** to the user
- ✅ **Error handling** with user feedback
- ✅ **Loading states** during submission
- ✅ **CORS enabled** for frontend integration

### 7. Security Notes

- Never commit your `.env` file to version control
- Use app passwords, not your regular password
- Consider rate limiting for production
- Validate and sanitize all inputs

### 8. Troubleshooting

#### "Authentication failed" error:
- Check your email and app password
- Ensure 2FA is enabled
- Try generating a new app password

#### "Connection refused" error:
- Make sure the server is running on port 3001
- Check if the port is already in use

#### Emails not sending:
- Check your email credentials
- Verify your email service settings
- Check the server console for error messages 
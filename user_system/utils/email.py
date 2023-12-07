import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication


def send_email(subject, body, to_email, attachment_path=None):
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "qytasmtp@gmail.com"
    sender_password = "walk feeh dyid rydo"

    # Email message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = to_email
    message["Subject"] = subject

    # Attach text part
    message.attach(MIMEText(body, "plain"))

    # Attach file if specified
    if attachment_path:
        with open(attachment_path, "rb") as attachment:
            part = MIMEApplication(attachment.read(), Name="attachment.txt")
            part["Content-Disposition"] = f"attachment; filename={attachment_path}"
            message.attach(part)

    # Establish connection to SMTP server
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)

        # Send email
        server.sendmail(sender_email, to_email, message.as_string())

# Example usage

if __name__ == "__main__":
    subject = "Test Email"
    body = "Hello, this is a test email."
    recipient_email = "rivendinner@gmail.com" 

    send_email(subject, body, recipient_email)

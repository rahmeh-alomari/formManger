import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      from_name: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      pdfFile: [null, Validators.required], // For storing the uploaded PDF file
      employeeLevel: ['', Validators.required] // For storing the level of the employee
    });
  }

  sendEmail(): void {
    if (this.contactForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const formData = {
      from_name: this.contactForm.value.from_name,
      from_email: this.contactForm.value.from_email,
      message: this.contactForm.value.message,
      pdfFile: this.contactForm.value.pdfFile, // Get the uploaded PDF file from form
      employeeLevel: this.contactForm.value.employeeLevel // Get the employee level from form
    };

    const attachments = [
      {
        filename: formData.pdfFile.name,
        contentType: formData.pdfFile.type,
        data: formData.pdfFile
      }
    ];

    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      message: formData.message,
      employeeLevel: formData.employeeLevel, // Pass employee level to template params
      attachments: attachments
    };

    const serviceId = 'service_6u241zb'; // Replace with your EmailJS service ID
    const templateId = 'template_8su2quk'; // Replace with your EmailJS template ID
    const emailJsPublicKey = environment.emailJsPublicKey; // Replace with your EmailJS user ID

    emailjs.send(serviceId, templateId, templateParams, emailJsPublicKey).then(
      (response: EmailJSResponseStatus) => {
        console.log('Email sent:', response);
        alert('Email sent successfully!');
      },
      (error) => {
        console.error('Error sending email:', error);
        alert('There was an error sending the email.');
      }
    );
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.contactForm.patchValue({
        pdfFile: file
      });
    }
  }
}

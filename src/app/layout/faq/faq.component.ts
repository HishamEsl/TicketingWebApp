import { Component, OnInit } from '@angular/core';
import { IFaqs } from 'src/app/shared/models/faq.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  faqs: IFaqs[] = [
    {
      question: ' How can I use Ticket System ? ',
      answer:
        'Customers can create tickets through various channels such as email, chat, or web forms. When a ticket is created, it will be assigned a unique ID number and added to the ticket queue.',
    },
    {
      question: ' How can I submit a ticket to your support team? ',
      answer:
        'To submit a ticket to our support team, please visit our website and click on the "Contact Us" button. Fill out the form with your name, email address, and a brief description of the issue you are experiencing.',
    },
    {
      question: ' How can I check the status of my ticket? ',
      answer:
        'You can check the status of your ticket by logging into your account on our ticketing system and navigating to the "My Tickets" section. Here, you will see a list of all your open and closed tickets.',
    },
    {
      question: '  How can I reset my password? ',
      answer: 'Please contact us',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

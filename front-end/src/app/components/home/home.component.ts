import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from 'src/app/services/chat/chat.service';

interface Message {
  content: string;
  isUser: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  showChatBalloon: boolean = true;
  perguntasRespostasTexto: string = '';

  constructor(private chatService: ChatService, private http: HttpClient) {}

  ngOnInit() {
    this.loadPerguntasRespostas();
  }

  loadPerguntasRespostas() {
    const perguntasUrl = 'assets/respostas.txt';

    this.http.get(perguntasUrl, { responseType: 'text' }).subscribe(
      respostas => {
        this.perguntasRespostasTexto = respostas;
        const lines = respostas.split('\n\n');
      },
      error => {
        console.error('Erro ao carregar perguntas e respostas:', error);
      }
    );
  }

  sendMessage(message: string) {
    const userMessage: Message = {
      content: message,
      isUser: true
    };
    this.messages.push(userMessage);

    const prompt = this.perguntasRespostasTexto + '\n' + message;

    this.chatService.sendMessage(prompt).subscribe(response => {
      let botMessage: Message;

      if (response.choices.length > 0 && response.choices[0].text.trim() !== '') {
        botMessage = {
          content: response.choices[0].text.trim(),
          isUser: false
        };
      } else {
        botMessage = {
          content: 'Desculpe, não tenho essa informação. Por favor, visite nossa loja para obter mais detalhes.',
          isUser: false
        };
      }

      this.messages.push(botMessage);
    });
  }

  processUserMessage() {
    if (this.newMessage) {
      this.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  toggleChatBalloon() {
    this.showChatBalloon = !this.showChatBalloon;
  }
}

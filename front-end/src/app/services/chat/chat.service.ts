import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private backendUrl = 'link local host'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  sendMessageToBackend(message: string): Observable<any> {
    return this.http.post<any>(
      `${this.backendUrl}/api/send-message`, // Update with your backend endpoint for handling messages
      { message }
    );
  }
}

 // private apiKey = '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';
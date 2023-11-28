import { Injectable } from '@angular/core';
import { Picture } from '../models/pictures';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  picture: Picture[] = [];

  constructor(private http: HttpClient) {}

  getImage() {
    return this.http.get('http://localhost:3000/api/picture', {
      responseType: 'blob',
    });
  }
  getImageById(id: number) {
    return this.http.get(`http://localhost:3000/api/picture/${id}`, {
      responseType: 'blob',
    });
  }

  postImage(formData: FormData) {
    return this.http.post('http://localhost:3000/api/picture', formData);
  }

  deletePhotos(id: number) {
    return this.http.delete(`http://localhost:3000/api/picture/${id}`);
  }
}

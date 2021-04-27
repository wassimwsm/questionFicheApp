import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FicheQuestionService {

  baseUrl=" http://51.210.176.221:3033/exercice/question"
  
  constructor(private _http: HttpClient) { }


  getAllQuestions():any {
    return this._http.get(this.baseUrl+"/all");
  }

  addQuestion(data):any {
    return this._http.post(this.baseUrl+"/create",data);
  }

  updateQuestion(id,data):any {
    return this._http.put(this.baseUrl+"/"+id,data);
  }

  deleteQuestion(id):any {
    return this._http.delete(this.baseUrl+"/"+id);
  }

  searchQuestion(data):any {
    return this._http.get(this.baseUrl+"/search",data);
  }


  
}

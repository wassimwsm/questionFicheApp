import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FicheQuestionService } from '../service/fiche-question.service';


@Component({
  selector: 'app-fiche-question',
  templateUrl: './fiche-question.component.html',
  styleUrls: ['./fiche-question.component.scss']
})
export class FicheQuestionComponent implements OnInit {
  @ViewChild('addModal') public addModal: ModalDirective;
  @ViewChild('modifyModal') public modifyModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;


  constructor(private fb: FormBuilder, public ficheQuestionService: FicheQuestionService) {



  }

  ngOnInit(): void {

    this.getAllQuestions();
  }

  questionForm = this.fb.group({
    question: ['', Validators.required],
    type: ['', Validators.required],

  });
  questionDelete: any;
  questionUpdateId: any;
  searchText = "";

  steps = 4;
  itemsPerPage = 10;
  pagedItems = [];
  currentPage = 0;
  listPropositions = [];
  questions = [];

  // calculate page in place
  groupToPages = function () {
    this.pagedItems = [];

    for (var i = 0; i < this.questions.length; i++) {
      if (i % this.itemsPerPage === 0) {
        this.pagedItems[Math.floor(i / this.itemsPerPage)] = [this.questions[i]];
      } else {
        this.pagedItems[Math.floor(i / this.itemsPerPage)].push(this.questions[i]);
      }
    }

    if (this.pagedItems.length < this.steps)
      this.steps = this.pagedItems.length;
  };

  range = function (size, start, end) {
    var ret = [];
   // console.log(size, start, end);

    if (size < end) {
      end = size;
      start = size - this.steps;
    }
    for (var i = start; i < end; i++) {
      ret.push(i);
    }
    //console.log(ret);
    return ret;
  };

  prevPage = function () {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  };

  nextPage = function () {
    if (this.currentPage < this.pagedItems.length - 1) {
      this.currentPage++;
    }
  };

  setPage = function (element) {
    this.currentPage = element;
  };

  deleteProp = function (i) {
    this.listPropositions.splice(i, 1);

  }
  newProp = function () {
    this.listPropositions.push({
      "texte": "",
      "score": 0,
      "note": 0
    });
  }

  getAllQuestions() {
    this.ficheQuestionService.getAllQuestions().subscribe(questions => {

      this.questions = questions;
      console.log("questions", questions);
      console.log("this.questions", this.questions);
      this.groupToPages();

    });
  }

  ajouterQuestion() {
    
     let question={'name': this.questionForm.get('question').value
     ,'type':this.questionForm.get('type').value,
     'propositions':this.listPropositions}

    this.ficheQuestionService.addQuestion(question).subscribe(questions => {

      
      this.getAllQuestions();
      this.addModal.hide();
      this.clearForm();

    });

  }

  updateProposition(event: any, i) {
    this.listPropositions[i].texte = event.target.value;
  }

  getSupprimerQuestion(item) {
    this.questionDelete = item;
  }
  deleteQuestion() {
    //callApi
    this.ficheQuestionService.deleteQuestion(this.questionDelete._id).subscribe(result => {
      console.log("result: ", result)
      this.deleteModal.hide();
      this.getAllQuestions();

    });
  }


  getModifierQuestion(item) {
    this.questionUpdateId = item._id;
    this.questionForm.get('question').setValue(item.name);
    this.questionForm.get('type').setValue(item.type);
    this.listPropositions = item.propositions;
  }

  updateQuestion() {

    
    if(this.questionForm.get('type').value!="CHECKBOX"&&this.questionForm.get('type').value!="LIST")
      this.listPropositions=[];

      let question={name: this.questionForm.get('question').value
      ,type:this.questionForm.get('type').value,
      propositions:this.listPropositions}

    this.ficheQuestionService.updateQuestion(this.questionUpdateId,question).subscribe(result => {
      console.log("result: ", result)
      this.getAllQuestions();
      this.modifyModal.hide();
      this.clearForm();

    });

  }




  searchQuestionClick() {
    let data = {
      "name": this.searchText,
      "status": "susp"
    }

    this.ficheQuestionService.searchQuestion(data).subscribe(result => {
      console.log("result: ", result)
      this.getAllQuestions();

    });
  }



  clearForm() {
    this.questionForm.get('question').setValue('');
    this.questionForm.get('type').setValue('');
    this.listPropositions = [];
  }

  unsavedChanges(ModalName) {
    if (confirm("Vous allez perdu les changements non enregistrés!"))
      if (ModalName == 'add')
        this.addModal.hide();
      else
        this.modifyModal.hide();

  }

}

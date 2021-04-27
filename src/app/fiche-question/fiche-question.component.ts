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
  questions = [
    {
      "is_template": false,
      "order": 1,
      "type": "TEXT",
      "status": "TEXT",
      "_id": "607eb8111e06e53dfc6f3963",
      "name": "do you agree with the goverment's latest decisions ?",
      "created_at": "2021-04-20T11:16:33.143Z",
      "__v": 0,
      "propositions": []
    },
    {
      "is_template": false,
      "order": 1,
      "type": "CHECKBOX",
      "status": "DATE",
      "_id": "607eb9721e06e53dfc6f3965",
      "name": "----do you agree with the goverment's latest decisions ?",
      "created_at": "2021-04-20T11:22:26.555Z",
      "__v": 0,
      "propositions": []
    },
    {
      "is_template": false,
      "order": 1,
      "type": "TEXT",
      "status": "CREATED",
      "_id": "607eb9bd1e06e53dfc6f3966",
      "name": "do you agree with the goverment's latest decisions ?",
      "created_at": "2021-04-20T11:23:41.224Z",
      "__v": 0,
      "propositions": []
    },
    {
      "is_template": false,
      "order": 1,
      "type": "LIST",
      "status": "CHECKBOX",
      "_id": "607ed63a5e8c000dce0fbb57",
      "propositions": [
        {
          "texte": "ok",
          "score": 5,
          "note": 2.5
        },
        {
          "texte": "ok",
          "score": 8,
          "note": 2.6
        },
        {
          "texte": "nok",
          "score": 5,
          "note": 2.6
        }
      ],
      "name": "do you agree with the goverment's latest decisions ..//§§??",
      "created_at": "2021-04-20T13:25:14.321Z",
      "__v": 0
    },
    {
      "is_template": false,
      "order": 1,
      "type": "CHECKBOX",
      "status": "CHECKBOX",
      "_id": "607ed6475e8c000dce0fbb58",
      "propositions": [
        {
          "texte": "oui",
          "score": 0,
          "note": 0
        }
      ],
      "name": "do you agree with the goverment's latest decisions ?",
      "created_at": "2021-04-20T13:25:27.349Z",
      "__v": 0
    },
    {
      "is_template": false,
      "order": 1,
      "type": "CHECKBOX",
      "status": "TEXT",
      "_id": "607ed69d5e8c000dce0fbb59",
      "propositions": [
        {
          "texte": "ok",
          "score": 5,
          "note": 2.5
        },
        {
          "texte": "ok",
          "score": 5,
          "note": 2.5
        }
      ],
      "name": "الجمهور يحب يسألك   لاباس؟؟ ?//",
      "created_at": "2021-04-20T13:26:53.619Z",
      "__v": 0
    },
    {
      "is_template": false,
      "order": 1,
      "type": "CHECKBOX",
      "status": "CREATED",
      "_id": "607ed6bb5e8c000dce0fbb5a",
      "propositions": [
        {
          "texte": "لاباس",
          "score": 5,
          "note": 2.5
        },
        {
          "texte": "لاباسلاباس",
          "score": 5,
          "note": 2.5
        }
      ],
      "name": "الجمهور يحب يسألك   لاباس؟؟ ?",
      "created_at": "2021-04-20T13:27:23.176Z",
      "__v": 0
    },
    {
      "is_template": false,
      "order": 1,
      "type": "LIST",
      "status": "CREATED",
      "_id": "60845d45ad1b56241f54d404",
      "name": "test 123",
      "propositions": [
        {
          "texte": "A",
          "score": 0,
          "note": 0
        },
        {
          "texte": "AA",
          "score": 0,
          "note": 0
        }
      ],
      "created_at": "2021-04-24T18:02:45.108Z",
      "__v": 0
    },
    {
      "is_template": false,
      "order": 1,
      "type": "CHECKBOX",
      "status": "CREATED",
      "_id": "60857b03ad1b56241f54d409",
      "name": "Question 12",
      "propositions": [
        {
          "texte": "A",
          "score": 0,
          "note": 0
        },
        {
          "texte": "B",
          "score": 0,
          "note": 0
        }
      ],
      "created_at": "2021-04-25T14:21:55.855Z",
      "__v": 0
    }];


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
    console.log(size, start, end);

    if (size < end) {
      end = size;
      // this.steps=size;
      start = size - this.steps;
    }
    for (var i = start; i < end; i++) {
      ret.push(i);
    }
    console.log(ret);
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
      console.log("portfolios", questions);
      console.log("this.questions", this.questions);
      this.groupToPages();

    });
  }

  ajouterQuestion() {
    /* let reponses=[];

     for(let i=0;i<this.listPropositions.length;i++)
     reponses.push(this.listPropositions[i].texte);**/

    let question = '{"name":"' + this.questionForm.get('question').value + '","type":"' + this.questionForm.get('type').value + '","propositions": ' + JSON.stringify(this.listPropositions) + '}';
    this.ficheQuestionService.addQuestion(question).subscribe(questions => {

      this.questions = questions;
      console.log("portfolios", questions);
      console.log("this.questions", this.questions);
      this.clearForm();
      this.getAllQuestions();

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

    let reponse = [];
    for (let i = 0; i < this.listPropositions.length; i++)
      reponse.push(this.listPropositions[i].texte);

    let question = '{"name":"' + this.questionForm.get('question').value + '","type":"' + this.questionForm.get('type').value + '","reponses": ' + JSON.stringify(reponse) + '}';
    this.ficheQuestionService.updateQuestion(this.questionUpdateId, question).subscribe(result => {
      console.log("result: ", result)
      this.modifyModal.hide();
      this.clearForm();
      this.getAllQuestions();

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
  }

  unsavedChanges(ModalName) {
    if (confirm("Vous allez perdu les changements non enregistrés!"))
      if (ModalName == 'add')
        this.addModal.hide();
      else
        this.modifyModal.hide();

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/service/book.service';
import { Books, Books1 } from 'src/app/models/book';
import { Location } from '@angular/common';
import { AuthorService } from 'src/app/service/author.service';
import { PublisherService } from 'src/app/service/publisher.service';
import { CateService } from 'src/app/service/cate.service';
import { Author } from 'src/app/models/author';
import { Publisher } from 'src/app/models/publisher';
import { Cate } from 'src/app/models/cate';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Books;
  book1: Books1;
  author: Author[];
  pub: Publisher[];
  cate: Cate[];
  FileUpload : File = null;
  selectFile = null;
  imageURL = '/assets/image/00128.jpg';
  constructor(private route: ActivatedRoute, private BookService: BooksService, private location: Location,
    private AuthorService: AuthorService, private PubService: PublisherService, private CateService: CateService) { }

  async ngOnInit() {
    await this.getBookFromRoute();
    await this.getAllAuthor();
    await this.getAllCate();
    await this.getAllPub();
  }
  getBookFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.BookService.getBooksFromID(id).toPromise().then(res => this.book = res);
  }
  save() {
    this.BookService.editBook(this.book).toPromise();
    alert('Thành Công')
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }
  async getAllAuthor() {
    await this.AuthorService.getAuthors().subscribe(res =>this.author = res);
    //console.log(this.author[0].firstname);
  }
  async getAllPub() {
    await this.PubService.getPublishers().subscribe(res =>this.pub = res);
  }
  async getAllCate() {
    await this.CateService.getCates().subscribe(res =>this.cate = res);
  }
  handleFileInput(file: FileList) {
    this.FileUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.FileUpload);
    console.log(this.FileUpload);
  }
}

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { map, Observable, startWith } from 'rxjs'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { StorageService } from 'src/app/core/services/storage.service'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material/chips'

@Component({
  selector: 'app-new-article-page',
  templateUrl: './new-article-page.component.html',
  styleUrls: ['./new-article-page.component.scss'],
})
export class NewArticlePageComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '250px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    upload: (file: File) => {
      return this.storageService.uploadImageToFireStorage('images', file)
    },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  }

  newArticleForm: FormGroup
  separatorKeysCodes: number[] = [ENTER, COMMA]
  categoriesCtrl = new FormControl('')
  filteredCategories: Observable<string[]>
  selectedCategories: string[] = []
  categories: string[] = ['Matemáticas', 'Ciencias', 'Ingeniería', 'Tecnología']

  @ViewChild('categoriesInput') categoriesInput!: ElementRef<HTMLInputElement>

  constructor(
    private storageService: StorageService,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
  ) {
    this.newArticleForm = fb.group({
      body: fb.control('', [Validators.required]),
    })
    this.filteredCategories = this.categoriesCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.categories.slice(),
      ),
    )
  }

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    // Add our fruit
    if (value) {
      this.selectedCategories.push(value)
    }

    // Clear the input value
    event.chipInput!.clear()

    this.categoriesCtrl.setValue(null)
  }

  remove(category: string): void {
    const index = this.selectedCategories.indexOf(category)
    console.log('Passing here', category)

    if (index >= 0) {
      this.selectedCategories.splice(index, 1)
    }
    this.categories = [...this.categories, category]
    this.categoriesCtrl.setValue(null)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const { viewValue } = event.option

    this.categories = this.categories.filter(
      (category) => category !== viewValue,
    )

    this.selectedCategories.push(viewValue)
    this.categoriesInput.nativeElement.value = ''
    this.categoriesCtrl.setValue(null)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.categories.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue),
    )
  }
}

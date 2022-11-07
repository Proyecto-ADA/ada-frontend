import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { map, Observable, startWith } from 'rxjs'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { StorageService } from 'src/app/core/services/storage.service'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material/chips'
import { ArticlesService } from 'src/app/core/services/articles.service'
import { IArticle } from 'src/app/core/models/article.interface'

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
  filteredCategories: Observable<string[]>
  selectedCategories: string[] = []
  categories: string[] = ['Matemáticas', 'Ciencias', 'Ingeniería', 'Tecnología']

  @ViewChild('categoriesInput') categoriesInput!: ElementRef<HTMLInputElement>
  image: string | undefined
  imageUrl: string | undefined
  isLoading = false

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private articlesService: ArticlesService,
    private router: Router,
  ) {
    this.newArticleForm = fb.group({
      body: fb.control('', [Validators.required]),
      categories: fb.control(''),
    })
    this.filteredCategories = this.categoriesCtrl!.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.categories.slice(),
      ),
    )
  }

  ngOnInit(): void {}

  get categoriesCtrl() {
    return this.newArticleForm.get('categories')
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    // Add our fruit
    if (value) {
      this.selectedCategories.push(value)
    }

    // Clear the input value
    event.chipInput!.clear()

    this.categoriesCtrl?.setValue(null)
  }

  remove(category: string): void {
    const index = this.selectedCategories.indexOf(category)

    if (index >= 0) {
      this.selectedCategories.splice(index, 1)
    }
    this.categories = [...this.categories, category]
    this.categoriesCtrl?.setValue(null)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const { viewValue } = event.option

    this.categories = this.categories.filter(
      (category) => category !== viewValue,
    )

    this.selectedCategories.push(viewValue)
    this.categoriesInput.nativeElement.value = ''
    this.categoriesCtrl?.setValue(null)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.categories.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue),
    )
  }

  handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) {
      return
    }
    const file = target.files[0]
    if (!file.type.includes('image')) {
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.image = reader.result as string
    }
    this.storageService
      .uploadImageToFireStorage('/', file)
      .subscribe((response) => {
        this.imageUrl = response.body.imageUrl
      })
  }

  async submitArticle() {
    this.isLoading = true
    const article: IArticle = {
      body: this.newArticleForm.get('body')?.value,
      categories: this.selectedCategories,
      image: this.imageUrl,
      isPublished: false,
    }

    const response = await this.articlesService.add(article)
    this.router.navigateByUrl(
      `/articulos/${response.id}?message=Se ha creado tu articulo con exito, aparecerá en la plataforma una vez que sea aprobado`,
    )
  }
}

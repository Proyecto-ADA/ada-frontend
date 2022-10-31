import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Injectable } from '@angular/core'
import { nanoid } from 'nanoid'
import { from, Observable } from 'rxjs'
import { HttpEvent } from '@angular/common/http'
import { UploadResponse } from '@kolkov/angular-editor'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadImageToFireStorage(path: string, image: File) {
    const imagePath = `${path}/${nanoid(5)}-${image.name}`

    return (from(
      this.storage.upload(imagePath, image),
    ) as unknown) as Observable<HttpEvent<UploadResponse>>
  }

  deleteImageFromFirestore(urlFile: string) {
    return this.storage.refFromURL(urlFile).delete()
  }
}

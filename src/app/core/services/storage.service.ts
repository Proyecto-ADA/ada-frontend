import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Injectable } from '@angular/core'
import { nanoid } from 'nanoid'
import { from, map, Observable, switchMap } from 'rxjs'
import { HttpEvent } from '@angular/common/http'
import { UploadResponse } from '@kolkov/angular-editor'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadImageToFireStorage(path: string, image: File): Observable<any> {
    const imagePath = `${path}/${nanoid(5)}-${image.name}`
    const reference = this.storage.ref(imagePath)

    return from(this.storage.upload(imagePath, image)).pipe(
      switchMap(() => reference.getDownloadURL()),
      map((url) => {
        const response = {
          body: {
            imageUrl: url,
          },
        }

        return response
      }),
    )
  }

  deleteImageFromFirestore(urlFile: string) {
    return this.storage.refFromURL(urlFile).delete()
  }
}

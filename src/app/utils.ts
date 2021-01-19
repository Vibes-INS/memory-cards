import { Observable } from 'rxjs'

function fileToBase64(file: File): Observable<string> {
  return new Observable<string>((subscriber) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      subscriber.next(reader.result as string)
      subscriber.complete()
    }
    reader.onerror = (error) => subscriber.error(error)
  })
}

export default {
  fileToBase64,
}

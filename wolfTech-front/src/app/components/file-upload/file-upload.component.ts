import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  template: `
  <div>
   <span>Choose file</span>
   <input class="file-input" type="file" placeholder="upload your picture">
 </div>
 `,
 providers: [
   {
     provide: NG_VALUE_ACCESSOR,
     useExisting: FileUploadComponent,
     multi: true
   }
 ],
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements ControlValueAccessor {
  onChange: Function;
  file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }
  constructor( private host: ElementRef<HTMLInputElement> ) {}

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

  
}

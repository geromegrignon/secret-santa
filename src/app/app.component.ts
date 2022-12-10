import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {from, Observable} from "rxjs";

interface PersonForm {
  name: FormControl<string>;
}

@Component({
  selector: 'secret-santa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  people: any[] = [
    {name: 'Lucile'}
  ];

  // @ts-ignore
  contacts$: Observable<any[]> = from(navigator.contacts.select(['name', 'email', 'tel', 'address', 'icon'], {multiple: true}));

  form = new FormGroup<PersonForm>({
    name: new FormControl('', {nonNullable: true})
  });

  addPerson(): void {
    this.people.push({name: this.form.value.name});
    this.form.controls.name.reset();
  }

  removePerson(name: string): void {
    this.people = this.people.filter(person => person.name !== name);
  }
}

import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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

  supported = this.getSupported();
  contacts = [];

  getSupported() {
    return 'contacts' in navigator
}

  // @ts-ignore
  // contacts$: Observable<any[]> = from(navigator.contacts.select(['name', 'email', 'tel', 'address', 'icon'], {multiple: true}));

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

  async getContacts() {
    const props = ['name', 'email', 'tel', 'address', 'icon'];
    const opts = {multiple: true};
    try {
      // @ts-ignore
      contacts = await navigator.contacts.select(props, opts);
    } catch (ex) {
      // Handle any errors here.
    }
  }
}

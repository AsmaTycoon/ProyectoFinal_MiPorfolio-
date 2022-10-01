import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  /*persona: persona = new persona("", "", "", "", "");*/
  persona: persona [] = [];

  constructor(private personaService: PersonaService, private tokenService: TokenService) { }
  isLogged= false;
  ngOnInit(): void {
    this.cargarPersona();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarPersona(): void {
    this.personaService.getPersona().subscribe(
      data=> {
        this.persona = data;
      }
    )
  }

  delete(id: number){
    if(id != undefined){
      this.personaService.deletePersona(id).subscribe(
        data => {
          this.cargarPersona();
        }, err => {
          alert ("No se pudo borrar la persona");
        }
      )
    }
  }
}

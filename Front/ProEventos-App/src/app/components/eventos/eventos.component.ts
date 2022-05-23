import { EventoService } from './../../services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }
  modalRef: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public isCollapsed: boolean = false;
  public larguraImagem = 150;
  public margemImagem = 2;
  public exibirImagem = true;
  private filtroListaListado = '';

  public get filtroLista(): string {
    return this.filtroListaListado;
  }

  public set filtroLista(v: string) {
    this.filtroListaListado = v;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  public filtrarEventos(filtraPor: string): Evento[] {
    filtraPor = filtraPor.toLowerCase();
    return this.eventos.filter((evento: { tema: string; local: string }) => {
      return (
        evento.tema.toLocaleLowerCase().indexOf(filtraPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtraPor) !== -1
      );
    });
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }
  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Eventos!', 'Erro!');
      },
      complete: () => this.spinner.hide(),
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O Evento foi deletado com sucesso!', 'Deletado!');
  }

  public decline(): void {
    this.modalRef.hide();
  }
}

import { ICallController } from "../funcionalidade/iCallController";
import { ICallUI } from "./iCallUI";

/**
 * Interface de usuário textual (prompt/alert) para interação com o sistema de chamados.
 * Permite abrir chamados, listar e marcar como concluídos via menu simples.
 */
export class TextCallUI implements ICallUI{
    
    callController : ICallController;

    /**
     * Inicializa a UI com um controlador de chamados.
     * @param callController instância responsável pelas regras de negócio
     */
    constructor(callController:ICallController){
        this.callController = callController;
    }

    /**
     * Inicia o loop de interação com o usuário via prompt.
     */
    start(): void {
        let op = 1;
        while(op!=0){
            op = Number(prompt(
                'Escolha uma opção\n' +
                '1- Cadastrar\n' +
                '2- Listar\n' +
                '3- Marcar como concluido\n' +
                '0- Sair'
            ));
            switch(op){
                case 1:
                    let nome : string = prompt('Digite seu nome')!;
                    let descricao : string = prompt('Digite a descrição do problema')!;
                    let deuCerto : boolean = this.callController.abrirChamado(nome,descricao);
                    if(deuCerto){
                        alert('Chamado cadastrado');
                    }else{
                        alert('Não foi possível cadastrar o chamado');
                    }
                    break;

                case 2:
                    let chamados = this.callController.listarChamado();

                    if(chamados.length === 0){
                        alert('Nenhum chamado cadastrado');
                        break;
                    }else{
                        let texto = '';
                        for(let i=0; i<chamados.length; i++){
                            texto += i + ' - ' + chamados[i].solicitante + ' | ' + chamados[i].descricao + '\n';
                        }
                        alert(texto);
                    }
                    break;

                case 3:
                    const listaChamados = this.callController.listarChamado();

                    if (listaChamados.length === 0) {
                        alert("Não há chamados para atender.");
                        break;
                    }

                    let indice = Number(prompt("Digite o índice do chamado a ser concluído:"));

                    if (isNaN(indice) || indice < 0 || indice >= listaChamados.length) {
                        alert("Índice inválido.");
                        break;
                    }

                    let sucesso = this.callController.marcarComoAtendido(listaChamados[indice]);
                    alert(sucesso ? "Chamado marcado como atendido." : "Erro ao atualizar chamado.");
                    break;

                case 0:
                    alert('Obrigado por usar nosso sistema');
                    break;
                default:
                    alert('Opção Inválida, digite uma opção válida por favor!');
            }
        }
    }

}
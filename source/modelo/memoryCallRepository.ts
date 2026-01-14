import { Chamado } from "./chamado";
import { ICallRepository } from "./iCallRepository";

/**
 * Implementação de repositório em memória para a entidade Chamado.
 */
export class MemoryCallRepository implements ICallRepository{
    private chamados: Chamado[] = [];
  
    criarNovoChamado(chamado: Chamado): boolean {
         this.chamados.push(chamado);
        return true;
    }
    
    atualizarChamado(chamado: Chamado): boolean {
        const index = this.chamados.indexOf(chamado);
        
        if (index !== -1) {
            this.chamados[index] = chamado;
            return true;
        }

        return false;
    }
    

    listarChamados(): Array<Chamado> {
         return this.chamados;
    }

}

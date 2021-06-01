import { Comentario } from "./comentario.model";
import { Curtida } from "./curtida.model";

export class Publicacao {
  id?: string;
  autor: string = '';
  texto: string = '';
  comentarios?: Array<Comentario>;
  curtidas?: Array<Curtida>;
  dataPostagem?: Date;
}

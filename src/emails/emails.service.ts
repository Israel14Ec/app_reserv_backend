import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {

  constructor(private readonly mailerService: MailerService) {}

  async enviarEmailRecuperCuenta(nombre: string, email: string, url: string) {
    try {
            await this.mailerService.sendMail({
        to: email,
        subject: 'StreamFast - Restablece tu contraseña',
        template: './reset_password',
        context: {
          name: nombre,
          url,
        },
        attachments: [
          {
            filename: 'StreamFast.webp',
            cid: 'StreamFast-logo',
          },
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al enviar el correo',
        details: error.message,
      });
    }
  }
}
